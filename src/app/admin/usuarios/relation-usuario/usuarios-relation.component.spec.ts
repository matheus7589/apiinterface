import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRelationComponent } from './usuarios-relation.component';

describe('UsuariosRelationComponent', () => {
  let component: UsuariosRelationComponent;
  let fixture: ComponentFixture<UsuariosRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
