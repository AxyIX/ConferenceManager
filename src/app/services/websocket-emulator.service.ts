import {Injectable} from '@angular/core';
import {Member} from '../models/Member';
import {PhoneState} from '../models/PhoneState';
import {Group} from '../models/Group';
import {timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketEmulatorService {
  members: Member[] = [
    {id: 0, name: 'Иван Иванов', active: false, phoneState: PhoneState.IDLE},
    {id: 1, name: 'Михаил Михайлов', active: true, phoneState: PhoneState.CALL},
    {id: 3, name: 'Павел Павлов', active: false, phoneState: PhoneState.IDLE},
    {id: 4, name: 'Василий Васин', active: false, phoneState: PhoneState.IDLE},
    {id: 5, name: 'Алексей Алексеев', active: true, phoneState: PhoneState.CALL},
    /* {id: 6, name: 'Дмитрий Дмитриев', active: false, phoneState: PhoneState.IDLE},
    {id: 7, name: 'Николай Николаев', active: false, phoneState: PhoneState.IDLE},
    {id: 8, name: 'Денис Денисов', active: false, phoneState: PhoneState.IDLE},
    {id: 9, name: 'Станислав Стасов', active: false, phoneState: PhoneState.IDLE},
    {id: 10, name: 'Роман Романов', active: false, phoneState: PhoneState.IDLE}, */
  ];

  groups: Group[] = [
    {
      id: 0, name: 'Группа 1', members: []
    },
    /* {
      id: 1, name: 'Группа 2', members: []
    },
    {
      id: 2, name: 'Группа 3', members: []
    } */
  ];

  constructor() {
    const stream$ = timer(3000, 3000);

    stream$.subscribe(() => {
      const behavior = BEHAVIOR[Math.floor(Math.random() * BEHAVIOR.length)];
      const member = this.members[Math.floor(Math.random() * this.members.length)];

      console.log(behavior, member.id);
      switch (behavior) {
        case BEHAVIOR[0]:
          this.changeActive(member);
          break;
        case BEHAVIOR[1]:
          this.changePhoneState(member);
          break;
        case BEHAVIOR[2]:
          if (!this.groupsContainsMember(member)) {
            this.addMemberToGroup(member);
          }
          break;
      }
      console.log(this.groups[0]);
      debugger;
    });
  }

  changeActive(member: Member) {
    if (member.active) {
      member.active = false;
    } else {
      member.active = true;
    }
  }

  changePhoneState(member: Member) {
    switch (member.phoneState) {
      case PhoneState.ALERT:
        member.phoneState = PhoneState.CALL;
        break;
      case PhoneState.CALL:
        member.phoneState = PhoneState.IDLE;
        break;
      case PhoneState.IDLE:
        member.phoneState = PhoneState.ALERT;
        break;
    }
  }

  addMemberToGroup(member: Member) {
    const groupId = Math.floor(Math.random() * this.groups.length);
    this.groups[groupId].members.push(member);
  }

  groupsContainsMember(member: Member): boolean {
    for (let i = 0; i < this.groups.length; i++ ) {
      for (let j = 0; j < this.groups[i].members.length; j++) {
        if (this.groups[i].members[j] === member) {
          return true;
        }
      }
    }
    return false;
  }

}

const BEHAVIOR = ['ACTIVE', 'PHONE_STATE', 'ENTER_TO_GROUP'];
