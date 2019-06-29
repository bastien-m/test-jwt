import { TokensModel } from './tokens.model';

export interface UserModel {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    tokens?: TokensModel;
}