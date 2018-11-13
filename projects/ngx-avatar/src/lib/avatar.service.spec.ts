import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AvatarService } from "./avatar.service";
import { AVATAR_CONFIG } from "./avatar-config.token";
import { AvatarSource } from "./sources/avatar-source.enum";
import { AvatarConfig } from "./avatar-config";
import { HttpClientTestingBackend } from "@angular/common/http/testing/src/backend";
import { HttpClient } from "@angular/common/http";
import { assertDataInRangeInternal } from "@angular/core/src/render3/util";

describe("AvatarService", () => {
  let avatarService: AvatarService;
  let httpMock: HttpTestingController;


  describe("Avatar service with default configuration", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AvatarService, { provide: AVATAR_CONFIG, useValue: {} }]
      });

      avatarService = TestBed.get(AvatarService);
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it("should be created", () => {
      expect(avatarService).toBeTruthy();
    });

    describe("fetchAvatar", () => {
      it("should send get request and fetch avatar data from the given url", () => {
        const avatarUrl = "dummy-avatar-url";
        const expectedAvatarData = {
          img: "url-for-avatar-img"
        };
        avatarService.fetchAvatar(avatarUrl).subscribe(avatarData => {
          expect(avatarData).toEqual(expectedAvatarData);
        });

        const req = httpMock.expectOne(
          request => request.method === "GET" && request.url === avatarUrl
        );
        req.flush(expectedAvatarData);
      });
    });

    describe("isSource", () => {
      it("should return true when the given value is a valid avatar source", () => {
        const isValidAvatar = avatarService.isSource(AvatarSource.GITHUB);

        expect(isValidAvatar).toBeTruthy();
      });

      it("should return false when the given value is not a valid avatar source", () => {
        const isValidAvatar = avatarService.isSource("unknown-source");

        expect(isValidAvatar).toBeFalsy();
      });
    });

    describe("isTextAvatar", () => {
      it("should return true when the given value is a text avatar", () => {
        expect(avatarService.isTextAvatar(AvatarSource.INITIALS)).toBeTruthy();
      });

      it("should return false when the given value is not a text avatar", () => {
        expect(avatarService.isTextAvatar(AvatarSource.GITHUB)).toBeFalsy();

      });
    });

    describe("getRandomColor", () => {
      it("should return transparent when the given value is undefined", () => {
        const color = avatarService.getRandomColor(undefined);

        expect(color).toBe("transparent");
      });

      it("should return a random color based on the ascii code of the given value is", () => {
        const color = avatarService.getRandomColor("random name");
        const cssColorRegex = /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/;
        expect(color).toMatch(cssColorRegex);
      });

      it("should not return the same color for two different values", () => {
        const color1 = avatarService.getRandomColor("name1");
        const color2 = avatarService.getRandomColor("name2");

        expect(color1).not.toBe(color2);
      });
    });

    describe("compareSources", () => {
      it("should return a negative value when the first avatar type comes after the second one", () => {
        expect(avatarService.copmareSources(AvatarSource.FACEBOOK, AvatarSource.GOOGLE)).toBeLessThan(0);
      });

      it("should return a positive value when the first avatar type comes before the second one", () => {
        expect(avatarService.copmareSources(AvatarSource.INITIALS, AvatarSource.FACEBOOK)).toBeGreaterThan(0);
      });

      it("should return a zero value when the two give values are equales", () => {
        expect(avatarService.copmareSources(AvatarSource.GITHUB, AvatarSource.GITHUB)).toBe(0);
      });
    });
  });

  describe("Avatar service with custom configuration", () => {

        const defaultSourcePriorityOrder = getDetaultSourcePriorityOrder();

        describe('Override avatar source priority order', () => {

            it('should not override the priority order when the user provides an empty list of sources',
                () => {
                    let configWithEmptySources: AvatarConfig = { sourcePriorityOrder: [] };

      TestBed.configureTestingModule({
                        imports: [HttpClientTestingModule],
                        providers: [AvatarService, { provide: AVATAR_CONFIG, useValue: configWithEmptySources }]
      });

                    avatarService = TestBed.get(AvatarService);
      
                    let expectedSourcePriorityOrder = avatarService.avatarSources;

                    expect(expectedSourcePriorityOrder).toBe(defaultSourcePriorityOrder);

    });

            it('should not override the priority order when the user provide an unknown list of sources',
                () => {

                    let unknowSources: any = ['unknownSource', 'anotherUnknownSource', 'anotherUnknownSource']
                    const configWithUnknownSources: AvatarConfig = { sourcePriorityOrder: unknowSources };

        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
                        providers: [AvatarService, { provide: AVATAR_CONFIG, useValue: configWithUnknownSources }]
        });
  
        avatarService = TestBed.get(AvatarService);

                    let expectedSourcePriorityOrder = avatarService.avatarSources;

                    expect(expectedSourcePriorityOrder).toBe(defaultSourcePriorityOrder);
      });
  
            it('should override the priority order when the user provides a valid list of sources',
                () => {

                    const avatarConfigWithValidSources: AvatarConfig = {
                        sourcePriorityOrder: [
                            AvatarSource.GRAVATAR, AvatarSource.GITHUB, AvatarSource.FACEBOOK, AvatarSource.TWITTER,
                            AvatarSource.SKYPE
                        ]
                    };

                    TestBed.configureTestingModule({
                        imports: [HttpClientTestingModule],
                        providers: [
                            AvatarService, { provide: AVATAR_CONFIG, useValue: avatarConfigWithValidSources }
                        ]
      });
  
                    avatarService = TestBed.get(AvatarService);
        
                    let expectedSourcePriorityOrder = avatarService.avatarSources;

                    expect(expectedSourcePriorityOrder).toBe(defaultSourcePriorityOrder);

      });
  
            it('should ignore redundant sources',
                () => {
                    const redundantSource = AvatarSource.GITHUB;
                    const redundantSources = [redundantSource, redundantSource, redundantSource];
                    const avatarConfigWithRedundantSources: AvatarConfig =
                        { sourcePriorityOrder: redundantSources };
        
                    TestBed.configureTestingModule({
                        imports: [HttpClientTestingModule],
                        providers: [
                            AvatarService, { provide: AVATAR_CONFIG, useValue: avatarConfigWithRedundantSources }
                        ]
      });
  
                    avatarService = TestBed.get(AvatarService);

                    let expectedSourcePriorityOrder = avatarService.avatarSources;
                    let countOfRedundantSource = expectedSourcePriorityOrder
                        .filter(source => source === redundantSource).length;
        
                    expect(countOfRedundantSource).toBe(1)
      });
  
            it("should maintain sources not provided in configuration", () => {

                const incompleteDefaultSources = defaultSourcePriorityOrder.slice(0, defaultSourcePriorityOrder.length / 2);


                TestBed.configureTestingModule({
                    imports: [HttpClientTestingModule],
                    providers: [
                        AvatarService, { provide: AVATAR_CONFIG, useValue: incompleteDefaultSources }
                    ]
  });

                avatarService = TestBed.get(AvatarService);

                let expectedSourcePriorityOrder = avatarService.avatarSources;


                expect(expectedSourcePriorityOrder.length).toBe(defaultSourcePriorityOrder.length)
});

            it("should maintain default order of sources if not provided in configuration", () => {

                const validSources = [
                    AvatarSource.GRAVATAR, AvatarSource.GITHUB, AvatarSource.FACEBOOK, AvatarSource.TWITTER,
                    AvatarSource.SKYPE
                ]
                const avatarConfigWithValidSources: AvatarConfig = { sourcePriorityOrder: validSources };

                const defaultOrderOfSourcesNotProvided = defaultSourcePriorityOrder.filter(function(item) {
                    return !validSources.includes(item);
                });

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
                    providers: [
                        AvatarService, { provide: AVATAR_CONFIG, useValue: avatarConfigWithValidSources }
                    ]
                });
                debugger;
                avatarService = TestBed.get(AvatarService);

                const expectedSourcePriorityOrder = avatarService.avatarSources;

                const sourcesNotProvided = expectedSourcePriorityOrder.filter(function(item) {
                    return !validSources.includes(item);
                });
                expect(sourcesNotProvided).toEqual(defaultOrderOfSourcesNotProvided)

            });
        });

    });
  });


function getDetaultSourcePriorityOrder(): AvatarSource[] {
    let avatarService: AvatarService;

    avatarService = new AvatarService(null, null)

    return avatarService.avatarSources;

}


