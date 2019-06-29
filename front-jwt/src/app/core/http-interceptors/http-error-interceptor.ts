import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';
import { UserStoreService } from '../user.store.service';

@Injectable({providedIn: 'root'})
export class HttpErrorInterceptor implements HttpInterceptor {
    
    private refreshTokenInProgress = false
    private accessToken$ = new BehaviorSubject<any>(null);

    constructor(
        private router: Router,
        private authTokenService: AuthTokenService,
        private userStore: UserStoreService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => {
                if (req.url.includes('user/login')) {
                    return throwError(error)
                }
                else if (req.url.includes('token/refresh')) {
                    this.router.navigateByUrl('/login')
                } else {
                    return this.handleError(req, error, next)
                }
            }));
    }

    /**
     * This method handle error on http response
     * if the error is a 401 then it will call for a new access token
     * using the refresh token
     * @param request HttpRequet
     * @param error HttpErrorResponse
     * @param next HttpHandler
     */
    private handleError(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler): Observable<HttpEvent<any>> {
        if (error.status === 401) {
            if (this.refreshTokenInProgress) {
                return this.accessToken$
                    .pipe(
                        filter(token => token),
                        take(1),
                        switchMap(() => {
                            this.refreshTokenInProgress = false
                            return next.handle(this.addAccessToken(request))
                        })
                    )
            } else {
                this.refreshTokenInProgress = true
                if (!this.userStore.account.value || !this.userStore.account.value.tokens) {
                    this.refreshTokenInProgress = false
                    this.router.navigateByUrl('/login')
                    return throwError({message: 'Not logged in'})
                }
                return this.authTokenService.refresh(this.userStore.account.value.tokens.refreshToken)
                    .pipe(switchMap(token => {
                        this.refreshTokenInProgress = false
                        const currentUser = this.userStore.account.value
                        currentUser.tokens.accessToken = token
                        this.userStore.account.next(currentUser)
                        this.accessToken$.next(token)
                        return next.handle(this.addAccessToken(request))
                    }), catchError(err => {
                        this.refreshTokenInProgress = false
                        return next.handle(request)
                    }))
            }
        } else {
            return throwError(error)
        }
    }

    /**
     * This method add a new access token to the current request
     * @param request HttpRequest that will received the new access token
     */
    private addAccessToken(request): HttpRequest<any> {
        return request.clone({
            setHeaders: { 'Authorization': `Bearer ${this.accessToken$.value}` }
        })
    }

}