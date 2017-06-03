import { Source } from "./source";
import isRetina from "is-retina";
/**
 *  Gravatar source impelementation.
 *  Fetch avatar source based on gravatar email
 * 
 * @export
 * @class Gravatar
 * @implements {Source}
 */
export class Gravatar implements Source {
    readonly sourceType: string = "GRAVATAR";

    constructor(public sourceId: string) {
    }

    getAvatar(size:number): string {
        const avatarSize = isRetina() ? size * 2 : size;
        return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
    }
}
