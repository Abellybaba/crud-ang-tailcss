import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Define base url for server
  private serverUrl: string = "https://my-json-server.typicode.com/abellybaba/json-api"; //server url

  constructor(private httpClient: HttpClient) { }

//Create/post an employee
createEmployee(data: any){
  let dataUrl: string = `${this.serverUrl}/employees`;
  return this.httpClient.post<any>(dataUrl, data).pipe(map((res: any)=>{return res;}))
}

//get all employee
getAllEmployee(): Observable<any>{
  let dataUrl: string = `${this.serverUrl}/employees`;
  return this.httpClient.get<any>(dataUrl).pipe(map((res: any)=>{return res;}))
}

//update an Employee
updateEmployee(data: any,id: any){
  let dataUrl: string = `${this.serverUrl}/employees/${id}`;
  return this.httpClient.put<any>(dataUrl,data).pipe(map((res: any)=>{return res;}))
}

//delete an employee
deleteEmployee(id: any):Observable<any>{
  let dataUrl: string = `${this.serverUrl}/employees/${id}`;
  return this.httpClient.delete<any>(dataUrl).pipe(map((res: any)=>{return res;}))
}

} //End of class
