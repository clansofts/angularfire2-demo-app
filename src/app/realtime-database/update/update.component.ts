import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { UpdateService } from './update.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  personSelectedForm: FormGroup;
  people: Observable<any> | AngularFireObject<any> | AngularFireList<any>;
  person: { any };
  list: boolean = true;

  constructor(private updateService: UpdateService) { }

  ngOnInit() {
    this.personSelectedForm = new FormGroup({
      'name': new FormControl(null),
      'age': new FormControl(null),
      'gender': new FormControl(null),
      'isActive': new FormControl(null)
    })
  }


  // OBJECT

  updateObjectWithSet(): void {
    const people = this.personSelectedForm.value;
    this.updateService.updateObjectWithSet = people;
  }

  updateObjectWithUpdate(): void {
    const people = this.personSelectedForm.value;
    this.updateService.updateObjectWithUpdate = people;
  }


  // LIST

  updateListWithSet(key: string): void {
    const personSelected = this.personSelectedForm.value;
    this.updateService.updateListWithSet(key, personSelected);
  }

  updateListWithUpdate(key: string): void {
    const personSelected = this.personSelectedForm.value;
    this.updateService.updateListWithUpdate(key, personSelected);
  }


  // HELPER

  selectedPerson(person: {any}): void {
    this.person = person;
  }

  listObjectOption(option: boolean): void {
    this.list = option;

    this.people =
      option === false
        ? this.updateService.getListPeople
        : this.updateService.getObjectPeople;
  }

}
