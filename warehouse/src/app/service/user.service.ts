import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
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

    sortDirection: string = 'ASC'
    sortBy: string = 'joinDate'

  public createUser(user: any): Observable<any>{
    return this.http.post(environment.baseUrlUserService, user);
  }

  public getUser(id: any): Observable<any>{
    return this.http.get(environment.baseUrlUserService + "/" + id);
  }

  public verify(tokenId: any): Observable<any>{
    return this.http.put(environment.baseUrlVerifTokenService + "/verify/" + tokenId, null);
  }

  public getAllUsers(query: any, isAdmin: boolean): Observable<any>{

    if(query.sortBy) {
      this.sortDirection = this.helperService.getSortingDirection(query.sortBy)
      this.sortBy = this.helperService.camelize(query.sortBy)
    }

    let params = new HttpParams();
    params = params.append("sortBy", this.sortBy).append("sortDirection", this.sortDirection)
    if(query.filterByText) params = params.append("filterByText", query.filterByText) 

    if(isAdmin)
      return this.http.get(environment.baseUrlUserService + "/admin", {params});
    else
    return this.http.get(environment.baseUrlUserService, {params});
  }


  public updateUser(formData: any): Observable<any>{
    return this.http.put(environment.baseUrlUserService, formData);
  }
}
