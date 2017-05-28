import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { HttpModule } from "@angular/http";
export * from './avatar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    AvatarComponent
  ],
  exports: [
    AvatarComponent
     ]
})
export class AvatarModule {}
