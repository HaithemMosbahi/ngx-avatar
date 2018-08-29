import { AvatarConfig } from './avatar-config';
import { InjectionToken } from '@angular/core';
/**
 * Token used to inject the AvatarConfig object
 */
export let AVATAR_CONFIG = new InjectionToken<AvatarConfig>('avatar.config');

