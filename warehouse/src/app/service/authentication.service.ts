import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, tap } from "rxjs";
import { environment } from 'src/environments/environment.development';
import { Router, ActivatedRoute } from "@angular/router";
import { UserToken } from '../model/user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedUser: UserToken | null
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  get token(): any {
    return localStorage.getItem('regUserToken');
  }

  constructor(private http: HttpClient, private router: Router,  private activeRoute: ActivatedRoute) { 

    this._isLoggedIn$.next(!!this.token)
    this.loggedUser = this.getUser(this.token)
  
  }

  private getUser(token: string): UserToken | null {
    if (!token) {
      return null
    }
    return JSON.parse(window.atob(token.split('.')[1])) as UserToken;
  }

  public login(loginData: any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('noToken', 'noToken');
    return this.http.post(environment.baseUrlAuthenticationService + "/login", loginData).pipe(
      tap((response: any) => {                  
        this.storeToken(response.token)
        this.loggedUser = this.getUser(response.token)               
        console.log(this.loggedUser)
      
      })                                   
    )
  }

  public logout() {
    window.location.href="http://localhost:4200/login"
    localStorage.removeItem("regUserToken")
  }

  public storeToken(accessToken: any) {
    this._isLoggedIn$.next(true)
    localStorage.setItem("regUserToken", accessToken)
  }

  reloadCurrentPage(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
  } 

}
