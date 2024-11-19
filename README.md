# Node.js - Clean Code Architecture

![Clean Architecture](https://i.ibb.co/S0MQVFN/68747470733a2f2f626c6f672e636c65616e636f6465722e636f6d2f756e636c652d626f622f696d616765732f323031322d.jpg)

Back-end application designed using **Clean Code Architecture** principles. Built with **Node.js**, **Typescript**, **Express**, **PostgreSQL**, **Sequelize**, and **JWT Authentication**, this project ensures separation of concerns, maintainability, and scalability.

## Version
Current application version: 1.0.0

## Author
- Stefan Blagojevic

## Technical Details

### Tech Stack
- Node.js, TypeScript, Express, PostgreSQL, Sequelize, JWT Authentication

- **Libraries**:
    - @godaddy/terminus ^4.12.1
    - bcrypt ^5.1.1
    - compression ^1.7.5
    - cookie-parser ^1.4.7
    - cors ^2.8.5
    - express ^4.21.1
    - helmet ^8.0.0
    - inversify ^6.1.4
    - jsonwebtoken ^9.0.2
    - morgan ^1.10.0
    - multer ^1.4.5-lts.1
    - nodemailer ^6.9.16
    - reflect-metadata ^0.2.2
    - winston ^3.17.0

- **Development Tools**:
    - @types/bcrypt ^5.0.2
    - @types/compression ^1.7.5
    - @types/cookie-parser ^1.4.7
    - @types/cors ^2.8.17
    - @types/express ^5.0.0
    - @types/jsonwebtoken ^9.0.7
    - @types/morgan ^1.9.9
    - @types/multer ^1.4.12
    - @types/nodemailer ^6.4.16
    - @types/pg ^8.11.10
    - dotenv ^16.4.5
    - nodemon ^3.1.7
    - pg ^8.13.1
    - sequelize ^6.37.5
    - ts-node ^10.9.2
    - typescript ^5.6.3

## Features
- **Authentication**: JWT-based user authentication, login, registration, password reset, and email verification.
- **Image Upload**: Upload and store images in PostgreSQL.
- **Error Handling**: Custom error handling with middleware and utilities.
- **Security**: JWT authentication middleware and input validation.

## Project Structure
```
src/ 
    ├── app/                // Main application logic 
    ├── config/             // Configuration files (db.config, smtp.config) 
    ├── constants/          // Constants used across the app 
    ├── containers/         // InversifyJS bindings for Dependency Injection (DI)
    ├── controllers/        // Handles incoming HTTP requests 
    ├── entities/           // Core data models (User, Image) 
    ├── frameworks/         // Infrastructure (db, errors, middlewares, setup)
    ├── models/             // Database models, represents tables in the database
    ├── repositories/       // Database interactions 
    ├── services/           // Business logic and application services 
    ├── templates/          // Email templates with Handlebars (hbs)
    ├── ts/                 // TS definitions (dtos, enums, interfaces, types)
    ├── utils/              // Utilities, helpers, regex and validators
    └── server.ts           // Express server setup
```

## License
This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Enjoy!