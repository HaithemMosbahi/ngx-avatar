import { AvatarConfig } from './avatar-config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { HttpModule } from "@angular/http";
import { SourceFactory } from "./sources/source.factory";
export * from './avatar.component';
export * from './sources/source';
export * from './sources/source.factory';
export * from './sources/utils';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    AvatarComponent
  ],
  providers: [SourceFactory],
  exports: [
    AvatarComponent
  ]

})
export class AvatarModule {
  static forRoot(avatarConfig:AvatarConfig):ModuleWithProviders{
    return {
      ngModule: AvatarModule,
      providers:[{provide:'avatarConfig',useValue: avatarConfig}]
    }
  }
 }
