import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Group} from '../../models/Group';
import {DataService} from '../../services/data.service';
import {Member} from '../../models/Member';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  membersCount: number;
  members: Member[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getGroups();
    this.onRouteChange();
  }

  onRouteChange(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (!this.groups) { return; }
      this.getMembers(queryParams.id);
    });
  }

  getGroups(): void {
    this.dataService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.membersCount = 0;
      this.groups.map(group => {
        this.membersCount += group.members.length;
      });
      this.getMembers(this.route.snapshot.queryParams.id);
    });
  }

  getMembers(groupId: string): void {
    if (groupId != null) {
      const id = +groupId;
      this.members = this.groups.find(group => id === group.id).members;
      debugger;
      return;
    }
    let members = [];
    this.groups.forEach(group => {
      members = [...members, ...group.members];
    });
    debugger;
    this.members = members;
  }

}
