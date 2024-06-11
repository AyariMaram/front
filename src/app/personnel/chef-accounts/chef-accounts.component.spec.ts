import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefAccountsComponent } from './chef-accounts.component';

describe('ChefAccountsComponent', () => {
  let component: ChefAccountsComponent;
  let fixture: ComponentFixture<ChefAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChefAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChefAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
