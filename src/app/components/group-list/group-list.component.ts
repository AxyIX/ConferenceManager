import { Component, OnInit } from '@angular/core';
import {Group} from '../../models/Group';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
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
  constructor(private dataService: DataService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getGroups();
    this.onRouteChange();
  }

  getGroups(): void {
    this.dataService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.membersCount = 0;
      this.groups.map(group => {
        this.membersCount += group.members.length;
      });
      this.getMembers(this.router.snapshot.paramMap.get('groupId'));
    });
  }

  getMembers(groupId: string): void {
    if (groupId !== undefined && groupId !== null) {
      const id = +groupId;
      this.members = this.groups.find(group => id === group.id).members;
      return;
    }
    const members = [];
    this.groups.map(group => {
      group.members.map(member => {
        members.push(member);
      });
    });
    this.members = members;
  }

  onRouteChange() {
    this.router.params.subscribe(params => {
      this.getMembers(params.get('groupId'));
    });
  }


}
