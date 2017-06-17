import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from "./user.service";
import { AvatarModule } from "ngx-avatar";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent  ],
  imports: [
    BrowserModule,
    HttpModule,
    // import AvatarModule in your app
    AvatarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
