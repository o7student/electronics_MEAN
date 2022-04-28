import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotDetailsComponent } from './pot-details.component';

describe('PotDetailsComponent', () => {
  let component: PotDetailsComponent;
  let fixture: ComponentFixture<PotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
