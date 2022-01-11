import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  isUpdate: boolean = true;
  list: Person[] = [];
  actionAdd = true;
  actionUpdate = false;
  person: Person;
  formAdd: FormGroup;
  title: string = 'Add';

  subscriptionAdd: Subscription;
  subscriptionUpdate: Subscription;
  getData: Subscription;

  @Input() formInput: string;

  @ViewChild('companyName') companyName: ElementRef;
  @ViewChild('divButtons') buttons: ElementRef;
  @ViewChild('action') action: ElementRef;

  get nameControl(): AbstractControl {
    return this.formAdd.get('name');
  }
  get lastNameControl(): AbstractControl {
    return this.formAdd.get('lastName');
  }
  get idControl(): AbstractControl {
    return this.formAdd.get('id');
  }

  get addressNameControl(): AbstractControl {
    return this.formAdd.get('address');
  }

  get phoneControl(): AbstractControl {
    return this.formAdd.get('phone');
  }

  public get form(): any {
    return this.formAdd.controls;
  }

  constructor(
    private readonly fb: FormBuilder,
    private dataService: DataService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.getDataToService();
    }, 1000);
  }
  ngOnDestroy() {
    this.subscriptionUpdate.unsubscribe();
    this.subscriptionAdd.unsubscribe();
    this.getData.unsubscribe();
  }

  getDataToService(): void {
    this.getData = this.dataService.communicatorUpdate$.subscribe((per) => {
      this.person = per;
      this.dataService.get().subscribe((response) => {
        this.list = response;
        console.log(this.list);
      });
      console.log(this.person.Name);
      if (this.person.Name !== undefined) {
        console.log(per);
        this.nameControl.setValue(this.person.Name);
        this.idControl.setValue(this.person.Id);
        this.lastNameControl.setValue(this.person.LastName);
        this.addressNameControl.setValue(this.person.Address);
        this.phoneControl.setValue(this.person.Phone);
        this.idControl.disable();

        if (this.isUpdate) {
          this.generateCancelButton();
          this.actionAdd = false;
          this.actionUpdate = true;
          this.isUpdate = false;
          this.title = 'Update';
        }
      }
    });
  }
  generateCancelButton(): any {
    const element = this.buttons.nativeElement;
    const input = this.renderer2.createElement('input');
    this.renderer2.setAttribute(input, 'type', 'button');
    this.renderer2.setAttribute(input, 'value', 'Cancel');
    this.renderer2.addClass(input, 'btn');
    this.renderer2.addClass(input, 'btn-danger');
    this.renderer2.addClass(input, 'm-1');
    this.renderer2.appendChild(element, input);
    this.renderer2.listen(input, 'click', () => {
      window.location.reload();
    });
    return input;
  }

  initForm(): void {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      id: ['', [Validators.required, Validators.max(9999999)]],
      address: ['', [Validators.required, Validators.maxLength(40)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }
  isUnique(idPerson: number): boolean {
    let ret = true;
    for (const per of this.list) {
      if (per.Id === idPerson) {
        ret = false;
        break;
      }
    }
    return ret;
  }
  addPerson(): void {
    let person = new Person();
    person.Name = this.formAdd.get('name').value;
    person.LastName = this.formAdd.get('lastName').value;
    person.Address = this.formAdd.get('address').value;
    person.Id = this.formAdd.get('id').value;
    person.Phone = this.formAdd.get('phone').value;
    if (this.isUnique(person.Id)) {
      console.log(person);
      this.subscriptionAdd = this.dataService.add(person).subscribe(
        (response) => {
          console.log(response);
          this.sendDataToServiceAlertAdd('added');
        },
        (err) => {
          this.sendDataToServiceAlertAdd('error');
        }
      );
    } else {
      alert('the id cannot be repeated');
    }
  }
  update() {
    let person = new Person();
    person.Name = this.formAdd.get('name').value;
    person.LastName = this.formAdd.get('lastName').value;
    person.Address = this.formAdd.get('address').value;
    person.Id = this.formAdd.get('id').value;
    person.Phone = this.formAdd.get('phone').value;
    this.subscriptionUpdate = this.dataService
      .update(person.Id.toString(), person)
      .subscribe(
        (response) => {
          this.sendDataToServiceAlertUpdate('updated');
        },
        (err) => {
          this.sendDataToServiceAlertUpdate('error');
        }
      );
  }

  sendDataToServiceAlertAdd(data) {
    this.dataService.sendInfoAlertAdd(data);
  }

  sendDataToServiceAlertUpdate(data) {
    this.dataService.sendInfoAlertUpdate(data);
  }
  onClickClear(): void {
    const arrayControls: any[] = [
      this.nameControl,
      this.lastNameControl,
      this.phoneControl,
      this.idControl,
      this.addressNameControl,
    ];
    arrayControls.forEach((control) => {
      if (control) {
        control.setValue('');
      }
    });
  }
}
