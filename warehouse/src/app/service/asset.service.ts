import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private helperService: HelperService) { }

  public getAssets(authorId: any, type: any, query: any): Observable<any>{
    
    var sortDirection = 'DESC'
    var sortBy = 'uploadDate'
    
    if(query.sortBy) {
      sortDirection = this.helperService.getSortingDirection(query.sortBy)
      sortBy = this.helperService.camelize(query.sortBy)
    }
    
    let params = new HttpParams();
    params = params.append('type', type).append("sortBy", sortBy).append("sortDirection", sortDirection)
    if(query.filterByText) params = params.append("filterByText", query.filterByText) 
    if(query.filterByExtensions) params = params.append("filterByExtensions", query.filterByExtensions)
    if(query.filterByTags) params = params.append("filterByTags", query.filterByTags)
    if(authorId != 0) params = params.append("userId", authorId); else params = params.append("userId", 0)
      
    console.log("EXTENSIONS:")
    console.log(query.filterByExtensions)
    
    return this.http.get(environment.baseUrlAssetService, {params} );
  }

  public getAssetById(id: number): Observable<any>{
    return this.http.get(environment.baseUrlAssetService + "/" + id);  
  }

  public increaseDownloadsCount(id: number): Observable<any>{
    return this.http.put(environment.baseUrlAssetService + "/downloads/" + id, null);  
  }

  public manageLikes(assetId: number, userId: number): Observable<any>{
    return this.http.put(environment.baseUrlAssetService + "/likes/" + assetId + "_" + userId, null);  
  }

  public getFavoriteAssets(id: any): Observable<any>{
    return this.http.get(environment.baseUrlAssetService + "/favorites/" + id);  
  }

  public uploadAsset(data: FormData): Observable<any>{
    return this.http.post(environment.baseUrlAssetService, data)
  }

  public updateAsset(data: FormData): Observable<any>{
    return this.http.put(environment.baseUrlAssetService, data)
  }

  public deleteAsset(id: number): Observable<any>{
    return this.http.delete(environment.baseUrlAssetService + "/" + id)
  }

  public getExtensionsAndTags(type: any, id: any): Observable<any>{
    if(id != 0) return this.http.get(environment.baseUrlAssetService + "/filterdata/" + type + "/user/" + id)
    else return this.http.get(environment.baseUrlAssetService + "/filterdata/" + type)
  }

}
