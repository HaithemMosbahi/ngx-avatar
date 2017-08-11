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
    readonly isAsync: boolean;
    getAvatar(size?: number): string;
}

/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 * @interface AsyncSource
 */
export interface AsyncSource extends Source {
    processResponse(data: any, size?: number): string;
}

