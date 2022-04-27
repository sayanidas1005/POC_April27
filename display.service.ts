import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  baseURL: string = "http://localhost:3000/";

  data: any;
  sheetName: any;
  constructor(private http: HttpClient) { }

  // getSheetNames() {
  //   this.http.get<any>('https://datausa.io/api/data?drilldowns=Nation&measures=Population').subscribe(      //put the correct uri for sheet name
  //     response => {
  //       console.log(response);
  //       return response;     //stores the json object returned back for names
  //     }
  //   )
  // }


  getSheetNames() {      //getting sheet names
    return this.http.get<any>('https://datausa.io/api/data?drilldowns=Nation&measures=Population');      //put the correct uri for sheet name
  }

  // postSheetName(sheet){   
  //   const headers = { 'content-type': 'application/json'} 
  //   const body=sheet;
  //   return this.http.post(this.baseURL + 'data', body,{'headers':headers}).subscribe(      //put the correct uri for sheet name
  //     response=>{
  //       // console.log(response);
  //       return this.sheetName=response;     //stores the json object returned back for names
  //     }
  //   )
  // }

  postSheetName(sheet: any): Observable<any> {      //getting the json object as per the sheet chosen

    //post request
    // const headers = { 'content-type': 'application/json' }
    // const body = sheet;
    // return this.http.post(this.baseURL + 'data', body, { 'headers': headers });

    //get request
    // console.log(sheet+"vvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    let params = new HttpParams();
    params = params.append("sheet", sheet);
    return this.http.get(this.baseURL, { params: params });
  }

  //posting sheet edit
  postEditedRecord(sheetEdited: any,userId:any,recordData:any): Observable<any> {      //getting the json object as per the sheet chosen
    let params = new HttpParams();
    params = params.append("sheetEdited", sheetEdited);
    params = params.append("userId", userId);
    params = params.append("recordData", recordData);
    console.log(params);
    return this.http.get(this.baseURL, { params: params });
  }

  getData() {        //getData for sheet chosen- not required
    this.http.get<any>('https://datausa.io/api/data?drilldowns=Nation&measures=Population').subscribe(      //put the correct uri
      response => {
        // console.log(response);
        this.data = response;     //stores the json object returned back
      }
    )
  }
}
