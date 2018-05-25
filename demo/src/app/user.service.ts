import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from "./user.model";

/**
 * Service used to fecth Async informations about the user
 * 
 * @export
 */
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    fetchInformations():Observable<User>{
        return this.http.get("assets/data/data.json")
                        .pipe(map(response => response as User));
    }

    getUserFacebook():Observable<string>{
       return this.http.get("assets/data/data.json")
                        .pipe(map(response => response['facebookId']));
    }


    
}