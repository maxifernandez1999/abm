import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private communicatorDelete = new BehaviorSubject<Person>(new Person());
  public communicatorDelete$ = this.communicatorDelete.asObservable();

  private communicatorUpdate = new BehaviorSubject<Person>(new Person());
  public communicatorUpdate$ = this.communicatorUpdate.asObservable();

  private communicatorAlertDelete = new BehaviorSubject<string>("");
  public communicatorAlertDelete$ = this.communicatorAlertDelete.asObservable();
  
  private communicatorAlertAdd = new BehaviorSubject<string>("");
  public communicatorAlertAdd$ = this.communicatorAlertAdd.asObservable();

  private communicatorAlertUpdate = new BehaviorSubject<string>("");
  public communicatorAlertUpdate$ = this.communicatorAlertUpdate.asObservable();

  private refresh = new BehaviorSubject<boolean>(false);
  public refresh$ = this.refresh.asObservable();

  endpoint:string = "data";
  constructor(private http: HttpClient) { }

  public sendInfoUpdate(person:Person){
    this.communicatorUpdate.next(person);
  }
  public sendInfoDelete(person:Person){
    this.communicatorDelete.next(person);
  }
  public sendInfoAlertDelete(info:string){
    this.communicatorAlertDelete.next(info);
  }
  public sendInfoAlertAdd(info:string){
    this.communicatorAlertAdd.next(info);
  }
  public sendInfoAlertUpdate(info:string){
    this.communicatorAlertUpdate.next(info);
  }

  public add(person:Person):Observable<string>{
    let url:string = `${environment.api}${this.endpoint}`;
    return this.http.post<string>(url,person)
    .pipe(
      tap(()=>{
        this.refresh.next(true);
      })
    );
  }

  public get():Observable<Array<Person>>{
    let url:string = `${environment.api}${this.endpoint}`;
    return this.http.get<Array<Person>>(url);
    
  }

  public delete(id:string):Observable<string>{
    let url:string = `${environment.api}${this.endpoint}/${id}`;
    console.log(url);
    return this.http.delete<string>(url)
    .pipe(
      tap(()=>{
        this.refresh.next(true);
      })
    );
  }

  public update(id:string,person:Person):Observable<string>{
    let url:string = `${environment.api}${this.endpoint}/${id}`;
    return this.http.put<string>(url,person).pipe(
      tap(()=>{
        this.refresh.next(true);
      })
    );
  }
}
