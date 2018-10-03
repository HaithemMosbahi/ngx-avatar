import { Source } from './source';

/**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export class Twitter implements Source {
  readonly sourceType: string = 'TWITTER';

  constructor(public sourceId: string) {
  }

  public getAvatar(size: number): string {
    const twitterImgSize = this.getImageSize(size);
    return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
  }

  private getImageSize(size: number) {
    if (size <= 24) {
      return 'mini';
    }

    if (size <= 48) {
      return 'normal';
    }

    if (size <= 73) {
      return 'bigger';
    }

    return 'original';
  }

}
