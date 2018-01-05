import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpHandler, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import {AuthInterceptorService} from "./auth-interceptor.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpErrorHandlerService {

  constructor() {
  }

  public handle403(isUpdate: boolean): any {
    console.log("Error 404");
  }

  public handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return Observable.throw(error);
  }

  logoutUser() {
    // Route to the login page (implementation up to you)

    return Observable.throw("");
  }
}
