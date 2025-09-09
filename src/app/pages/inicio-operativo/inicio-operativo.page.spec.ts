import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioOperativoPage } from './inicio-operativo.page';

describe('InicioOperativoPage', () => {
  let component: InicioOperativoPage;
  let fixture: ComponentFixture<InicioOperativoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioOperativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
