import { AsyncSource } from "./async-source";

/**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 *
 * @export
 * @class Github
 * @implements {AsyncSource}
 */
export class Github extends AsyncSource {
    readonly sourceType = "GITHUB";

    constructor(sourceId: string) {
        super(sourceId);
    }

    getAvatar(): string {
        return `https://api.github.com/users/${this.sourceId}`;
    }

    /**
    * extract github avatar from json data
    *
    * @param {*} data The data returned from the souce API
    * @param {number} size The size of the image requested
    * @returns url of the github avatar icon
    * @memberof AvatarComponent
    */
    processResponse(data: any, size?: number) {
        if (size) {
            return `${data.avatar_url}&s=${size}`;
        }
        return data.avatar_url;
    }


}
