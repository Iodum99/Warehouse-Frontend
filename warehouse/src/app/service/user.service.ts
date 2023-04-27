import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(user: any): Observable<any>{
    return this.http.post(environment.baseUrlUserService, user);
  }

  public getUser(id: any): Observable<any>{
    return this.http.get(environment.baseUrlUserService + "/" + id);
  }
}
