import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button text', () => {
    component.text = 'Click Me';
    fixture.detectChanges();
    expect(button.textContent).toContain('Click Me');
  });

  it('should be disabled when [disabled] is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });

  it('should emit click event when clicked', () => {
    const clickSpy = jest.spyOn(button, 'click');
    button.click();
    expect(clickSpy).toHaveBeenCalled();
  });
});
