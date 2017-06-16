import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    constructor(private http: Http) { }

    fetchInformations():Observable<User>{
        return this.http.get("assets/data/data.json")
                        .map(response => response.json() as User);
    }


    
}