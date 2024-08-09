import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly token: string;
  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get('TELEGRAM_BOT_TOKEN');
  }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log('auth ');
    const [authType, authData = ''] = (req.header('authorization') || '').split(
      ' ',
    );

    switch (authType) {
      case 'tma':
        try {
          validate(authData, this.token, {
            expiresIn: 3600,
          });
          return true;
        } catch (e) {
          return false;
        }
      default:
        return false;
    }
  }
}
