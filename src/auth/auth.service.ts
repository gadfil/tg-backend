import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  verifyTelegramWebAppData(data: any, hash: string): boolean {
    const checkString = Object.keys(data)
      .sort()
      .map(k => `${k}=${data[k]}`)
      .join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(process.env.BOT_TOKEN)
      .digest();

    const calculatedHash = crypto.createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    return calculatedHash === hash;
  }

  generateToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}