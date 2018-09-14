import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AvatarComponent } from './avatar.component';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AvatarConfig } from './avatar-config';
import { AVATAR_CONFIG } from './avatar-config.token';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    AvatarComponent
  ],
  providers: [
    SourceFactory,
    AvatarService
  ],
  exports: [
    AvatarComponent
  ]

})
export class AvatarModule {
  static forRoot(avatarConfig: AvatarConfig): ModuleWithProviders {
    return {
      ngModule: AvatarModule,
      providers: [{ provide: AVATAR_CONFIG, useValue: avatarConfig }]
    };
  }
}
