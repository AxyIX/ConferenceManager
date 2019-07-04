import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {PhoneState} from '../models/PhoneState';
import {Member} from '../models/Member';
import {Group} from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  members: Member[] = [
    {id: 0, name: 'vasia pupochkin', active: false, phoneState: PhoneState.IDLE},
    {id: 1, name: 'ivan ivanov', active: true, phoneState: PhoneState.CALL},
    {id: 3, name: 'pavel ibragimov', active: false, phoneState: PhoneState.IDLE},
    {id: 4, name: 'vasia pupochkin2', active: false, phoneState: PhoneState.IDLE},
    {id: 5, name: 'ivan ivanov2', active: true, phoneState: PhoneState.CALL},
    {id: 6, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE},
    {id: 7, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE},
    {id: 8, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE},
    {id: 9, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE},
    {id: 10, name: 'pavel ibragimov2', active: false, phoneState: PhoneState.IDLE},
  ];

  groupsMembers: Member[] = [];

  groups: Group[] = [
    {
      id: 0, name: 'Группа 1', members: []
    },
    {
      id: 1, name: 'Группа 2', members: []
    },
    {
      id: 2, name: 'Группа 3', members: []
    }
  ];

  constructor() {
    this.addMemberToGroup(0, 0);
    this.addMemberToGroup(0, 1);
    this.addMemberToGroup(0, 2);
    this.addMemberToGroup(1, 3);
    this.addMemberToGroup(1, 5);
    this.addMemberToGroup(2, 6);
    this.addMemberToGroup(2, 8);
  }

  createDb() {
    return {groups: this.groups, members: this.groupsMembers};
  }

  addMemberToGroup(groupId, memberId) {
    const member = this.members.find(m => m.id === memberId);
    this.groups.find(g => g.id === groupId).members.push(member);
    this.groupsMembers.push(member);
  }
}
