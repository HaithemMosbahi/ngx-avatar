import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Source } from '../../projects/ngx-avatar/src/lib/sources/source';

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

  failedSources: number[] = [];

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.fetchInformation().subscribe(user => {
      this.userName = user.username;
      this.userService.getUserFacebook().subscribe(data => {
        this.userFB = data;
      });
    });
  }

  avatarClicked(event: Source) {
    alert('click on avatar fetched from ' + event.sourceType);
  }
}
