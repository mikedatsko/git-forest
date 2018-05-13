import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url);
  }

  post(url, params) {
    return this.http.post(url, params);
  }

  put(url, params) {
    return this.http.put(url, params);
  }

  delete(url, params) {
    return this.http.delete(url, params);
  }
}
