import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../core/crud.service';
import { UserTokenModel } from './model/user-token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenCrudService extends CrudService<UserTokenModel> {

  constructor(protected http: HttpClient) {
    super('token', http)
  }


}
