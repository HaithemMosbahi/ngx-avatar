import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AvatarService, defaultSources, defaultColors } from './avatar.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { AvatarConfigService } from './avatar-config.service';

const avatarServiceConfigSpy = {
  getAvatarSources: jasmine
    .createSpy('avatarConfigService.getAvatarSources')
    .and.returnValue(defaultSources),
  getAvatarColors: jasmine
    .createSpy('avatarConfigService.getAvatarColors')
    .and.returnValue(defaultColors)
};

describe('AvatarService', () => {
  let avatarService: AvatarService;
  let httpMock: HttpTestingController;

  describe('Avatar service with default configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AvatarService,
          { provide: AvatarConfigService, useValue: avatarServiceConfigSpy }
        ]
      });

      avatarService = TestBed.get(AvatarService);
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(avatarService).toBeTruthy();
    });

    describe('fetchAvatar', () => {
      it('should send get request and fetch avatar data from the given url', () => {
        const avatarUrl = 'dummy-avatar-url';
        const expectedAvatarData = {
          img: 'url-for-avatar-img'
        };
        avatarService.fetchAvatar(avatarUrl).subscribe(avatarData => {
          expect(avatarData).toEqual(expectedAvatarData);
        });

        const req = httpMock.expectOne(
          request => request.method === 'GET' && request.url === avatarUrl
        );
        req.flush(expectedAvatarData);
      });
    });

    describe('isSource', () => {
      it('should return true when the given value is a valid avatar source', () => {
        const isValidAvatar = avatarService.isSource(AvatarSource.GITHUB);

        expect(isValidAvatar).toBeTruthy();
      });

      it('should return false when the given value is not a valid avatar source', () => {
        const isValidAvatar = avatarService.isSource('unknown-source');

        expect(isValidAvatar).toBeFalsy();
      });
    });

    describe('isTextAvatar', () => {
      it('should return true when the given value is a text avatar', () => {
        expect(avatarService.isTextAvatar(AvatarSource.INITIALS)).toBeTruthy();
      });

      it('should return false when the given value is not a text avatar', () => {
        expect(avatarService.isTextAvatar(AvatarSource.GITHUB)).toBeFalsy();
      });
    });

    describe('getRandomColor', () => {
      it('should return transparent when the given value is undefined', () => {
        const color = avatarService.getRandomColor('');

        expect(color).toBe('transparent');
      });

      it('should return a random color based on the ascii code of the given value is', () => {
        const color = avatarService.getRandomColor('random name');
        const cssColorRegex = /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/;
        expect(color).toMatch(cssColorRegex);
      });

      it('should not return the same color for two different values', () => {
        const color1 = avatarService.getRandomColor('name1');
        const color2 = avatarService.getRandomColor('name2');

        expect(color1).not.toBe(color2);
      });
    });

    describe('compareSources', () => {
      it('should return a negative value when the first avatar type comes after the second one', () => {
        expect(
          avatarService.copmareSources(
            AvatarSource.FACEBOOK,
            AvatarSource.GOOGLE
          )
        ).toBeLessThan(0);
      });

      it('should return a positive value when the first avatar type comes before the second one', () => {
        expect(
          avatarService.copmareSources(
            AvatarSource.INITIALS,
            AvatarSource.FACEBOOK
          )
        ).toBeGreaterThan(0);
      });

      it('should return a zero value when the two give values are equal', () => {
        expect(
          avatarService.copmareSources(AvatarSource.GITHUB, AvatarSource.GITHUB)
        ).toBe(0);
      });
    });
  });
});
