import { Injectable } from '@angular/core';
import {Group} from '../models/Group';
import {PhoneState} from '../models/PhoneState';
import {Observable, of} from 'rxjs';
import {Member} from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  groups: Group[];
  constructor() {
    this.groups = [
      { id: 0, name: 'group 1', members: [
          { id: 0, name: 'vasia pupochkin', active: false, phoneState: PhoneState.IDLE },
          { id: 1, name: 'ivan ivanov', active: true, phoneState: PhoneState.CALL },
          { id: 3, name: 'pavel ibragimov', active: false, phoneState: PhoneState.IDLE },
        ] },
      { id: 1, name: 'group 2', members: [
          { id: 4, name: 'vasia pupochkin2', active: false, phoneState: PhoneState.IDLE },
          { id: 5, name: 'ivan ivanov2', active: true, phoneState: PhoneState.CALL },
          { id: 6, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE },
        ] }
    ];
  }

  getGroups(): Observable<Group[]> {
    return of(this.groups);
  }
}
