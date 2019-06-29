import { Injectable } from '@angular/core';
import { UserModel } from 'app/users/model/user.model';
import { UserCrudService } from 'app/users/user-crud.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from 'app/core/user.store.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private userService: UserCrudService,
        private userStore: UserStoreService
    ) {}

    login(login: string, password: string): Observable<UserModel> {
        return this.userService.login(login, password)
            .pipe(map(user => {
                this.userStore.account.next(user);
                return user;
            }))
    }

}
