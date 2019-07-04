import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {PhoneState} from '../models/PhoneState';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const groups = [
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

    return {groups};
  }

  constructor() { }
}
