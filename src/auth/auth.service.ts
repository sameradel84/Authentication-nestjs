/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Injecting the User model for database operations
    private readonly jwtService: JwtService, // Injecting JwtService for token management
  ) {}

  /**
   * Sign up a new user
   * @param signUpDto - Data Transfer Object containing user details for sign up
   * @returns accessToken, refreshToken, and a success message
   */
  async signUp(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;

    // Check if a user with the same email already exists in the database
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists'); // If user exists, throw a conflict error
    }

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = await this.userModel.create({ email, name, password: hashedPassword });

    // Generate access and refresh tokens
    const accessToken = this.generateAccessToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    return { accessToken, refreshToken, message: 'User created successfully' };
  }

  /**
   * Sign in an existing user
   * @param signInDto - Data Transfer Object containing user credentials for sign in
   * @returns accessToken and refreshToken
   */
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Check if the user exists with the provided email
    const user = await this.userModel.findOne({ email });

    // If user is not found or password does not match, throw an unauthorized error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate access and refresh tokens for the user
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  /**
   * Generate an access token for the authenticated user
   * @param user - User document
   * @returns JWT access token
   */
  generateAccessToken(user: UserDocument): string {
    return this.jwtService.sign(
      { email: user.email, sub: user._id }, // Payload containing email and user ID
      { secret: JWT_ACCESS_SECRET, expiresIn: '15m' }, // Token expiration set to 15 minutes
    );
  }

  /**
   * Generate a refresh token for the authenticated user
   * @param user - User document
   * @returns JWT refresh token
   */
  generateRefreshToken(user: UserDocument): string {
    return this.jwtService.sign(
      { email: user.email, sub: user._id }, // Payload containing email and user ID
      { secret: JWT_REFRESH_SECRET, expiresIn: '7d' }, // Token expiration set to 7 days
    );
  }

  /**
   * Refresh the access token using a valid refresh token
   * @param refreshToken - The refresh token provided by the client
   * @returns a new access token
   */
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // Verify the refresh token using the secret key
      const payload = this.jwtService.verify(refreshToken, { secret: JWT_REFRESH_SECRET });

      // Check if the user associated with the token exists
      const user = await this.userModel.findOne({ _id: payload.sub });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate a new access token
      const newAccessToken = this.generateAccessToken(user);
      return { accessToken: newAccessToken };

    } catch (error) {
      // If token verification fails, throw an unauthorized exception
      throw new UnauthorizedException('Invalid refresh token', error);
    }
  }
}
