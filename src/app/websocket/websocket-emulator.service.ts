import {Injectable} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {WebsocketEvent} from './websocket-event.enum';
import {WebsocketMessage} from './websocket-message';
import {Member} from '../models/Member';
import {PhoneState} from '../models/PhoneState';
import {Group} from '../models/Group';
import {InMemoryDataService} from '../services/in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketEmulatorService {

  private members: Member[] = this.data.members;

  private groups: Group[] = this.data.groups;

  private websocketMessages$ = new Subject<WebsocketMessage>();
  source = interval(2000);

  constructor( private data: InMemoryDataService) {
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
