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
    getAvatar(size?: number): string;
}

