import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileManagentComponent } from './admin-file-managent.component';

describe('AdminFileManagentComponent', () => {
  let component: AdminFileManagentComponent;
  let fixture: ComponentFixture<AdminFileManagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFileManagentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFileManagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
