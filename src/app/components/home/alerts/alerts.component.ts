import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShippersService } from 'src/app/services/shippers.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy, AfterViewInit {

  subscribeAddAlert:Subscription;
  subscribeUpdateAlert:Subscription;
  subscribeDeleteAlert:Subscription;

  @ViewChild('alertDelete') alertDelete:ElementRef;
  @ViewChild('alertAdd') alertAdd:ElementRef;
  @ViewChild('alertError') alertError:ElementRef;
  @ViewChild('alertUpdate') alertUpdate:ElementRef;
  constructor(private shipperService: ShippersService,
              private renderer2: Renderer2) { }


  ngOnInit(): void {}

  ngAfterViewInit():void{
    this.getInfoAlertDelete();
    this.getInfoAlertAdd();
    this.getInfoAlertUpdate();
  }
  ngOnDestroy(){
    this.subscribeAddAlert.unsubscribe();
    this.subscribeDeleteAlert.unsubscribe();
    this.subscribeUpdateAlert.unsubscribe();
  }

  getInfoAlertDelete():void{
    this.subscribeDeleteAlert = this.shipperService.communicatorAlertDelete$.subscribe(res => {
      if(res === "deleted"){
        const element = this.alertDelete.nativeElement;
        this.renderer2.addClass(element,"show");
      }else if(res === "error"){
        const element = this.alertError.nativeElement;
        this.renderer2.addClass(element,"show");
      }
    });
  }

  getInfoAlertAdd():void{
    this.subscribeAddAlert = this.shipperService.communicatorAlertAdd$.subscribe(res => {
      if(res === "added"){
        const element = this.alertAdd.nativeElement;
        this.renderer2.addClass(element,"show");
      }else if(res === "error"){
        const element = this.alertError.nativeElement;
        this.renderer2.addClass(element,"show");
      }
    });
  }

  getInfoAlertUpdate():void{
    this.subscribeUpdateAlert = this.shipperService.communicatorAlertUpdate$.subscribe(res => {
      if(res === "updated"){
        const element = this.alertUpdate.nativeElement;
        this.renderer2.addClass(element,"show");
      }else if(res === "error"){
        const element = this.alertError.nativeElement;
        this.renderer2.addClass(element,"show");
      }
    });
  }

}
