import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesemployesComponent } from './mesemployes.component';

describe('MesemployesComponent', () => {
  let component: MesemployesComponent;
  let fixture: ComponentFixture<MesemployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesemployesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesemployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
