import { AvatarConfigService } from './avatar-config.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { AvatarConfig } from './avatar-config';
import { defaultSources, defaultColors } from './avatar.service';

describe('AvatarConfigService', () => {
  describe('AvatarSources', () => {
    it('should return the list of sources with the default order when the user provides an empty list of sources', () => {
      const userConfig: AvatarConfig = { sourcePriorityOrder: [] };
      const avatarConfigService = new AvatarConfigService(userConfig);

      expect(avatarConfigService.getAvatarSources(defaultSources)).toEqual(
        defaultSources
      );
    });

    it('should return the list of sources with the default order when the user does not provide a custom avatar configuration', () => {
      const avatarConfigService = new AvatarConfigService({});

      expect(avatarConfigService.getAvatarSources(defaultSources)).toEqual(
        defaultSources
      );
    });

    it('should return the list of sources with the default order when the user provides an unknown list of sources', () => {
      const userConfig: AvatarConfig = {
        sourcePriorityOrder: ['UNKNOWN_SOURCE' as AvatarSource]
      };
      const avatarConfigService = new AvatarConfigService(userConfig);

      expect(avatarConfigService.getAvatarSources(defaultSources)).toEqual(
        defaultSources
      );
    });

    it('should override the source priority order when the user provides a valid list of sources', () => {
      const userConfig: AvatarConfig = {
        sourcePriorityOrder: [AvatarSource.INITIALS, AvatarSource.TWITTER]
      };
      const avatarConfigService = new AvatarConfigService(userConfig);

      const expectedSourcesOrder = [
        AvatarSource.INITIALS,
        AvatarSource.TWITTER,
        AvatarSource.FACEBOOK,
        AvatarSource.GOOGLE,
        AvatarSource.INSTAGRAM,
        AvatarSource.VKONTAKTE,
        AvatarSource.SKYPE,
        AvatarSource.GRAVATAR,
        AvatarSource.GITHUB,
        AvatarSource.CUSTOM,
        AvatarSource.VALUE
      ];
      expect(avatarConfigService.getAvatarSources(defaultSources)).toEqual(
        expectedSourcesOrder
      );
    });

    it('should ignore redundant sources', () => {
      const userConfig: AvatarConfig = {
        sourcePriorityOrder: [AvatarSource.INITIALS, AvatarSource.INITIALS]
      };
      const avatarConfigService = new AvatarConfigService(userConfig);

      const expectedSourcesOrder = [
        AvatarSource.INITIALS,
        AvatarSource.FACEBOOK,
        AvatarSource.GOOGLE,
        AvatarSource.TWITTER,
        AvatarSource.INSTAGRAM,
        AvatarSource.VKONTAKTE,
        AvatarSource.SKYPE,
        AvatarSource.GRAVATAR,
        AvatarSource.GITHUB,
        AvatarSource.CUSTOM,
        AvatarSource.VALUE
      ];
      expect(avatarConfigService.getAvatarSources(defaultSources)).toEqual(
        expectedSourcesOrder
      );
    });
  });

  describe('AvatarColors', () => {
    it('should return the user\'s list of colors when provided in the avatar configuration', () => {
      const userColors = ['#ccc', '#fff'];
      const userConfig: AvatarConfig = {
        colors: userColors
      };

      const avatarConfigService = new AvatarConfigService(userConfig);

      expect(avatarConfigService.getAvatarColors(defaultColors)).toBe(
        userColors
      );
    });

    it('should return the default colors when no colors are provided in the avatar configuration', () => {
      const avatarConfigService = new AvatarConfigService({});

      expect(avatarConfigService.getAvatarColors(defaultColors)).toBe(
        defaultColors
      );
    });
  });
});
