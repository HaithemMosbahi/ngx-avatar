import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvatarConfig, AvatarModule } from 'ngx-avatar';
import { UserService } from './user.service';

const avatarConfig = new AvatarConfig(['#e74c3c','#2c3e50','#95a5a6','#f39c12','#1abc9c']);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvatarModule
    // AvatarModule.forRoot(avatarConfig)
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
