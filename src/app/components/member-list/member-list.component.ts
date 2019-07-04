import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {Member} from '../../models/Member';
import {PhoneState} from '../../models/PhoneState';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnChanges {
  @Input() members: Member[];
  phoneState = PhoneState;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('new members', changes.members.currentValue);
    this.members = changes.members.currentValue;
    console.log('current members', this.members);
  }

}
