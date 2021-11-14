import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AvatarModule } from  '../../projects/ngx-avatar/src/lib/avatar.module';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

const avatarColors = ['#FFB6C1', '#2c3e50', '#95a5a6', '#f39c12', '#1abc9c'];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AvatarModule.forRoot({
      colors: avatarColors
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
