import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {PhoneState} from '../models/PhoneState';
import {Member} from '../models/Member';
import {Group} from '../models/Group';
import {WebsocketMessage} from '../websocket/websocket-message';
import {Subject, interval, Observable} from 'rxjs';
import {WebsocketEvent} from '../websocket/websocket-event.enum';
import {filter} from 'rxjs/operators';

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

  private websocketMessages$ = new Subject<WebsocketMessage>();
  source = interval(2000);

  constructor() {
    this.memberBehaviorEmulating();
  }

  // in memory data

  createDb() {
    return {groups: this.groups};
  }

  delete(req) {
    switch (req.resourceUrl) {
      case 'api/groups/':
        this.deleteMemberFromGroup(+req.query.get('groupId'), +req.query.get('memberId'));
        break;
    }
  }

  deleteMemberFromGroup(groupId, memberId) {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.members = group.members.filter( m => m.id !== memberId);
      const message: WebsocketMessage = {
        type: WebsocketEvent.MEMBER_LEAVE_GROUP,
        data: {groupId, memberId}
      };
      this.websocketMessages$.next(message);
      console.log('called event', message);
    }
    console.log('server groups', this.groups);
  }

  // websocket service emulation

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
        if (m.id === member.id) {
          return true;
        }
      }
    }
    return false;
  }

  private memberBehaviorEmulating() {
    this.source.subscribe(() => {
      const behavior = Math.floor(Math.random() * 3);
      const member = this.members[Math.floor(Math.random() * this.members.length)];

      const message: WebsocketMessage = {
        type: null,
        data: {member}
      };

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
          message.data = {...message.data, groupId};
          break;
      }

      this.websocketMessages$.next(message);
    });
  }
}
