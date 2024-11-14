/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom authentication guard that uses JWT strategy.
 * This guard checks if a user is authenticated before accessing protected routes.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Override the handleRequest method to customize the behavior.
   * This method is called automatically when the guard validates the JWT token.
   * 
   * @param err - Any error encountered during authentication.
   * @param user - The user object retrieved from the validated token.
   * @returns The authenticated user object if valid, otherwise throws an UnauthorizedException.
   */
  handleRequest(err: any, user: any) {
    // If there's an error or the user object is not present, throw an UnauthorizedException
    if (err || !user) {
      throw new UnauthorizedException('Access Denied');
    }
    // If no error, return the user object
    return user;
  }
}
