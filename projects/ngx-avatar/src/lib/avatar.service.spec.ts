import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AvatarService } from "./avatar.service";
import { AVATAR_CONFIG } from "./avatar-config.token";

describe("AvatarService", () => {
  let avatarService: AvatarService;
  let httpMock: HttpTestingController;

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
