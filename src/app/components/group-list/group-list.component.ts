import { Component, OnInit } from '@angular/core';
import {Group} from '../../models/Group';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  membersCount: number;
  constructor(private dataService: DataService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.membersCount = 0;
      this.groups.map(group => {
        this.membersCount += group.members.length;
      });
    });
  }

}
