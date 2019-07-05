import {Injectable} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {WebsocketEvent} from './websocket-event.enum';
import {WebsocketMessage} from './websocket-message';
import {Member} from '../models/Member';
import {PhoneState} from '../models/PhoneState';
import {Group} from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class WebsocketEmulatorService {

  private members: Member[] = [
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

  private groups: Group[] = [
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

  private websocketMessages$ = new Subject<WebsocketMessage>();
  source = interval(2000);

  constructor() {
    this.source.subscribe(() => {
      const behavior = Math.floor(Math.random() * 3);
      const member = this.members[Math.floor(Math.random() * this.members.length)];

      const message: WebsocketMessage = {
        type: null,
        data: {member}
      };

      console.log(behavior, member.id);
      switch (behavior) {
        case 0:
          if (!this.groupsContainsMember(member)) {
            return;
          }
          this.changeActive(member);
          message.type = WebsocketEvent.CHANGE_STATUS;
          break;
        case 1:
          if (!this.groupsContainsMember(member)) {
            return;
          }
          this.changePhoneState(member);
          message.type = WebsocketEvent.CHANGE_STATUS;
          break;
        case 2:
          if (this.groupsContainsMember(member)) {
            return;
          }
          const groupId = Math.floor(Math.random() * this.groups.length);
          this.addMemberToGroup(groupId, member);
          message.type = WebsocketEvent.MEMBER_ADD;
          message.data = {...message.data, groupId}
          break;
      }

      this.websocketMessages$.next(message);
    });
  }

  public on(event: WebsocketEvent): Observable<WebsocketMessage> {
    return this.websocketMessages$.pipe(
      filter(message => message.type === event)
    );
  }

  private changeActive(member: Member) {
    if (member.active) {
      member.phoneState = PhoneState.IDLE;
      member.active = false;
    } else {
      member.active = true;
    }
  }

  private changePhoneState(member: Member) {
    switch (member.phoneState) {
      case PhoneState.ALERT:
        member.phoneState = PhoneState.CALL;
        member.active = true;
        break;
      case PhoneState.CALL:
        member.phoneState = PhoneState.IDLE;
        break;
      case PhoneState.IDLE:
        member.phoneState = PhoneState.ALERT;
        member.active = true;
        break;
    }
  }

  private addMemberToGroup(groupId: number, member: Member) {
    this.groups[groupId].members.push(member);
  }

  private groupsContainsMember(member: Member): boolean {
    for (const g of this.groups) {
      for (const m of g.members) {
        if (m === member) {
          return true;
        }
      }
    }
    return false;
  }
}
