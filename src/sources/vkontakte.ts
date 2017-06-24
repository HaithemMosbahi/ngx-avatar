import { Source } from "./source";

/**
 *  Vkontakte source impelementation.
 *  Fetch avatar source based on vkontakte identifier
 *  and image size
 * 
 * @export
 * @class Google
 * @implements {Source}
 */
const apiVersion = 5.8;
export class Vkontakte implements Source {
    readonly sourceType: string = "VKONTAKTE";

    constructor(public sourceId: string) {
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
        if (size <= 50)
            return 'photo_50';

        if (size <= 100)
            return 'photo_100';

        if (size <= 200)
            return 'photo_200';

        return 'photo_max';
    }
}
