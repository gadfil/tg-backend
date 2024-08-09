import { User } from './user.model';

export interface InitDataRequest {
  initData: InitData;
}

export interface InitData {
  authDate: string;
  hash: string;
  queryId: string;
  user: InitDataTGUser;
}

export interface InitDataTGUser {
  allowsWriteToPm: boolean;
  firstName: string;
  id: number;
  languageCode: string;
  lastName: string;
  username: string;
}

export class MeResponse {
  user: User;
}
