import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNavbarComponent } from './btn-navbar.component';

describe('BtnNavbarComponent', () => {
  let component: BtnNavbarComponent;
  let fixture: ComponentFixture<BtnNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
