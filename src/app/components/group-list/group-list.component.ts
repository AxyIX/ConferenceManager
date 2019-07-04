import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Group} from '../../models/Group';
import {DataService} from '../../services/data.service';
import {WebsocketEmulatorService} from '../../services/websocket-emulator.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  membersCount: number;
  groupId: string;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.onRouteChange();
    this.getGroups();
  }

  onRouteChange(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.groupId = queryParams.id;
    });
  }

  getGroups(): void {
    this.dataService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.membersCount = 0;
      groups.map(group => {
        this.membersCount += group.members.length;
      });
    });
  }

  get currentMembers() {
    if (!this.groups) { return []; }
    if (this.groupId !== undefined) {
      const id = +this.groupId;
      return this.groups.find(group => id === group.id).members;
    }
    let members = [];
    this.groups.forEach(group => {
      members = [...members, ...group.members];
    });
    return members;
  }

}
