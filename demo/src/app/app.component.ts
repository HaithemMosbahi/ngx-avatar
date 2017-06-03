import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  avatarClicked(event:any){
    alert("click on avatar fetched from "+event.sourceType);
  }

}
