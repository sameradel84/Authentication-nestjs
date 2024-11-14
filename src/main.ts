/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core'; // To create the NestJS application
import { AppModule } from './app.module'; // Import the main module of the app
import { ValidationPipe } from '@nestjs/common'; // For validating incoming requests

import * as cookieParser from 'cookie-parser'; // For parsing cookies in requests

async function bootstrap() {
  // Create the NestJS application with the AppModule
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes for the whole app
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform incoming payloads to DTO instances
    whitelist: true,  // Strip properties that are not part of the DTOs
    forbidNonWhitelisted: true,  // Throw an error if extra properties are included in the request
  }));

  // Enable cookie parsing middleware to read cookies from requests
  app.use(cookieParser());

  // Enable Cross-Origin Resource Sharing (CORS) for specific frontend origin
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  // Start the application and listen on the specified port (either from the environment variable or default to 5000)
  await app.listen(process.env.PORT ?? 5000);
}

// Call the bootstrap function to start the application
bootstrap();
