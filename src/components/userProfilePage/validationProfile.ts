import ValidationLoginPage from '../loginPage/validation';
import { getUserProfile } from './profileInfo';
import getToken from './updateProfile';

export default class ValidationProfile {
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
  //---------------------------------------------------------

  public OldpasswordValidation(wrapper?: HTMLDivElement): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.Oldpassword');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.Oldnot-valid-password');
    const uppercaseLetter: RegExp = /^(?=.*[A-Z]).+$/;
    const lowercaseLetter: RegExp = /^(?=.*[a-z]).+$/;
    const containDigit: RegExp = /^(?=.*\d).+$/;
    const specialCharacter: RegExp = /^(?=.*[!@#$%^&*]).+$/;
    if (passwordInput && notValidPassword) {
      const trimValue = passwordInput.value.trim();
      const icon: HTMLSpanElement | null | undefined = wrapper?.querySelector('.icon');
      if (passwordInput.value.length === 0) {
        notValidPassword.innerHTML = 'Fill in this field';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!uppercaseLetter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one uppercase letter (A-Z).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!lowercaseLetter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one lowercase letter (a-z).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!containDigit.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one digit (0-9).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!specialCharacter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one special character (e.g., !@#$%^&*).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!(passwordInput.value == trimValue)) {
        notValidPassword.innerHTML = 'Password must not contain leading or trailing whitespace.';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (passwordInput.value.length < 8) {
        notValidPassword.innerHTML = 'Password must be at least 8 characters long.';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        passwordInput.classList.remove('input-wrong');
      }
    }
  }

  public NewpasswordValidation(wrapper?: HTMLDivElement): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.Newpassword');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.Newnot-valid-password');
    const uppercaseLetter: RegExp = /^(?=.*[A-Z]).+$/;
    const lowercaseLetter: RegExp = /^(?=.*[a-z]).+$/;
    const containDigit: RegExp = /^(?=.*\d).+$/;
    const specialCharacter: RegExp = /^(?=.*[!@#$%^&*]).+$/;
    if (passwordInput && notValidPassword) {
      const trimValue = passwordInput.value.trim();
      const icon: HTMLSpanElement | null | undefined = wrapper?.querySelector('.icon');
      if (passwordInput.value.length === 0) {
        notValidPassword.innerHTML = 'Fill in this field';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!uppercaseLetter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one uppercase letter (A-Z).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!lowercaseLetter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one lowercase letter (a-z).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!containDigit.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one digit (0-9).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!specialCharacter.test(passwordInput.value)) {
        notValidPassword.innerHTML = 'Password must contain at least one special character (e.g., !@#$%^&*).';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (!(passwordInput.value == trimValue)) {
        notValidPassword.innerHTML = 'Password must not contain leading or trailing whitespace.';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else if (passwordInput.value.length < 8) {
        notValidPassword.innerHTML = 'Password must be at least 8 characters long.';
        icon?.classList.add('display-active');
        passwordInput.classList.add('input-wrong');
      } else {
        icon?.classList.remove('display-active');
        passwordInput.classList.remove('input-wrong');
      }
    }
  }
  //---------------------------------------------------------

  public oldtogglePasswordVisibility(): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.Oldpassword');
    const toggleButton: HTMLButtonElement | null = document.querySelector('.Oldtoggle-password-button');

    if (passwordInput && toggleButton) {
      toggleButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleButton.classList.add('view');
        } else {
          passwordInput.type = 'password';
          toggleButton.classList.remove('view');
        }
      });
    }
  }

  public newtogglePasswordVisibility(): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.Newpassword');
    const toggleButton: HTMLButtonElement | null = document.querySelector('.Newtoggle-password-button');

    if (passwordInput && toggleButton) {
      toggleButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleButton.classList.add('view');
        } else {
          passwordInput.type = 'password';
          toggleButton.classList.remove('view');
        }
      });
    }
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
    const OldnotValidPassword: HTMLSpanElement | null = document.querySelector('.Oldnot-valid-password');
    const NewnotValidPassword: HTMLSpanElement | null = document.querySelector('.Newnot-valid-password');
    const spanNotValid: HTMLSpanElement | null = document.querySelector('.not-valid-first-name');
    const spanNotValidLast: HTMLSpanElement | null = document.querySelector('.not-valid-last-name');
    if (notValidEmail && OldnotValidPassword && NewnotValidPassword && spanNotValid && spanNotValidLast) {
      notValidEmail.innerHTML = '';
      OldnotValidPassword.innerHTML = '';
      NewnotValidPassword.innerHTML = '';
      spanNotValid.innerHTML = '';
      spanNotValidLast.innerHTML = '';
    }
  }

  public buttonListener(): void {
    const updateButton: HTMLButtonElement | null = document.querySelector('.update-button');
    const OldPasswordWrapper: HTMLDivElement | null = document.querySelector('.Oldpassword-wrapper');
    const NewPasswordWrapper: HTMLDivElement | null = document.querySelector('.Newpassword-wrapper');
    this.oldtogglePasswordVisibility();
    this.newtogglePasswordVisibility();
    if (updateButton) {
      updateButton.addEventListener('click', () => {
        this.cleanSpan();
        this.emailValidation();
        if (
          (<HTMLInputElement>document.querySelector('#registration-oldPassword')).value.length > 0 ||
          (<HTMLInputElement>document.querySelector('#registration-newPassword')).value.length > 0
        ) {
          if (OldPasswordWrapper) {
            this.OldpasswordValidation(OldPasswordWrapper);
          }
          if (NewPasswordWrapper) {
            this.NewpasswordValidation(NewPasswordWrapper);
          }
        } else {
          const NewpasswordInput: HTMLInputElement | null = document.querySelector('.Newpassword');
          NewpasswordInput?.classList.remove('input-wrong');
          const OldpasswordInput: HTMLInputElement | null = document.querySelector('.Oldpassword');
          OldpasswordInput?.classList.remove('input-wrong');
          const Oldicon: HTMLSpanElement | null | undefined = OldPasswordWrapper?.querySelector('.icon');
          Oldicon?.classList.remove('display-active');
          const Newicon: HTMLSpanElement | null | undefined = NewPasswordWrapper?.querySelector('.icon');
          Newicon?.classList.remove('display-active');
        }
        this.firstNameCheck();
        this.lastNameCheck();
        this.dateCheck();
        //-------------------------------
        const icons = document.querySelectorAll('.icon');
        let i: number = 0;
        let counter: number = 0;
        while (i < icons.length) {
          if (icons[i].classList.contains('display-active') == false) {
            counter += 1;
          }

          if (counter === 6) {
            const email = sessionStorage.getItem('email');
            if (email) {
              getUserProfile(email).then((data) => {
                getToken(data.id, data.version);
              });
            }
          }
          i += 1;
        }
        //------------------------------
      });
    }
  }
}
