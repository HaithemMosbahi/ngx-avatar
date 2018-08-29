import { AsyncSource } from './async-source';

/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Google extends AsyncSource {
  readonly sourceType = 'GOOGLE';

  constructor(sourceId: string) {
    super(sourceId);
  }

  getAvatar(): string {
    return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
  }


  /**
   * Extract google avatar from json data
   */
  processResponse(data: any, size?: number) {
    const avatarSrc = data.entry.gphoto$thumbnail.$t;
    if (avatarSrc) {
      return avatarSrc.replace('s64', 's' + size);
    }
  }
}
