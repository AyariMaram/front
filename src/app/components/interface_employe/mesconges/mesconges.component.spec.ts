import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MescongesComponent } from './mesconges.component';

describe('MescongesComponent', () => {
  let component: MescongesComponent;
  let fixture: ComponentFixture<MescongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MescongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MescongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
