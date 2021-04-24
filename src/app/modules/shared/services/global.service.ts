import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private headerKey = 'PMToken';

  constructor(private http: HttpClient) {
  }

  public getCall(url: string, callback, withToken = false): any {
    this.http.get(environment.baseUrl + url, { headers: this.createHeaders(withToken), observe: 'response' }).subscribe(
      (resp) => {
        callback(resp);
      },
      err => {
        console.error(err);
        callback(err);
      }
    );
  }

  public postCall(url: string, params: any, callback, withToken = false): any {
    this.http.post(environment.baseUrl + url, params, { headers: this.createHeaders(withToken), observe: 'response' }).subscribe(
      (resp) => {
        callback(resp);
      },
      err => {
        console.error(err);
        callback(err);
      }
    );
  }

  public putCall(url: string, params: any, callback, withToken = false): any {
    this.http.put(environment.baseUrl + url, params, { headers: this.createHeaders(withToken), observe: 'response' }).subscribe(
      (resp) => {
        callback(resp);
      },
      err => {
        console.error(err);
        callback(err);
      }
    );
  }

  public deleteCall(url: string, params: any, callback, withToken = false): any {
    this.http.request('DELETE', environment.baseUrl + url, {
      headers: this.createHeaders(withToken),
      body: params,
      observe: 'response'
    }).subscribe(
      (data) => {
        callback(data);
      },
      err => {
        console.error(err);
        callback(err);
      }
    );
  }

  private createHeaders(withToken = false): any {
    let headers: HttpHeaders;
    if (withToken) {
      headers = new HttpHeaders().append('Content-Type', 'application/json').append(this.headerKey, 'test')
        .append('Access-Control-Allow-Origin', '*');
    } else {
      headers = new HttpHeaders().append('Content-Type', 'application/json').append('Access-Control-Allow-Origin', '*');
    }
    return headers;
  }
}
