import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';

/**
 *  Google source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Google extends AsyncSource {
  readonly sourceType: AvatarSource = AvatarSource.GOOGLE;

  constructor(sourceId: string) {
    super(sourceId);
  }

  public getAvatar(): string {
    return `https://picasaweb.google.com/data/entry/api/user/${
      this.sourceId
    }?alt=json`;
  }

  /**
   * Extract google avatar from json data
   */
  public processResponse(data: { entry: { gphoto$thumbnail: { $t: string } } }, size?: number): string | null {
    const avatarSrc = data.entry.gphoto$thumbnail.$t;
    if (avatarSrc) {
      return avatarSrc.replace('s64', 's' + size);
    }

    return null;
  }
}
