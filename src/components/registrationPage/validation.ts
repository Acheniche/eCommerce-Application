import ValidationLoginPage from '../loginPage/validation';

class ValidationRegistrationPage {
  private validationLoginPage: ValidationLoginPage;

  constructor() {
    this.validationLoginPage = new ValidationLoginPage();
  }

  public emailValidation(): void {
    this.validationLoginPage.emailValidation();
  }

  public passwordValidation(): void {
    this.validationLoginPage.passwordValidation();
  }

  public togglePasswordVisibility(): void {
    this.validationLoginPage.togglePasswordVisibility();
  }

  public nameValidation(name: HTMLInputElement, span: HTMLSpanElement) {
    const regex = /^[A-Za-z]+$/;
    if (name && span) {
      if (name.value.length > 0) {
        if (!(regex.test(name.value))) {
          span.innerHTML = 'No special characters or numbers';
        }
      } else {
        span.innerHTML = 'Must contain at least one character';
      }
    }
  }

  public firstNameCheck() {
    const name: HTMLInputElement | null = document.querySelector('.first-name');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-first-name');
    if (name && spanNotValid) {
      this.nameValidation(name, spanNotValid);
    }
  }

  private cleanSpan(): void {
    const notValidEmail: HTMLSpanElement | null = document.querySelector('.not-valid-email');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.not-valid-password');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-first-name');
    if (notValidEmail && notValidPassword && spanNotValid) {
      notValidEmail.innerHTML = '';
      notValidPassword.innerHTML = '';
      spanNotValid.innerHTML = '';
    }
  }



  public buttonListener(): void {
    const loginButton: HTMLButtonElement | null = document.querySelector('.registration-button');
    this.togglePasswordVisibility();
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.cleanSpan();
        this.emailValidation();
        this.passwordValidation();
        this.firstNameCheck();
      });
    }
  }
}

export default ValidationRegistrationPage;
