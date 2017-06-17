import { Component,OnInit } from '@angular/core';
import { UserService } from "./user.service";
import {User} from './user.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userName:string = "Haithem Mosbahi";


  constructor(public userService:UserService){

  }

  ngOnInit(){
     this.userService.fetchInformations().subscribe(user => {
         this.userName = user.username;
     });
  }

  avatarClicked(event:any){
    alert("click on avatar fetched from "+event.sourceType);
  }

}
