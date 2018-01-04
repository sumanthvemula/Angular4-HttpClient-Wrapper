import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorHandlerService {

    constructor(private router: Router) {}

    public handle403(isUpdate: boolean): any {
      console.log("Error 404");
    }


    public handle401(isUpdate: boolean): any {
        //this.router.navigate(['/logout']);
        // Need to add methods for refresh tokens.
    }

}
