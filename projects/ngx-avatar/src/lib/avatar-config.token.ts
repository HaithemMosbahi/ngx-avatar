import { InjectionToken } from '@angular/core';

import { AvatarConfig } from './avatar-config';
/**
 * Token used to inject the AvatarConfig object
 */
export const AVATAR_CONFIG = new InjectionToken<AvatarConfig>('avatar.config');
