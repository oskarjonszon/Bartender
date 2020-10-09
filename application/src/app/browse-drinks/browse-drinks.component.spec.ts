import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDrinksComponent } from './browse-drinks.component';

describe('BrowseDrinksComponent', () => {
  let component: BrowseDrinksComponent;
  let fixture: ComponentFixture<BrowseDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
