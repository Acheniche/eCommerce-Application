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

  public cityCheck_billing() {
    const name: NodeListOf<HTMLInputElement> = document.querySelectorAll('.city');
    const spanNotValid: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.not-valid-city');
    const wrapper: NodeListOf<HTMLDivElement> = document.querySelectorAll('.city-wrapper');
    if (name && spanNotValid && wrapper) {
      for (let i = 0; i < name.length; i++) {
        spanNotValid[i].innerHTML = '';
        this.nameValidation(name[i], spanNotValid[i], wrapper[i]);
      }
    }
  }

  public streetCheck_billing() {
    const name: NodeListOf<HTMLInputElement> = document.querySelectorAll('.street');
    const wrapper: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.street-wrapper');
    const spanNotValid: NodeListOf<HTMLDivElement> = document.querySelectorAll('.not-valid-street');

    if (name && spanNotValid && wrapper) {
      for (let i = 0; i < name.length; i++) {
        spanNotValid[i].innerHTML = '';
        const icon: HTMLSpanElement | null = wrapper[i].querySelector('.icon');
        if (name[i].value.length < 1 && icon) {
          icon.classList.add('display-active');
          spanNotValid[i].innerHTML = 'Must contain at least one character';
          name[i].classList.add('input-wrong');
        } else {
          icon?.classList.remove('display-active');
          name[i].classList.remove('input-wrong');
        }
      }
    }
  }

  public countryCheck_billing() {
    const country: HTMLInputElement | null = document.querySelector('#country_billing');
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

  public postalListener_billing() {
    const postal: NodeListOf<HTMLInputElement> = document.querySelectorAll('.postal-code');
    if (postal) {
      for (let i = 0; i < postal.length; i++) {
        postal[i].oninput = function () {
          postal[i].value = postal[i].value.substring(0, 5);
        };
      }
    }
  }

  public postalCheck_billing() {
    const country: NodeListOf<HTMLInputElement> = document.querySelectorAll('.postal-code');
    const spanNotValid: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.not-valid-postal-code');
    const wrapper: NodeListOf<HTMLDivElement> = document.querySelectorAll('.postal-wrapper');
    if (country && spanNotValid && wrapper) {
      for (let i = 0; i < country.length; i++) {
        spanNotValid[i].innerHTML = '';
        const icon: HTMLSpanElement | null = wrapper[i].querySelector('.icon');
        if (country[i].value == '' && icon) {
          spanNotValid[i].innerHTML = 'Required field';
          icon.classList.add('display-active');
          country[i].classList.add('input-wrong');
        } else if (country[i].value.length < 5 && icon) {
          spanNotValid[i].innerHTML = 'Must be 5 digits';
          icon.classList.add('display-active');
          country[i].classList.add('input-wrong');
        } else {
          icon?.classList.remove('display-active');
          country[i].classList.remove('input-wrong');
        }
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

  public streetCheck_shipping() {
    const name: HTMLInputElement | null = document.querySelector('.street_shipping');
    const wrapper: HTMLDivElement | null = document.querySelector('.street-wrapper_shipping');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-street_shipping');

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

  public cityCheck_shipping() {
    const name: HTMLInputElement | null = document.querySelector('.city_shipping');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-city_shipping');
    const wrapper: HTMLDivElement | null = document.querySelector('.city-wrapper_shipping');
    if (name && spanNotValid && wrapper) {
      spanNotValid.innerHTML = '';
      this.nameValidation(name, spanNotValid, wrapper);
    }
  }

  public postalCheck_shipping() {
    const country: HTMLInputElement | null = document.querySelector('.postal-code_shipping');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-postal-code_shipping');
    const wrapper: HTMLDivElement | null = document.querySelector('.postal-wrapper_shipping');
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

  public postalListener_shipping() {
    const postal: HTMLInputElement | null = document.querySelector('.postal-code_shipping');
    if (postal) {
      postal.oninput = function () {
        postal.value = postal.value.substring(0, 5);
      };
    }
  }

  public countryCheck_shipping() {
    const country: HTMLInputElement | null = document.querySelector('#country_shipping');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-country_shipping');
    const wrapper: HTMLDivElement | null = document.querySelector('.country-wrapper_shipping');
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

  public buttonListener(): void {
    const loginButton: HTMLButtonElement | null = document.querySelector('.registration-button');
    this.togglePasswordVisibility();
    this.postalListener_billing();
    this.postalListener_shipping();
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.cleanSpan();
        this.emailValidation();
        this.passwordValidation();
        this.firstNameCheck();
        this.lastNameCheck();
        this.cityCheck_billing();
        this.cityCheck_shipping();
        this.streetCheck_billing();
        this.streetCheck_shipping();
        this.dateCheck();
        this.postalCheck_billing();
        this.postalCheck_shipping();
        this.countryCheck_billing();
        this.countryCheck_shipping();
        registrationOnServ();
      });
    }
  }
}

export default ValidationRegistrationPage;
