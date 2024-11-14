/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// Define the AuthModule which handles user authentication
@Module({
  imports: [
    // Load environment variables using ConfigModule
    ConfigModule.forRoot(),

    // Import the MongooseModule to connect to the MongoDB database
    // Define the User schema for the 'users' collection
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    // Configure the JwtModule to handle JWT token generation
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Use the secret from environment variables
      signOptions: { expiresIn: '15m' }, // Set token expiration time to 15 minutes
    }),
  ],

  // Register the controllers for handling incoming HTTP requests
  controllers: [AuthController],

  // Register providers for dependency injection
  providers: [
    AuthService,    // Service for handling authentication logic
    JwtStrategy,    // Strategy for validating JWT tokens
    JwtAuthGuard,   // Guard to protect routes
  ],

  // Export the AuthService to be used in other modules
  exports: [AuthService],
})
export class AuthModule {}
