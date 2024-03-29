import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadApiUrl = environment.apiUrl+'/api/v1'; // Update this with your server's API endpoint
  private downloadApiUrl = 'https://localhost:8080/api/v1/process/csv';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.uploadApiUrl+'/upload/csv', formData);
  }

  getData(): Observable<any> {
    return this.http.get(this.uploadApiUrl+'/getdata');
  }

  downloadFile(data: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Blob>(this.uploadApiUrl+ '/process/csv', data, {
      headers,
      responseType: 'blob' as 'json' // Set responseType to 'blob' for binary data
    });
  }
}
