import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ToastrModule.forRoot()
      ],
      declarations: [LoginComponent],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a valid login and register form with empty fields', () => {
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should have a valid login form with email and password set up', () => {
    component.loginForm.controls['loginEmail'].setValue('inventar@test.ch');
    component.loginForm.controls['loginPassword'].setValue('testok');

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('email field should have an invalid email pattern', () => {
    component.loginForm.controls['loginEmail'].setValue('notAnValidMail.ch');
    const email = component.loginForm.controls['loginEmail'];

    expect(email.invalid).toBeTruthy();
  });

  it('password field should not be valid with less than 6 characters', () => {
    component.loginForm.controls['loginPassword'].setValue('1234');
    const pw = component.loginForm.controls['loginPassword'];

    expect(pw.invalid).toBeTruthy();
  });
});
