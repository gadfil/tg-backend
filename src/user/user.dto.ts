import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class InitDataTGUserDto {
  @IsNumber()
  id: number;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  @IsString()
  username?: string;

  @IsString()
  photo_url: string;

  @IsString()
  language_code?: string;

  @IsBoolean()
  is_premium: boolean;

  @IsBoolean()
  is_bot: boolean;

  @IsBoolean()
  allows_write_to_pm: boolean;
}
