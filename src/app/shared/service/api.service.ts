import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = localStorage.getItem('token');
  constructor(private httpClient: HttpClient) { }


  postRegister(infoRegister:any): Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/v1/admin/auth/register",infoRegister);
  }

  postLogin(infoLogin: any): Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/v1/admin/auth/login",infoLogin);
  }

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.get<any>(
      'http://localhost:8080/api/v1/admin/category/list',
      {
        headers: headers,
      }
    );
  }

  updateData(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.post(
      'http://localhost:8080/api/v1/admin/category/update',
      {
        headers: headers,
      }
    );
  }

  delData(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/v1/admin/category/delete?id=' + id,
      { headers: headers }
    );
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.post<any>(
      'http://localhost:8080/api/v1/admin/category/create',
      data,
      {
        headers: headers,
      }
    );
  }
}
