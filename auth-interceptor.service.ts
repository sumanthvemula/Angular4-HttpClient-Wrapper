import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {HttpErrorHandlerService} from "./http-error-handling.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {

  public token:string = "";
  public isRefreshingToken: boolean = false;
  public tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    public authService: AuthService,
    public httpErrorHandler: HttpErrorHandlerService
  ){
    this.token = this.authService.getAuthToken();
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    //return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
    return req.clone({
      headers: req.headers.append('access_token', token)
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getAuthToken()))
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 401:
              return this.handle401(req, next);
          }
        } else {
          return Observable.throw(error);
        }
      });
  }

  public handle401(req: HttpRequest<any>, next: HttpHandler): any {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.httpErrorHandler.logoutUser();
        })
        .catch(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.httpErrorHandler.logoutUser();
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }



}
