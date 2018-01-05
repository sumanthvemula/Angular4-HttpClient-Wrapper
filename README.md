# HttpClient Wrapper Integration

## Providing HttpClient Service Reference in app.module

## Step1: Include HttpClient Module Provided by angular4

=> Import statement for HttpClientModule
import { HttpClientModule } from '@angular/common/http';

=> Specify Module name in app.modules[imports].

Example:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpWrapperService} from "./HttpWrapper/http-wrapper.service";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Step2: Include HttpClient Wrapper

=> Specify HttpClient Wrapper reference in providers
```
providers:[HttpWrapperService]
```
Note:"Please include import statement according to the location of wrapper."

## Step3: Include ErrorHandler Service for Http Requests.

=> Specify Error Handler service reference in providers
```
providers:[HttpWrapperService, HttpErrorHandlerService]
```
## To Include Oauth Interceptor in app.module
```
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptorService} from "./HttpWrapper/auth-interceptor.service";

providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }]
```
Note: can be used to send Oauth Access Token on every API request.

# HttpClient Wrapper Usage

## To Set Headers
```
let headers = new HttpHeaders();
headers = headers.append("HeaderName", "HeaderValue");
headers = headers.append("HeaderName", "HeaderValue");
```
## To Set Params
```
let params = new HttpParams();
params = params.append("ParamName", "ParamValue");
params = params.append("ParamName", "ParamValue");
```
## Get Example
```
this.httpWrapper.get(URL, OPTIONS);
Example:
this.httpWrapper.get("https://example.com/getData", {headers:headers,params:params});
```
## Post Example
```
this.httpWrapper.post(URL, OPTIONS);
Example:
this.httpWrapper.post("https://example.com/getData", {headers:headers,params:params, body:body});
```
## Put Example
```
this.httpWrapper.put(URL, OPTIONS);
Example:
this.httpWrapper.put("https://example.com/getData", {headers:headers,params:params, body:body});
```
## Delete Example
```
this.httpWrapper.delete(URL, OPTIONS);
```
Example:
```
this.httpWrapper.delete("https://example.com/getData", {headers:headers,params:params, body:body});
```
