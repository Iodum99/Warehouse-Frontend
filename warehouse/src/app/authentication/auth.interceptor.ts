import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

export const NoAuth = 'skip-auth';
var skipAuth = ""

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    removeToken: boolean = false;
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.authService.token != null && this.authService.tokenExpired(this.authService.token)){
      console.log("Token expired, user will be logged out")
      localStorage.removeItem("regUserToken")
      this.authService.logout()
    }
      

    if(this.authService.token == null)
        skipAuth = ""
    else skipAuth = "Bearer "+ this.authService.token
    
    const modifiedReq = req.clone({ 
        headers: req.headers
        .set("Authorization", skipAuth)  
      });
  
    return next.handle(modifiedReq)
    .pipe();
  }

  
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};