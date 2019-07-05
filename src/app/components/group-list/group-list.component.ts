import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {Group} from '../../models/Group';
import {DataService} from '../../services/data.service';
import {WebsocketEvent} from '../../websocket/websocket-event.enum';
import {WebsocketEmulatorService} from '../../websocket/websocket-emulator.service';
import {Member} from '../../models/Member';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {

  groups: Group[];

  groupId: string;

  private onMemberChangeStatus: Subscription;
  private onMemberEnterToGroup: Subscription;
  private onMemberLeaveGroup: Subscription;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private websocketEmulatorService: WebsocketEmulatorService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  onRouteChange(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.groupId = queryParams.id;
    });
  }

  get membersCount() {
    let count = 0;
    this.groups.map(group => {
      count += group.members.length;
    });
    return count;
  }

  getGroups(): void {
    this.dataService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.onRouteChange();
      this.subscribeToWs();
    });
  }

  get currentMembers() {
    if (!this.groups) { return; }
    if (this.groupId !== undefined) {
      const id = +this.groupId;
      return this.groups.find(group => id === group.id).members;
    }
    return this.allMembers;
  }

  get allMembers() {
    let members = [];
    this.groups.forEach(group => {
      members = [...members, ...group.members];
    });
    return members;
  }

  deleteMember = (member) => {
    const group = this.groups.find(g => g.members.indexOf(member) !== -1);
    this.dataService.deleteMemberFromGroup(group.id, member).subscribe(
      () => {
        group.members = group.members.filter(m => m.id !== member.id);
      },
      error => {
        console.error(error);
      }
    );
  }

  private subscribeToWs() {
    this.onMemberChangeStatus = this.websocketEmulatorService.on(WebsocketEvent.CHANGE_STATUS).subscribe(event => {
      const currentMember = this.allMembers.find( m => m.id === event.data.member.id);
      if (!currentMember) {
        return;
      }
      currentMember.phoneState = event.data.member.phoneState;
      currentMember.active = event.data.member.active;
      }
    );
    this.onMemberEnterToGroup = this.websocketEmulatorService.on(WebsocketEvent.MEMBER_ADD).subscribe(event => {
      const currentMember = this.allMembers.find( m => m.id === event.data.member.id);
      if (currentMember) {
        return;
      }
      this.groups[event.data.groupId].members.push(event.data.member);
    });
  }

  ngOnDestroy() {
    if (this.onMemberEnterToGroup) {
      this.onMemberEnterToGroup.unsubscribe();
    }
    if (this.onMemberChangeStatus) {
      this.onMemberChangeStatus.unsubscribe();
    }
    if (this.onMemberLeaveGroup) {
      this.onMemberLeaveGroup.unsubscribe();
    }
  }

}
