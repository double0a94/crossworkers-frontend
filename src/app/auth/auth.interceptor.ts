import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        "x-access-token": `${this.auth.getToken()}`
      }
    });
    console.log("INSIDE INTERCEPTOR: ", this.auth.getToken());
    return next.handle(req);
  }
}
