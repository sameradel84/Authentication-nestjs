/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the type for a User document, combining the User class with Mongoose's Document type
export type UserDocument = User & Document;

/**
 * The User schema definition using NestJS decorators.
 * This defines the structure of the 'User' document stored in the MongoDB database.
 */
@Schema()
export class User {
  // Define the email field, which is required and must be unique
  @Prop({ required: true, unique: true })
  email: string;

  // Define the name field, which is required
  @Prop({ required: true })
  name: string;

  // Define the password field, which is required
  @Prop({ required: true })
  password: string;
}

// Generate the Mongoose schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);
