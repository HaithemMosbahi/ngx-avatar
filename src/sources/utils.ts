
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
 * Get a random color 
 * 
 * @export
 * @returns {string} 
 */
export function getRandomColor(colors = defaultColors): string {
    return colors[Math.floor(Math.random() * colors.length)];
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