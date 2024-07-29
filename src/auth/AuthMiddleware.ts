import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InitDataParsed } from '@telegram-apps/init-data-node';
import { validate, parse } from '@telegram-apps/init-data-node';
import { ConfigService } from '@nestjs/config';

export function setInitData(res: Response, initData: InitDataParsed): void {
  res.locals.initData = initData;
}

export function getInitData(res: Response): InitDataParsed | undefined {
  return res.locals.initData;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly token: string;
  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get('TELEGRAM_BOT_TOKEN');
  }
  use(req: Request, res: Response, next: NextFunction) {
    const [authType, authData = ''] = (req.header('authorization') || '').split(
      ' ',
    );

    switch (authType) {
      case 'tma':
        try {
          validate(authData, this.token, {
            expiresIn: 3600,
          });

          setInitData(res, parse(authData));
          return next();
        } catch (e) {
          return next(e);
        }
      default:
        return next(new Error('Unauthorized'));
    }
  }
}
