import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private helperService: HelperService) { }

  public createUser(user: any): Observable<any>{
    return this.http.post(environment.baseUrlUserService, user);
  }

  public getUser(id: any): Observable<any>{
    return this.http.get(environment.baseUrlUserService + "/" + id);
  }

  public verify(tokenId: any): Observable<any>{
    return this.http.put(environment.baseUrlVerifTokenService + "/verify/" + tokenId, null);
  }

  public getAllUsersAdmin(): Observable<any>{
    return this.http.get(environment.baseUrlUserService);
  }

  public getAllActiveUsers(sort: string): Observable<any>{
    
    let params = this.helperService.getQueryParams(sort)
    return this.http.get(environment.baseUrlUserService + "/enabled", {params});
  }

  public updateUser(formData: any): Observable<any>{
    return this.http.put(environment.baseUrlUserService, formData);
  }
}
