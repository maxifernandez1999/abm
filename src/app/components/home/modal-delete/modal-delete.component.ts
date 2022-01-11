import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit, OnDestroy {
  person: Person;
  subscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getDataToService();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getDataToService(): void {
    this.subscription = this.dataService.communicatorDelete$.subscribe(
      (shp) => (this.person = shp)
    );
  }
  deletePerson(id: number): void {
    this.dataService.delete(id.toString()).subscribe(
      (res) => {
        this.sendDataToServiceAlertDelete('deleted');
      },
      (err) => {
        this.sendDataToServiceAlertDelete('error');
      }
    );
  }

  sendDataToServiceAlertDelete(data) {
    this.dataService.sendInfoAlertDelete(data);
  }
}
