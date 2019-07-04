import { Component, OnInit, Input } from '@angular/core';
import {Member} from '../../models/Member';
import {PhoneState} from '../../models/PhoneState';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @Input() members: Member[];
  phoneState = PhoneState;
  constructor() { }

  ngOnInit() {
  }

}
