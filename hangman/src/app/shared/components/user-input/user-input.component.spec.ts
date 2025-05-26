import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInputComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit guess event on valid submit', () => {
    const spy = jest.spyOn(component.guess, 'emit');
    component.form.setValue({ letter: 'A' });
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith('a');
  });

  it('should not emit guess if form is invalid', () => {
    const spy = jest.spyOn(component.guess, 'emit');
    component.form.setValue({ letter: '' });
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit guess if game is over', () => {
    const spy = jest.spyOn(component.guess, 'emit');
    component.gameOver = true;
    component.form.setValue({ letter: 'A' });
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should disable input when gameOver is true', () => {
    component.gameOver = true;
    component.ngOnChanges({ gameOver: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    expect(component.form.get('letter')?.disabled).toBeTruthy();
  });

  it('should enable input when gameOver is false', () => {
    component.gameOver = false;
    component.ngOnChanges({ gameOver: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } });
    expect(component.form.get('letter')?.enabled).toBeTruthy();
  });

  it('should reset form and focus input on resetKey change', (done) => {
    component.letterInput = { nativeElement: { focus: jest.fn() } } as any;
    component.form.setValue({ letter: 'A' });
    component.resetKey = 1;
    component.ngOnChanges({ resetKey: { currentValue: 1, previousValue: 0, firstChange: false, isFirstChange: () => false } });
    setTimeout(() => {
      expect(component.form.get('letter')?.value).toBeNull();
      expect(component.form.pristine).toBeTruthy();
      expect(component.form.untouched).toBeTruthy();
      expect(component.letterInput?.nativeElement.focus).toHaveBeenCalled();
      done();
    });
  });

  it('should focus input after valid submit', (done) => {
    component.letterInput = { nativeElement: { focus: jest.fn() } } as any;
    component.form.setValue({ letter: 'A' });
    component.onSubmit();
    setTimeout(() => {
      expect(component.letterInput?.nativeElement.focus).toHaveBeenCalled();
      done();
    });
  });

  it('should focus input after invalid submit', (done) => {
    component.letterInput = { nativeElement: { focus: jest.fn() } } as any;
    component.form.setValue({ letter: '' });
    component.onSubmit();
    setTimeout(() => {
      expect(component.letterInput?.nativeElement.focus).toHaveBeenCalled();
      done();
    });
  });
});
