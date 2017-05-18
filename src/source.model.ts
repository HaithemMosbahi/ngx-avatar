/**
 * Contract of all Sources.
 * Every source must implements the fetch mehod
 * in order to provide the avatar source.
 * 
 * @export
 * @interface Source
 */
export interface Source {
    sourceType: string;
    sourceId: string;
    size?: number;
    getAvatar(): string;
}



/**
 * Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 * 
 * @export
 * @class Facebook
 * @implements {ISource}
 */
export class Facebook implements Source {
    readonly sourceType: string = "FACEBOOK";


    constructor(public sourceId: string, public size: number) {
    }

    getAvatar(): string {
        return 'https://graph.facebook.com/' +
            `${this.sourceId}/picture?width=${this.size}&height=${this.size}`;
    }
}

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