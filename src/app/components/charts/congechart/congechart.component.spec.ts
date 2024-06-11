import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongechartComponent } from './congechart.component';

describe('CongechartComponent', () => {
  let component: CongechartComponent;
  let fixture: ComponentFixture<CongechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
