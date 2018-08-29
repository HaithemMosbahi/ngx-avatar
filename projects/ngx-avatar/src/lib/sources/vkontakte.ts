import { AsyncSource } from './async-source';

/**
 *  Vkontakte source impelementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 */
const apiVersion = 5.8;
export class Vkontakte extends AsyncSource {
  readonly sourceType: string = 'VKONTAKTE';

  constructor(sourceId: string) {
    super(sourceId);
  }

  getAvatar(size: number): string {
    const imgSize = this._getImageSize(size);
    return `https://api.vk.com/method/users.get?user_id=${this.sourceId}&v=${apiVersion}&fields=${imgSize}`;
  }

  /**
   * Returns image size related to vkontakte API
   * @param size
   */
  _getImageSize(size: number) {
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

  /**
   * extract vkontakte avatar from json data
   */
  processResponse(data: any) {
    // avatar key property is the size used to generate avatar url
    // size property is always the last key in the response object
    const sizeProperty = Object.keys(data['response'][0]).pop();
    // return avatar src
    return data['response'][0][sizeProperty];
  }
}
