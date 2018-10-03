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

  it("should be created", () => {
    expect(avatarService).toBeTruthy();
  });
});
