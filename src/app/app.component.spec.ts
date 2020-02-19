import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

const userServiceStub = {
  fetchInformations: jasmine.createSpy('userService.fetchInformations'),
  getUserFacebook: jasmine.createSpy('userService.getUserFacebook')
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: UserService, use: userServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
