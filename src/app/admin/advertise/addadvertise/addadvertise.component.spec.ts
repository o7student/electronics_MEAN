import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadvertiseComponent } from './addadvertise.component';

describe('AddadvertiseComponent', () => {
  let component: AddadvertiseComponent;
  let fixture: ComponentFixture<AddadvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddadvertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddadvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
