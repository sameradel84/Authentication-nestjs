/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // For MongoDB connection
import { AuthModule } from './auth/auth.module'; // For authentication module
import { ConfigModule } from '@nestjs/config'; // For loading environment variables

@Module({
  imports: [
    // ConfigModule loads environment variables globally, making them available across the app
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables accessible globally
      envFilePath: '.env', // Path to the .env file
    }),

    // MongooseModule establishes a connection to the MongoDB database
    MongooseModule.forRoot('mongodb://root:password@localhost:27017', {
      dbName: 'mydatabase', // Specify the database name
      authSource: 'admin', // Specify the authentication database
    }),

    // Import the AuthModule for handling user authentication
    AuthModule,
  ],
})
export class AppModule {}
