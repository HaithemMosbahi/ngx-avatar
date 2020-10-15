import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

/**
 * Service used to fetch Async information about the user
 */
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  fetchInformation(): Observable<User> {
    return this.http.get('assets/data/data.json').pipe(
      map(response => response as User)
    );
  }

  getUserFacebook(): Observable<string> {
    return this.http.get<{ facebookId: string}>('assets/data/data.json').pipe(
      map(response => response.facebookId )
    );
  }
}
