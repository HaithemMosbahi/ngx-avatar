import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Facebook source implementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export class Facebook implements Source {
  readonly sourceType: AvatarSource = AvatarSource.FACEBOOK;

  constructor(public sourceId: string) {}

  public getAvatar(size: number): string {
    return (
      'https://graph.facebook.com/' +
      `${this.sourceId}/picture?width=${size}&height=${size}`
    );
  }
}
