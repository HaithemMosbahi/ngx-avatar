
export type AvatarSource =
    'facebook' |
    'google' |
    'twitter' |
    'skype' |
    'gravatar' |
    'custom' |
    'initials';

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
    "INTIALS"
];

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
export function getRandomColor(value: string, colors = defaultColors): string {
    if (!value) {
        return 'transparent';
    }
    return colors[Math.floor(Math.random() * colors.length)];
}