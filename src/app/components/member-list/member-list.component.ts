import { Component, OnInit, Input } from '@angular/core';
import {Member} from '../../models/Member';
import {PhoneState} from '../../models/PhoneState';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  phoneState = PhoneState;
  constructor() { }

  ngOnInit() {
  }

  @Input()
  set setMembers(members: Member[]) {
    this.members = members;
  }

}
