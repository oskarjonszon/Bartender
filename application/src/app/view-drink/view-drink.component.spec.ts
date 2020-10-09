import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrinkComponent } from './view-drink.component';

describe('ViewDrinkComponent', () => {
  let component: ViewDrinkComponent;
  let fixture: ComponentFixture<ViewDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
