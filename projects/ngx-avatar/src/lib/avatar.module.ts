import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarComponent } from './avatar.component';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AvatarConfig } from './avatar-config';
import { AVATAR_CONFIG } from './avatar-config.token';
import { AvatarConfigService } from './avatar-config.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AvatarComponent],
  providers: [SourceFactory, AvatarService, AvatarConfigService],
  exports: [AvatarComponent]
})
export class AvatarModule {
  static forRoot(avatarConfig?: AvatarConfig): ModuleWithProviders<AvatarModule> {
    return {
      ngModule: AvatarModule,
      providers: [
        { provide: AVATAR_CONFIG, useValue: avatarConfig ? avatarConfig : {} }
      ]
    };
  }
}
