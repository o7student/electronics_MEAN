import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcouponComponent } from './listcoupon.component';

describe('ListcouponComponent', () => {
  let component: ListcouponComponent;
  let fixture: ComponentFixture<ListcouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
