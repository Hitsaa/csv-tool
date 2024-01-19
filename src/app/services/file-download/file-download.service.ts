import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  private apiUrl = 'https://localhost:8080/api/v1/process/csv';

  constructor(private http: HttpClient) { }


}
