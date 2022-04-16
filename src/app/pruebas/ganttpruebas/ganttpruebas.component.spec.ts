import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttpruebasComponent } from './ganttpruebas.component';

describe('GanttpruebasComponent', () => {
  let component: GanttpruebasComponent;
  let fixture: ComponentFixture<GanttpruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttpruebasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttpruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
