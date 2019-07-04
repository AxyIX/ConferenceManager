import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Group} from '../models/Group';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Member} from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'api/groups';
  constructor(private client: HttpClient) {
  }

  getGroups(): Observable<Group[]> {
    return this.client.get<Group[]>(this.baseUrl).pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      })
    );
  }

  deleteMemberFromGroup(id: number, member: Member): Observable<any> {
    if (id === undefined) {
      return of(undefined);
    }
    console.log(`deleting member: ${member.id}, from group: ${id}.`);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.baseUrl}/${id}/members/${member.id}`;
    return this.client.delete(url).pipe(
      catchError(error => {
        console.log(error);
        return of([]);
      })
    );
  }
}
