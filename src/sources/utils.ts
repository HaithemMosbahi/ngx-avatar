
/**
 * list of Supported avatar sources
 */
export const sources = [
  "FACEBOOK",
  "GOOGLE",
  "TWITTER",
  "SKYPE",
  "GRAVATAR",
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