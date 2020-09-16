import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';

/**
 *  Vkontakte source implementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 */
const apiVersion = 5.8;

export class Vkontakte extends AsyncSource {
  readonly sourceType: AvatarSource = AvatarSource.VKONTAKTE;

  constructor(sourceId: string) {
    super(sourceId);
  }

  public getAvatar(size: number): string {
    const imgSize = this.getImageSize(size);
    return `https://api.vk.com/method/users.get?user_id=${
      this.sourceId
    }&v=${apiVersion}&fields=${imgSize}`;
  }

  /**
   * extract vkontakte avatar from json data
   */
  public processResponse(data: {
    response: {
      [key: string]: string;
    }[]
  }): string | null {
    // avatar key property is the size used to generate avatar url
    // size property is always the last key in the response object
    const sizeProperty = Object.keys(data['response'][0]).pop();
    if (!sizeProperty) {
      return null;
    }
    // return avatar src
    return data['response'][0][sizeProperty] || null;
  }

  /**
   * Returns image size related to vkontakte API
   */
  private getImageSize(size: number): string {
    if (size <= 50) {
      return 'photo_50';
    }

    if (size <= 100) {
      return 'photo_100';
    }

    if (size <= 200) {
      return 'photo_200';
    }

    return 'photo_max';
  }
}
