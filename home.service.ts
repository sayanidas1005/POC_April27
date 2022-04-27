import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseURL: string = "http://localhost:3000/";     //fill in as per the used url

  constructor(private http: HttpClient) { }

  //to send data to the backend to be handled
  jsonObject(worksheet: any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const body=worksheet;
    console.log(worksheet)
    //return the returned matching sheets
    //for trial
    // var sheetsReturned=["FTS_MATL","FTS_PLATE"]
    // return sheetsReturned;
    return this.http.post(this.baseURL + 'data', body,{'headers':headers})
  }

  //updating if no table matches
  updateDB(worksheet: any,condition:any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const body={'data':worksheet,'update':condition};
    // console.log(worksheet)
    //return the returned matching sheets
    return this.http.post(this.baseURL + 'data', body,{'headers':headers})
  }


}
