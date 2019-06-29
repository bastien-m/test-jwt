import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from 'app/core/user.store.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private userStore: UserStoreService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('JwtInterceptor')
    let headers = new HttpHeaders()
    if (this.userStore.account.value && this.userStore.account.value.tokens) {
      console.log('accessToken in JwtInterceptor')
      console.log(this.userStore.account.value.tokens.accessToken)
      headers = req.headers.append('Authorization', `Bearer ${this.userStore.account.value.tokens.accessToken}`)
      return next.handle(req.clone({headers}))
    }
    return next.handle(req);
  }

}
