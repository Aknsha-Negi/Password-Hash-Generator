const API = "http://10.5.50.168:8080";

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor(private http: HttpClient) { }

  getHash(p: string){
    return this.http.post<any>(API, {
      "password": p
    });
  }
}
