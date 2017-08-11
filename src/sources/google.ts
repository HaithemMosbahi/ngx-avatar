import { AsyncSource } from "./source";

/**
 *  Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 *
 * @export
 * @class Google
 * @implements {AsyncSource}
 */
export class Google implements AsyncSource {
    readonly sourceType = "GOOGLE";
    readonly isAsync = true;

    constructor(public sourceId: string) {
    }

    getAvatar(): string {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }


    /**
     * Extract google avatar from json data
     *
     * @param {*} data
     * @returns
     * @memberof Google
     */
    processResponse(data: any, size?: number) {
        const avatarSrc = data.entry.gphoto$thumbnail.$t;
        if (avatarSrc) {
            return avatarSrc.replace('s64', 's' + size);
        }
    }
}
