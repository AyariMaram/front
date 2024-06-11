import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercongechartComponent } from './percongechart.component';

describe('PercongechartComponent', () => {
  let component: PercongechartComponent;
  let fixture: ComponentFixture<PercongechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PercongechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PercongechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
