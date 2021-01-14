import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrunkCocktailPage } from './drunk-cocktail.page';

describe('DrunkCocktailPage', () => {
  let component: DrunkCocktailPage;
  let fixture: ComponentFixture<DrunkCocktailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrunkCocktailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrunkCocktailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
