const InstitutionAdmin = require("../models/InstitutionAdminModel");
const Institution = require("../models/InstitutionModel");
const Profile = require("../models/ProfileModel");

// Create a new institution
exports.createInstitution = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, website, description } = req.body;
    const admin = await InstitutionAdmin.findOne({ profile: req.user._id });
    if (admin) {
      return res.status(403).json({
        status: "error",
        message: "User is already an admin of an instution.",
      });
    }

    // Check if institution already exists
    const existingInstitution = await Institution.findOne({ name });
    if (existingInstitution) {
      return res
        .status(400)
        .json({ status: "error", message: "Institution name already exists" });
    }

    const institution = new Institution({
      name,
      website,
      description,
    });

    await institution.save();

    // change role of user to institution admin
    await Profile.findByIdAndUpdate(owner, { role: "institutionAdmin" });
    await InstitutionAdmin.create({
      profile: owner,
      institution: institution._id,
    });

    res.status(200).json({
      data: { institution },
      message: "Institution created successfully",
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

exports.getMyInstitution = async (req, res) => {
  try {
    const institutionAdmin = await InstitutionAdmin.findOne({
      profile: req.user._id,
    });
    if (!institutionAdmin) {
      return res.status(403).send({
        status: "error",
        message: "Institution admin to access this route",
      });
    }
    const institution = await Institution.findById(
      institutionAdmin.institution
    );
    if (institution) {
      res.json({
        data: { institution },
        status: "success",
      });
    } else {
      res.status(404).send({
        status: "error",
        message: "No instution found for this user",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

// Get all institutions
exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    // if (req.user.role != "admin") {
    //   institutions.forEach((institution) => {
    //     institution.status = undefined;
    //   });
    // }
    res.status(200).json({ data: { institutions }, status: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

// Get an institution by ID
exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res
        .status(404)
        .json({ status: "error", message: "Institution not found" });
    }
    if (req.user.role != "admin") {
      institution.status = undefined;
    }
    res.json({ data: { institution }, status: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

// Update an institution
exports.updateInstitution = async (req, res) => {
  try {
    const { name, website, description, status } = req.body;
    const admin = await InstitutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not an instution admin",
      });
    }

    let institution = await Institution.findById(admin.institution);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const existingInstitution = await Institution.findOne({
      name,
      _id: { $ne: req.params.id },
    });
    if (existingInstitution) {
      return res
        .status(400)
        .json({ status: "error", message: "Institution name already exists" });
    }

    institution.name = name || institution.name;
    institution.website = website || institution.website;
    institution.description = description || institution.description;
    institution.status = status || institution.status;

    await institution.save();
    res.json({
      data: { institution },
      status: "success",
      message: "Institution updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

// Delete an institution
exports.deleteInstitution = async (req, res) => {
  try {
    const admin = await InstitutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not an instution admin",
      });
    }

    const institution = await Institution.find({
      _id: admin.institution,
    });

    if (!institution) {
      return res
        .status(404)
        .json({ status: "error", message: "Institution not found" });
    }

    await institution.remove();
    res.json({ status: "error", message: "Institution removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

// Change status of an institution
exports.changeInstitutionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    institution.status = status;

    await institution.save();
    res.status(200).json({ status: "success", data: institution });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

exports.getInstitutionAdmins = async (req, res) => {
  try {
    const admin = await InstitutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to edit this scholarship.",
      });
    }
    const instution = await Institution.findById(admin.institution);
    if (!instution) {
      return res
        .status(404)
        .json({ status: "error", message: "Institution not found" });
    }
    const institutionAdmins = await InstitutionAdmin.find({
      institution: instution,
    })
      .select("profile")
      .populate({ path: "profile", select: "surname other_names email" });
    return res.json({ data: { institutionAdmins }, status: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};

exports.addInstutionAdmin = async (req, res) => {
  try {
    const email = req.body.email;
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }
    const admin = await InstitutionAdmin.findOne({ profile: req.user._id });
    if (!admin) {
      return res.status(403).json({
        status: "error",
        message: "User is not authorized to perform this action",
      });
    }

    const institutionId = admin.institution;

    // Check if user is already an institution admin
    const existingAdmin = await InstitutionAdmin.findOne({
      profile: profile._id,
    });

    if (existingAdmin) {
      return res.status(400).json({
        status: "error",
        message: "User is already an admin of an institution.",
      });
    }

    // Create a new institution admin
    const newAdmin = new InstitutionAdmin({
      profile: profile._id,
      institution: institutionId,
    });

    await newAdmin.save();

    profile.role = "institutionAdmin";
    await profile.save();

    res.status(200).json({
      status: "success",
      message: "User added as an institution admin.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "error",
      message: "Server error",
      data: { error: err.message },
    });
  }
};
