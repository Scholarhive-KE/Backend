# ScholarHive Backend

Welcome to the ScholarHive Backend repository! This project serves as the backend for the ScholarHive system, a platform where verified scholarships are posted by institutions and viewed by students. The backend is built using Express.js, a fast and minimalist web framework for Node.js.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Documentation](#documentation)

## Overview

ScholarHive is designed to be a trusted platform for scholarships, ensuring that only verified institutions can post scholarship opportunities. Students can sign up, browse, and apply for these scholarships. The backend handles user authentication, institution verification, scholarship management, and more.

## Features

- **User Authentication**: Secure registration and login for both students and institutions.
- **Institution Verification**: Process for verifying institutions before they can post scholarships.
- **Scholarship Management**: CRUD operations for scholarships by verified institutions.
- **Student Dashboard**: Students can view and apply for scholarships.
- **Admin Dashboard**: Admins can manage users and oversee the verification process.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development)

## Installation

1. **Clone the Repository**:

```bash
    git clone https://github.com/Scholarhive-KE/SH-Backend
    cd Scholarhive-KE
```

2. **Install Dependencies**:

```bash
yarn install
```

## Configuration

The application can be configured by duplicating `.env.example`, renaming it to `.env` and modify the available configuration options.

## Running the Application

To run the application, use the following command:

### Development

```bash
yarn run dev
```

### Production

```bash
yarn run start
```

## Documentation
