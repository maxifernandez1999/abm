import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  // private communicatorDelete = new BehaviorSubject<Shipper>(new Shipper());
  // public communicatorDelete$ = this.communicatorDelete.asObservable();

  // private communicatorUpdate = new BehaviorSubject<Shipper>(new Shipper());
  // public communicatorUpdate$ = this.communicatorUpdate.asObservable();

  private communicatorAlertDelete = new BehaviorSubject<string>("");
  public communicatorAlertDelete$ = this.communicatorAlertDelete.asObservable();
  
  private communicatorAlertAdd = new BehaviorSubject<string>("");
  public communicatorAlertAdd$ = this.communicatorAlertAdd.asObservable();

  private communicatorAlertUpdate = new BehaviorSubject<string>("");
  public communicatorAlertUpdate$ = this.communicatorAlertUpdate.asObservable();

  private refresh = new BehaviorSubject<boolean>(false);
  public refresh$ = this.refresh.asObservable();

  endpoint:string = "Shipper";
  constructor(private http: HttpClient) { }

  // public sendInfoUpdate(shipper:Shipper){
  //   this.communicatorUpdate.next(shipper);
  // }
  // public sendInfoDelete(shipper:Shipper){
  //   this.communicatorDelete.next(shipper);
  // }
  // public sendInfoAlertDelete(info:string){
  //   this.communicatorAlertDelete.next(info);
  // }
  // public sendInfoAlertAdd(info:string){
  //   this.communicatorAlertAdd.next(info);
  // }
  // public sendInfoAlertUpdate(info:string){
  //   this.communicatorAlertUpdate.next(info);
  // }

  // public addShippers(shipperRequest:Shipper):Observable<string>{
  //   let url:string = `${environment.apiShippers}${this.endpoint}`;
  //   return this.http.post<string>(url,shipperRequest)
  //   .pipe(
  //     tap(()=>{
  //       this.refresh.next(true);
  //     })
  //   );
  // }

  // public getShippers():Observable<Array<Shipper>>{
  //   let url:string = `${environment.apiShippers}${this.endpoint}`;
  //   return this.http.get<Array<Shipper>>(url);
    
  // }

  // public deleteShipper(id:string):Observable<string>{
  //   let url:string = `${environment.apiShippers}${this.endpoint}/${id}`;
  //   console.log(url);
  //   return this.http.delete<string>(url)
  //   .pipe(
  //     tap(()=>{
  //       this.refresh.next(true);
  //     })
  //   );
  // }

  // public updateShipper(id:string,shipperRequest:Shipper):Observable<string>{
  //   let url:string = `${environment.apiShippers}${this.endpoint}/${id}`;
  //   return this.http.put<string>(url,shipperRequest).pipe(
  //     tap(()=>{
  //       this.refresh.next(true);
  //     })
  //   );
  // }
}
