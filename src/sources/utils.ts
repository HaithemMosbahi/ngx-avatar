
/**
 * list of Supported avatar sources
 */
export const sources = [
    "FACEBOOK",
    "GOOGLE",
    "TWITTER",
    "VKONTAKTE",
    "SKYPE",
    "GRAVATAR",
    "GITHUB",
    "CUSTOM",
    "INITIALS",
    "VALUE"];

/**
 * list of default colors
 */
export const defaultColors = [
    "#1abc9c",
    "#3498db",
    "#f1c40f",
    "#8e44ad",
    "#e74c3c",
    "#d35400",
    "#2c3e50",
    "#7f8c8d"
];


/**
 * Get a random color. 
 * The color is based on the ascii code of the given value.
 * This will guarantee that avatars with the same value
 * will have the same background color
 * 
 * @export
 * @returns {string} 
 */
export function getRandomColor(value:string): string {
    if(!value)
        return 'transparent';
    const asciiCodeSum = _calculateAsciiCode(value);
    return defaultColors[asciiCodeSum % defaultColors.length];
}

/**
 * Get source priority 
 * Facebook has the highest priority, Value has the lowest 
 * @param source 
 * @param avatarSources 
 */
export function getSourcePriority(source: string, avatarSources = sources){
    return sources.indexOf(source.toUpperCase());
}

/**
 * Check if the given source is a valid avatar source or not.
 * 
 * @export
 * @param {string} source 
 * @returns {boolean} 
 */
export function isSource(source:string):boolean{
    return sources.findIndex((item) => item === source.toUpperCase()) > -1;
}


/**
 * return the sum of ascii code of the given string
 * @param value 
 */
function _calculateAsciiCode(value:string){
    return value.split('').map(letter => letter.charCodeAt(0))
        .reduce((previous,current) => previous + current);
}

/**
 * check wether the avatar type is asyn or not
 * Async avatar sources require an http call in order to fetch avatar image
 * @param sourceType 
 */
export function isAsyncAvatar(sourceType: string): boolean {
    return ["GOOGLE", "VKONTAKTE", "GITHUB"].indexOf(sourceType) > -1;
}

/**
 * Check wether the type of avatar is text or not.
 * 
 * @export
 * @param {string} sourceType 
 * @returns {boolean} 
 */
export function isTextAvatar(sourceType:string):boolean{
    return ["INITIALS","VALUE"].indexOf(sourceType) > -1;

}

/**
 * Extract avatar image from the given data object.
 * The extraction path is based on the sourceType.
 * 
 * @export
 * @param {string} sourceType 
 * @param {*} data 
 */
export function extractAsyncAvatarData(sourceType:string,data:any,size:number){
    switch (sourceType) {
        case "GOOGLE":
            return _extractGoogleAvatar(data,size);
        case "VKONTAKTE":
            return _extractVkontakteAvatar(data);
        case "GITHUB":
            return _extractGithubAvatar(data, size);
        default:
            // source not defined
            return undefined;
    }
}

/**
 * Extract google avatar from json data
 * 
 * @param {*} data 
 * @returns 
 * @memberof AvatarComponent
 */
function _extractGoogleAvatar(data: any,size:number) {
    const avatarSrc = data.entry.gphoto$thumbnail.$t;
    if (avatarSrc) {
        return avatarSrc.replace('s64', 's' +size);;
    }
}

/**
 * extract vkontakte avatar from json data
 * 
 * @param {*} data 
 * @returns 
 * @memberof AvatarComponent
 */
function _extractVkontakteAvatar(data: any) {
    // avatar key property is the size used to generate avatar url
    // size property is always the last key in the response object
    const sizeProperty = Object.keys(data["response"][0]).pop();
    // return avatar src
    return data["response"][0][sizeProperty];
}

/**
* extract github avatar from json data
*
* @param {*} data
* @returns url of the github avatar icon
* @memberof AvatarComponent
*/
function _extractGithubAvatar(data: any, size?: number) {
    if (size) {
        return `${data.avatar_url}&s=${size}`;
    }
    return data.avatar_url;
}
