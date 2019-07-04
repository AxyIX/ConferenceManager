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

  groupId: string;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
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
    });
  }

  get currentMembers() {
    if (!this.groups) { return; }
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
