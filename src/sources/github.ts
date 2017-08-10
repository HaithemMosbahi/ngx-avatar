import { Source } from "./source";

/**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 * 
 * @export
 * @class Github
 * @implements {Source}
 */
export class Github implements Source {
    readonly sourceType = "GITHUB";

    constructor(public sourceId: string) {
    }

    getAvatar(): string {
        return `https://api.github.com/users/${this.sourceId}`;
    }
}
