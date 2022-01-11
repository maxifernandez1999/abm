import { Component, OnInit, Renderer2 } from '@angular/core';
import { Person } from 'src/app/models/person';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  list: Person[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPersons();
    this.refresh();
  }

  refresh(): void {
    this.dataService.refresh$.subscribe(() => {
      this.getPersons();
    });
  }
  getPersons(): any {
    this.dataService.get().subscribe((response) => {
      this.list = response;
      localStorage.setItem('person', JSON.stringify(this.list));
    });
  }

  sendDataToServiceUpdate(person: Person) {
    this.dataService.sendInfoUpdate(person);
  }
  sendDataToServiceDelete(person: Person) {
    this.dataService.sendInfoDelete(person);
  }
}
