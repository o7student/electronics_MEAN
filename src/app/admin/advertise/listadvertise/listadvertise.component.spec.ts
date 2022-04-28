import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadvertiseComponent } from './listadvertise.component';

describe('ListadvertiseComponent', () => {
  let component: ListadvertiseComponent;
  let fixture: ComponentFixture<ListadvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadvertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
