/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_SECRET } from '../config/constants';

/**
 * JwtStrategy class extends PassportStrategy to handle JWT-based authentication.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract JWT token from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Set the secret key used to verify the JWT
      secretOrKey: JWT_ACCESS_SECRET,
    });
  }

  /**
   * Validate the JWT payload.
   * This method is automatically called if the token is valid.
   * @param payload - Decoded JWT payload
   * @returns An object containing the user ID and email
   */
  async validate(payload: any) {
    // The payload contains data like sub (user ID) and email
    return { userId: payload.sub, email: payload.email };
  }
}
