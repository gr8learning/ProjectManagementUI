import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoModuleSelectedComponent } from './no-module-selected.component';

describe('NoModuleSelectedComponent', () => {
  let component: NoModuleSelectedComponent;
  let fixture: ComponentFixture<NoModuleSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoModuleSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoModuleSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
