import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8090/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post(this.apiUrl+'/login',{});
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.apiUrl+'/upload', formData);
  }



}
