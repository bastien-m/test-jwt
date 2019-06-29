import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'app/users/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  account = new BehaviorSubject<UserModel>(null);

  constructor() { }
}
