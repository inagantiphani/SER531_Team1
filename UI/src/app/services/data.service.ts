import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  uri = "http://ec2-18-237-49-160.us-west-2.compute.amazonaws.com:3030/Cricketdata/query";

  sparql(query) {
    return this.http.get<any>(this.uri, { params: { 'query': query } });
  }
}
