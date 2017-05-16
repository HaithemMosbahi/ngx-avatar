import { Source } from "./source";

/**
 *  Twitter source impelementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 * 
 * @export
 * @class Twitter
 * @implements {Source}
 */
export class Twitter implements Source {
    readonly sourceType: string = "TWITTER";
    constructor(public sourceId: string, public size: number) {
    }
    getAvatar(): string {
        return `https://twitter.com/${this.sourceId}/profile_image?size=${this.size}`;
    }
}