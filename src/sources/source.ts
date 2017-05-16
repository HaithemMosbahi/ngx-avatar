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
 * Export all sources 
 */
export * from './';