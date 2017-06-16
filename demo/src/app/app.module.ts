import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvatarModule } from "ngx-avatar";
import { UserService } from "./user.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // import AvatarModule in your app
    AvatarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
