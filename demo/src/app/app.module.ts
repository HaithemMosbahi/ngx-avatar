import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from "./user.service";
import { AvatarModule,AvatarConfig } from "ngx-avatar";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent  ],
  imports: [
    BrowserModule,
    HttpModule,
    // import AvatarModule in your app with your own configuration
    AvatarModule.forRoot(new AvatarConfig(['#e74c3c','#2c3e50','#95a5a6','#f39c12','#1abc9c']))
    // or import the AvatarModule with its default options
    // AvatarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
