import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardAddComponent } from './item-card-add.component';

describe('ItemCardAddComponent', () => {
  let component: ItemCardAddComponent;
  let fixture: ComponentFixture<ItemCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCardAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
