import { Md5 } from 'ts-md5';
import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';

function isRetina(): boolean {
  if (typeof window !== 'undefined' && window !== null) {
    if (window.devicePixelRatio > 1.25) {
      return true;
    }

    const mediaQuery = '(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)';
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }

  return false;
}

/**
 *  Gravatar source implementation.
 *  Fetch avatar source based on gravatar email
 */
export class Gravatar implements Source {
  readonly sourceType: AvatarSource = AvatarSource.GRAVATAR;
  public sourceId: string;

  constructor(public value: string) {
    this.sourceId = value.match('^[a-f0-9]{32}$')
      ? value
      : Md5.hashStr(value).toString();
  }

  public getAvatar(size: number): string {
    const avatarSize = isRetina() ? size * 2 : size;
    return `https://secure.gravatar.com/avatar/${
      this.sourceId
    }?s=${avatarSize}&d=404`;
  }
}
