import { AvatarService } from './avatar.service';
import { AvatarConfig } from './avatar-config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { HttpClientModule } from '@angular/common/http';
import { SourceFactory } from "./sources/source.factory";
import { AVATAR_CONFIG } from "./avatar-config.token";
export * from './avatar.component';
export * from './sources/source';
export * from './sources/source.factory';
export * from './avatar-config';
export * from './avatar.service';
export * from "./avatar-config.token";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    AvatarComponent
  ],
  providers: [SourceFactory,AvatarService],
  exports: [
    AvatarComponent
  ]

})
export class AvatarModule {
  static forRoot(avatarConfig:AvatarConfig):ModuleWithProviders{
    return {
      ngModule: AvatarModule,
      providers:[{provide:AVATAR_CONFIG,useValue: avatarConfig}]
    }
  }
 }
