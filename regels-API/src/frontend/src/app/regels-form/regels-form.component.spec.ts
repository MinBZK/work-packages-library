import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegelsFormComponent } from './regels-form.component';

describe('RegelsFormComponent', () => {
  let component: RegelsFormComponent;
  let fixture: ComponentFixture<RegelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegelsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
