import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokensModel } from 'app/users/model/tokens.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {

    constructor(private http: HttpClient) {}


    refresh(token: string): Observable<string> {
        console.log('refreshtoken method')
        return this.http.post<string>('/api/token/refresh', { token })
    }

}