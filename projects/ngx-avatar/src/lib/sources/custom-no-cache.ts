import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Custom source implementation (with no cache).
 *  return custom image as an avatar
 *
 */
export class CustomNoCache implements Source {
  readonly sourceType: AvatarSource = AvatarSource.CUSTOM;

  constructor(public sourceId: string) {}

  public getAvatar(): string {
    const urlSuffix = Math.random();
    const sourceId = `${this.sourceId}${this.sourceId.indexOf('?') > -1 ? '&' : '?'}_=${urlSuffix}`;
    return sourceId;
  }
}
