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

  getListCategory(): Observable<any> {
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

  getCategory(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.get<any>(
      'http://localhost:8080/api/v1/admin/category/detail?id='+id,
      {
        headers: headers,
      }
    );
  }


  updateCategory(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.post(
      'http://localhost:8080/api/v1/admin/category/update',data,
      {
        headers: headers,
      }
    );
  }

  delCategory(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/v1/admin/category/delete?id=' + id,
      { headers: headers }
    );
  }

  postCategory(data: any): Observable<any> {
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

  postImageCategory(fileUpload:any): Observable<any>{
    const endpoint = 'http://localhost:8080/api/v1/common/upload';
    return this.httpClient
      .post(endpoint, fileUpload)
  }
}
