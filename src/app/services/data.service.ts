import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Group} from '../models/Group';
import {HttpClient} from '@angular/common/http';

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


}
