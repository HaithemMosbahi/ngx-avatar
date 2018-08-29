import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName = 'Haithem Mosbahi';
  userFB = 'wrongId';
  customStyle = {
    backgroundColor: '#27ae60',
    border: '1px solid #bdc3c7',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer'
  };

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.userService.fetchInformations().subscribe(user => {
      this.userName = user.username;
      this.userService.getUserFacebook().subscribe(data => {
        this.userFB = data;
      });
    });
  }

  avatarClicked(event: any) {
    alert('click on avatar fetched from ' + event.sourceType);
  }
}
