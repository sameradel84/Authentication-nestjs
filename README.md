# NestJS Authentication Service with MongoDB

## Overview

This project is a NestJS-based backend service that provides authentication functionality, including user sign-up, sign-in, and access token generation, with MongoDB as the database. The service supports JWT authentication and integrates with MongoDB for persistent user data storage.

## Features

- **User Authentication**: Sign-up, sign-in, and token-based authentication using JWT.
- **MongoDB Integration**: Stores user data (email, name, hashed password) in MongoDB.
- **JWT Authentication**: Secure access control using JWT tokens.
- **Token Refresh**: Refresh the access token using a refresh token to maintain user sessions.
- **Hashing Passwords**: Secure password storage using bcrypt hashing.
- **Environment Configuration**: Configurable via `.env` file for managing sensitive information.
- **Docker Support**: Includes Docker and Docker Compose setup for local database management.

## Prerequisites

Before you start, you will need the following tools installed on your machine:

- **Node.js** (version 16 or higher recommended)
- **Docker** and **Docker Compose** for running MongoDB locally

## Setup

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
-git clone <repository_url>
-cd <project_directory>
-docker-compose up -d
-npm run start:dev
```
