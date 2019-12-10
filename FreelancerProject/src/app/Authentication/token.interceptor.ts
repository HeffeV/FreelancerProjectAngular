import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticateService } from '../Services/authenticate.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticateService) {}

  /**
   * Intercepts all HTTP requests and adds my the JWT in the Authorization header
   * @param request the request being sent
   * @param next the HttpHandler that will handle the request after it has been altered
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
