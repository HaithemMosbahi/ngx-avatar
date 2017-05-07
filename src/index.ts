import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { AvatarService } from './avatar.service';

export * from './avatar.component';
export * from './avatar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvatarComponent
  ],
  exports: [
    AvatarComponent
     ]
})
export class AvatarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AvatarModule,
      providers: [AvatarService]
    };
  }
}
