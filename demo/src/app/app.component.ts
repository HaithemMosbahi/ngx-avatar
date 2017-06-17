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
  userFB:string = "wrongId";


  constructor(public userService:UserService){

  }

  ngOnInit(){
     this.userService.fetchInformations().subscribe(user => {
         this.userName = user.username;
          this.userService.getUserFacebook().subscribe(data => {
            this.userFB = data;
         });
    
        
     });
    
  }

  avatarClicked(event:any){
    alert("click on avatar fetched from "+event.sourceType);
  }

}
