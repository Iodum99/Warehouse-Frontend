import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  public getAssets(author: any): Observable<any>{
    if(author != "")
      return this.http.get(environment.baseUrlAssetService + "/user/" + author );
    else
      return this.http.get(environment.baseUrlAssetService);
  }
}
