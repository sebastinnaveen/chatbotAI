import { Injectable } from '@angular/core';
import { URLSearchParams, Response, RequestOptions, Http } from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class ChatService {

  constructor(private http: Http) {
  }

  public getChatPeople(term: string): Observable <any>{
    let params = new URLSearchParams();
    params.set('name',term);
    console.log('in chatPeople');
    return this.http.get("url"+term+"/", {search: params})
      .map(res => res.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.text();
    let peopleData = JSON.parse(body);
    //console.log(peopleData);
    return peopleData;
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error('http.erro', errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
