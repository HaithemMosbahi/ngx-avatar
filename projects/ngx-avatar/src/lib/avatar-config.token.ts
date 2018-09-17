import { AvatarConfig } from './avatar-config';
import { InjectionToken } from '@angular/core';
/**
 * Token used to inject the AvatarConfig object
 */
export const AVATAR_CONFIG = new InjectionToken<AvatarConfig>('avatar.config');

