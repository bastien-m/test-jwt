import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'app/core/crud.service';
import { UserModel } from './model/user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokensModel } from './model/tokens.model';

@Injectable({
    providedIn: 'root'
})
export class UserCrudService extends CrudService<UserModel>{
    constructor(protected http: HttpClient) {
        super('users', http);
    }

    login(email: string, password: string): Observable<UserModel> {
        return this.httpService.post<UserModel>(`${this.apiRoute}/login`, {email, password})
            .pipe(map((userFromService:any) => {
                const tokens = userFromService.tokens;
                const user: UserModel = userFromService;
                user.tokens = {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token
                }
                return user
            }));
    }

}
