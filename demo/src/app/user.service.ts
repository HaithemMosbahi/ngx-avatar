import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from "./user.model";

/**
 * Service used to fecth Async informations about the user
 * 
 * @export
 * @class AppService
 */
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    fetchInformations(): Observable<User> {
        return this.http.get("assets/data/data.json")
            .map(response => response as User);
    }

    getUserFacebook(): Observable<string> {
        return this.http.get("assets/data/data.json")
            .map((response: any) => response.facebookId);
    }



}