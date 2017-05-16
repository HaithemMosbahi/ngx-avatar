import { Source } from "./source";

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

    getAvatar(): string {
        return "";
    }
}
