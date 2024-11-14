/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Response } from 'express';
import { COOKIE_OPTIONS } from '../config/constants';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // Import the guard

// Define the controller for handling authentication routes
@Controller('auth')
export class AuthController {
  // Inject the AuthService to handle authentication logic
  constructor(private readonly authService: AuthService) {}

  /**
   * Route: POST /auth/sign-up
   * This route handles user registration.
   * - Takes user data (name, email, password) in the request body.
   * - Calls the AuthService to register the user.
   * - Sets a refresh token in an HTTP cookie and returns the access token.
   */
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    // Call the signUp method from the AuthService and get the tokens
    const { accessToken, refreshToken, message } = await this.authService.signUp(signUpDto);
    
    // Set the refresh token as an HTTP-only cookie with secure options
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    // Return the access token and success message in the response body
    return res.json({ accessToken, message });
  }

  /**
   * Route: POST /auth/sign-in
   * This route handles user login.
   * - Takes user credentials (email, password) in the request body.
   * - Calls the AuthService to authenticate the user.
   * - Sets a refresh token in an HTTP cookie and returns the access token.
   */
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    // Authenticate the user and get the tokens
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);
    
    // Set the refresh token as an HTTP-only cookie with secure options
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    // Return the access token in the response body
    return res.json({ accessToken });
  }

  /**
   * Route: POST /auth/refresh
   * This route handles refreshing the access token.
   * - Takes the refresh token from the request body.
   * - Calls the AuthService to generate a new access token.
   */
  @Post('refresh')
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    // Extract the refresh token from the request body
    const { refreshToken } = refreshTokenDto;

    // Generate a new access token using the refresh token
    return await this.authService.refreshAccessToken(refreshToken);
  }

  /**
   * Route: GET /auth/Dashboard
   * This is a protected route that requires a valid JWT to access.
   * - Uses the JwtAuthGuard to protect the route.
   * - Returns a welcome message if the user is authenticated.
   */
  @Get('Dashboard')
  @UseGuards(JwtAuthGuard) // Protect this route with the JwtAuthGuard
  async welcome(@Res() res: Response) {
    // If the user passes the JwtAuthGuard check, they reach here
    return res.json({ message: 'Welcome to the protected area!' });
  }
}
