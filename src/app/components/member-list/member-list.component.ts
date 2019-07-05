import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Member} from '../../models/Member';
import {PhoneState} from '../../models/PhoneState';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {

  phoneState = PhoneState;

  @Input() members: Member[];
  @Input() deleteMember;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  onDelete(member: Member): void {
    this.dataService.deleteMemberFromGroup(this.route.snapshot.queryParams.id, member).subscribe(event => {
      if (event === '200') {
        this.deleteMember(member);
      }
    })
    ;
  }

}
