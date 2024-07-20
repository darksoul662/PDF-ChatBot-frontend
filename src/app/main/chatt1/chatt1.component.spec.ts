import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatt1Component } from './chatt1.component';

describe('Chatt1Component', () => {
  let component: Chatt1Component;
  let fixture: ComponentFixture<Chatt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Chatt1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chatt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
