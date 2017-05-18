import { Injectable } from '@angular/core';
import { Source } from "./source.model";
const avatarColors: string[] = [
  "#1abc9c", "#3498db", "#f1c40f", "#8e44ad", "#e74c3c", "#d35400", "#2c3e50", "#7f8c8d"
];

export const sources = [
  "FACEBOOK",
  "GOOGLE",
  "TWITTER",
  "SKYPE",
  "GRAVATAR",
  "CUSTOM",
  "INITIALS",
  "VALUE"];

@Injectable()
export class AvatarService {

  constructor() { }

  getFacebookAvatar(facebookId: string, size: number): string {
    return 'https://graph.facebook.com/' +
      `${facebookId}/picture?width=${size}&height=${size}`;
  }

  getTwitterAvatar(twitterId: string, size: number): string {
    return `https://twitter.com/${twitterId}/profile_image?size=${size}`;
  }

  getGoogleAvatar(googleId: string, size: number): string {
    let url = `https://picasaweb.google.com/data/entry/api/user/${googleId}?alt=json`;

    return "";
  }
  getSkypeAvatar(skypeId: string): string {
    return `https://api.skype.com/users/${skypeId}/profile/avatar`;;
  }

  getNameAvatar(): string {
    return "";
  }


  getRandomColor(): string {
    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  }

  _hasLocalStorage() {
    return typeof Storage !== 'undefined';
  }

  _fetchHasFailed(source: string) {
    const cache = localStorage.getItem("ng2-avatar") || '';
    return cache.indexOf(source) > -1;
  }

  getSourcePriority(source: string) {
    return sources.indexOf(source.toUpperCase());
  }

}
