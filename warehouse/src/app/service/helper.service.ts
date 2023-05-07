import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  
  export class HelperService {
  
    public getQueryParams(sort: string): any{
  
      var camalize = function camalize(str: string) {
        if(str.includes('_asc')) str = str.replace('_asc', '')  
        else str = str.replace('_desc', '')
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
  
      let params = new HttpParams();
      params = params 
      .append('sortBy', camalize(sort))            
      .append('sortType', sort.includes("asc")? 'ASC' : 'DESC');
  
      return params;
                
    }
}