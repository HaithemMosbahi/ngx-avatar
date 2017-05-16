import { Source } from "./source";

/**
 * Google source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 * 
 * @export
 * @class Google
 * @implements {Source}
 */
export class Google implements Source {
    readonly sourceType: string = "GOOGLE";

    constructor(public sourceId: string) {
    }

    getAvatar(): string {
        return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
    }
}
