import {
  Middleware, MiddlewareMethods, Req, Res,
} from '@tsed/common';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Unauthorized } from '@tsed/exceptions';

dotenv.config();

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  public use(@Req() req: Req, @Res() res: Res) {
    const token = req.headers.authorization || req.headers.Authorization as unknown as string;
    if (token == null) {
      return res.status(401).json('Unauthorized');
    }

    jwt.verify(token, process.env.LOGIN_SECRET_KEY!, async (err) => {
      if (err) {
        return res.status(401).json('Unauthorized');
      }
    });
  }
}
