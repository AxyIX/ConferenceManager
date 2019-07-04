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
    {id: 0, name: 'Иван Иванов', active: false, phoneState: PhoneState.IDLE},
    {id: 1, name: 'Михаил Михайлов', active: true, phoneState: PhoneState.CALL},
    {id: 3, name: 'Павел Павлов', active: false, phoneState: PhoneState.IDLE},
    {id: 4, name: 'Василий Васин', active: false, phoneState: PhoneState.IDLE},
    {id: 5, name: 'Алексей Алексеев', active: true, phoneState: PhoneState.CALL},
    {id: 6, name: 'Дмитрий Дмитриев', active: false, phoneState: PhoneState.IDLE},
    {id: 7, name: 'Николай Николаев', active: false, phoneState: PhoneState.IDLE},
    {id: 8, name: 'Денис Денисов', active: false, phoneState: PhoneState.IDLE},
    {id: 9, name: 'Станислав Стасов', active: false, phoneState: PhoneState.IDLE},
    {id: 10, name: 'Роман Романов', active: false, phoneState: PhoneState.IDLE},
  ];

  groupsMembers: Member[] = [];

  groups: Group[] = [
    {
      id: 0, name: 'Группа 1', members: [
        this.members[0], this.members[1], this.members[2],
      ]
    },
    {
      id: 1, name: 'Группа 2', members: [
        this.members[3], this.members[4],
      ]
    },
    {
      id: 2, name: 'Группа 3', members: []
    }
  ];

  constructor() {
  }

  createDb() {
    return {groups: this.groups, members: this.groupsMembers};
  }

  delete(req) {
    console.log('req', req);
    console.log('data', req.resourceUrl);
    switch (req.resourceUrl) {
      case 'api/groups/':
        this.deleteMemberFromGroup(+req.query.get('groupId'), +req.query.get('memberId'));
        break;
    }
  }

  addMemberToGroup(groupId, memberId) {
    const member = this.members.find(m => m.id === memberId);
    this.groups.find(g => g.id === groupId).members.push(member);
    this.groupsMembers.push(member);
  }

  deleteMemberFromGroup(groupId, memberId) {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.members = group.members.filter( m => m.id !== memberId);
    }
    console.log('server groups', this.groups);
  }
}
