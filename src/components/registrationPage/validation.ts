import ValidationLoginPage from '../loginPage/validation';
import registrationOnServ from './reg';

class ValidationRegistrationPage {
  private validationLoginPage: ValidationLoginPage;

  constructor() {
    this.validationLoginPage = new ValidationLoginPage();
  }

  public emailValidation(): void {
    const wrapper: HTMLDivElement | null = document.querySelector('.email-wrapper-registration');
    if (wrapper) {
      this.validationLoginPage.emailValidation(wrapper);
    }
  }

  public passwordValidation(): void {
    const wrapper: HTMLDivElement | null = document.querySelector('.password-wrapper');
    if (wrapper) {
      this.validationLoginPage.passwordValidation(wrapper);
    }
  }

  public togglePasswordVisibility(): void {
    this.validationLoginPage.togglePasswordVisibility();
  }

  public nameValidation(name: HTMLInputElement, span: HTMLSpanElement, wrapper: HTMLDivElement) {
    const regex = /^[A-Za-z]+$/;
    if (name && span && wrapper) {
      const icon: HTMLSpanElement | null = wrapper.querySelector('.icon');
      if (name.value.length > 0) {
        if (!regex.test(name.value)) {
          icon?.classList.add('display-active');
          span.innerHTML = 'No special characters or numbers';
          name.classList.add('input-wrong');
        } else {
          icon?.classList.remove('display-active');
          name.classList.remove('input-wrong');
        }
      } else if (name.value.length == 0) {
        span.innerHTML = 'Must contain at least one character';
        icon?.classList.add('display-active');
        name.classList.add('input-wrong');
      }
    }
  }

  public firstNameCheck() {
    const name: HTMLInputElement | null = document.querySelector('.first-name');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-first-name');
    const wrapper: HTMLDivElement | null = document.querySelector('.first-name-wrapper');
    if (name && spanNotValid && wrapper) {
      this.nameValidation(name, spanNotValid, wrapper);
    }
  }

  public lastNameCheck() {
    const name: HTMLInputElement | null = document.querySelector('.last-name');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-last-name');
    const wrapper: HTMLDivElement | null = document.querySelector('.last-name-wrapper');
    if (name && spanNotValid && wrapper) {
      this.nameValidation(name, spanNotValid, wrapper);
    }
  }

  public cityCheck() {
    const name: HTMLInputElement | null = document.querySelector('.city');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-city');
    const wrapper: HTMLDivElement | null = document.querySelector('.city-wrapper');
    if (name && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      this.nameValidation(name, spanNotValid, wrapper);
    }
  }

  public streetCheck() {
    const name: HTMLInputElement | null = document.querySelector('.street');
    const wrapper: HTMLDivElement | null = document.querySelector('.street-wrapper');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-street');

    if (name && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      const icon: HTMLSpanElement | null = wrapper.querySelector('.icon');
      if (name.value.length < 1 && icon) {
        icon.classList.add('display-active');
        spanNotValid.innerHTML = 'Must contain at least one character';
        name.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        name.classList.remove('input-wrong');
      }
    }
  }

  public countryCheck() {
    const country: HTMLInputElement | null = document.querySelector('#country');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-country');
    const wrapper: HTMLDivElement | null = document.querySelector('.country-wrapper');
    if (country && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      const icon: HTMLSpanElement | null = wrapper.querySelector('.icon');
      if (country.value == '' && icon) {
        spanNotValid.innerHTML = 'Required field';
        icon.classList.add('display-active');
        country.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        country.classList.remove('input-wrong');
      }
    }
  }

  public postalListener() {
    const postal: HTMLInputElement | null = document.querySelector('.postal-code');
    if (postal) {
      postal.oninput = function () {
        postal.value = postal.value.substring(0, 5);
      };
    }
  }

  public postalCheck() {
    const country: HTMLInputElement | null = document.querySelector('.postal-code');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-postal-code');
    const wrapper: HTMLDivElement | null = document.querySelector('.postal-wrapper');
    if (country && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      const icon: HTMLSpanElement | null = wrapper.querySelector('.icon');
      if (country.value == '' && icon) {
        spanNotValid.innerHTML = 'Required field';
        icon.classList.add('display-active');
        country.classList.add('input-wrong');
      } else if (country.value.length < 5 && icon) {
        spanNotValid.innerHTML = 'Must be 5 digits';
        icon.classList.add('display-active');
        country.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        country.classList.remove('input-wrong');
      }
    }
  }

  public dateCheck() {
    const birthDate: HTMLInputElement | null = document.querySelector('.date-birth');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-date-birth');
    const currentDate = new Date();
    const minimumAge: number = 13;
    const minimumAgeDate = new Date(
      currentDate.getFullYear() - minimumAge,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const wrapper: HTMLDivElement | null = document.querySelector('.date-birth-wrapper');
    if (birthDate && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      const birth = new Date(birthDate.value);
      const icon: HTMLSpanElement | null = wrapper.querySelector('.icon');
      if (birthDate.value == '' && icon) {
        spanNotValid.innerHTML = 'Required field';
        birthDate.classList.add('input-wrong');
        icon.classList.add('display-active');
      } else if (birth > minimumAgeDate && icon) {
        spanNotValid.innerHTML = 'Your age must be over 13';
        icon.classList.add('display-active');
        birthDate.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        birthDate.classList.remove('input-wrong');
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
    this.postalListener();
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
        this.postalCheck();
        this.countryCheck();
        registrationOnServ();
      });
    }
  }
}

export default ValidationRegistrationPage;
