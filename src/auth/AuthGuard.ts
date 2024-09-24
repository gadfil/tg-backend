import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard extends BaseAuthGuard('jwt') {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    // console.log('canActivate:authHeader', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.jwtSecret,
      });

      /// todo change latter
      request.user = payload;
      request.tgUser = payload
      console.log('canActivate', payload);
      return true;
    } catch (e) {
      console.log('AuthGuard', e)
      throw new UnauthorizedException('Token verification failed');
    }
  }
}

// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { parse, validate } from '@telegram-apps/init-data-node';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   private readonly token: string;
//   constructor(private readonly configService: ConfigService) {
//     this.token = this.configService.get('TELEGRAM_BOT_TOKEN');
//   }
//   canActivate(context: ExecutionContext): boolean {
//     const req = context.switchToHttp().getRequest();
//     console.log('auth ');
//     const [authType, authData = ''] = (req.header('authorization') || '').split(
//       ' ',
//     );
//
//     switch (authType) {
//       case 'tma':
//         try {
//           const v = validate(authData, this.token, {
//             expiresIn: 3600,
//           });
//           req.tgUser = parse(authData);
//           return true;
//         } catch (e) {
//           return false;
//         }
//       default:
//         return false;
//     }
//   }
// }
