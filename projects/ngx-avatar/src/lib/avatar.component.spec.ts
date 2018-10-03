import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AvatarComponent } from "./avatar.component";
import { SourceFactory } from "./sources/source.factory";
import { AvatarService } from "./avatar.service";

const AvatarServiceStub = {
  getSourcePriority: jasmine.createSpy('avatarService.getSourcePriority'),
  isSource: jasmine.createSpy('avatarService.isSource'),
  isTextAvatar: jasmine.createSpy('avatarService.isTextAvatar'),
  getRandomColors: jasmine.createSpy('avatarService.getRandomColors') ,
  fetchAvatar: jasmine.createSpy('avatarService.fetchAvatar')
}

describe("AvatarComponent", () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent],
      providers: [
        SourceFactory,
        {provide: AvatarService, useValue: AvatarServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
