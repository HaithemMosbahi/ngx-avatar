import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { AvatarSource } from './sources/avatar-source.enum';
import { of } from 'rxjs';

class AvatarServiceMock {
  public fetchAvatar(source: string) {
    return of(true);
  }
  public compareSources(source1: AvatarSource, source2: AvatarSource) {
    return 0;
  }
  public isSource(source: string) {
    return true;
  }

  public isTextAvatar(source: string) {
    return true;
  }

  public getRandomColor(source: string) {
    return '';
  }
}

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let avatarService: AvatarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent],
      providers: [
        SourceFactory,
        { provide: AvatarService, useClass: AvatarServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    avatarService = TestBed.get(AvatarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AvatarText', () => {
    it('should display the initials of the given value', () => {
      spyOn(avatarService, 'isSource').and.returnValue(true);
      spyOn(avatarService, 'isTextAvatar').and.returnValue(true);
      component.initials = 'John Doe';
      component.ngOnChanges({
        initials: new SimpleChange(null, 'John Doe', true)
      });

      fixture.detectChanges();

      const avatarTextEl = fixture.debugElement.query(
        By.css('.avatar-container > div')
      );
      expect(avatarTextEl.nativeElement.textContent.trim()).toBe('JD');
    });
  });

  describe('AvatarImage', () => {});
});
