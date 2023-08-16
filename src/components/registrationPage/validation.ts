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

  public lastNameCheck() {
    const name: HTMLInputElement | null = document.querySelector('.last-name');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-last-name');
    if (name && spanNotValid) {
      this.nameValidation(name, spanNotValid);
    }
  }

  public cityCheck() {
    const name: HTMLInputElement | null = document.querySelector('.city');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-city');
    if (name && spanNotValid) {
      spanNotValid.innerHTML = '';
      this.nameValidation(name, spanNotValid);
    }
  }

  public streetCheck() {
    const name: HTMLInputElement | null = document.querySelector('.street');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-street');
    if (name && spanNotValid) {
      spanNotValid.innerHTML = '';
      if (name.value.length < 1) {
        spanNotValid.innerHTML = 'Must contain at least one character';
      }
    }
  }

  public dateCheck() {
    const birthDate: HTMLInputElement | null = document.querySelector('.date-birth');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-date-birth');
    const currentDate = new Date();
    const minimumAge: number = 13;
    const minimumAgeDate = new Date(currentDate.getFullYear() - minimumAge,
      currentDate.getMonth(), currentDate.getDate());
    if (birthDate && spanNotValid) {
      spanNotValid.innerHTML = '';
      if (birthDate.value == '') {
        spanNotValid.innerHTML = 'Required field';
      }
      const birth = new Date(birthDate.value);
      if (birth > minimumAgeDate) {
        spanNotValid.innerHTML = 'Your age must be over 13';
      }
    }
  }

  private cleanSpan(): void {
    const notValidEmail: HTMLSpanElement | null = document.querySelector('.not-valid-email');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.not-valid-password');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-first-name');
    const spanNotValidLast: HTMLSpanElement | null = document.querySelector('.not-valid-last-name');
    if (notValidEmail && notValidPassword && spanNotValid && spanNotValidLast) {
      notValidEmail.innerHTML = '';
      notValidPassword.innerHTML = '';
      spanNotValid.innerHTML = '';
      spanNotValidLast.innerHTML = '';
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
        this.lastNameCheck();
        this.cityCheck();
        this.streetCheck();
        this.dateCheck();
      });
    }
  }
}

export default ValidationRegistrationPage;
