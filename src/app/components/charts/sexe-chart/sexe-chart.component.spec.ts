import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexeChartComponent } from './sexe-chart.component';

describe('SexeChartComponent', () => {
  let component: SexeChartComponent;
  let fixture: ComponentFixture<SexeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SexeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SexeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
