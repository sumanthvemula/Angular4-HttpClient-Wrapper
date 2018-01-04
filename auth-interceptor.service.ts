import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = "123456";
        console.log("inside interceptor");
        const authReq = req.clone({
            //headers: req.headers.set('access_Token', token)
            // setHeaders: {
            //     Authorization: `Bearer ${token}`
            // }
            headers: req.headers.append('access_token', "6CyjWFEwDGEgzBTl")
        });
        return next.handle(authReq);
    }

}
