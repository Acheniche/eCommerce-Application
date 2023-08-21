import loginOnServ from './login';

class ValidationLoginPage {
  public emailValidation(wrapper?: HTMLDivElement): void {
    const emailInput: HTMLInputElement | null = document.querySelector('.email');
    const notValidEmail: HTMLSpanElement | null = document.querySelector('.not-valid-email');
    const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const domainRegex: RegExp = /^[^@\s]+\.[^@\s]+$/;
    if (emailInput && notValidEmail) {
      const trimValue = emailInput.value.trim();
      const icon: HTMLSpanElement | null | undefined = wrapper?.querySelector('.icon');
      if (!(emailInput.value == trimValue)) {
        icon?.classList.add('display-active');
        emailInput.classList.add('input-wrong');
        notValidEmail.innerHTML = 'Email address must not contain leading or trailing whitespace.';
      } else if (!emailRegex.test(emailInput.value)) {
        icon?.classList.add('display-active');
        emailInput.classList.add('input-wrong');
        notValidEmail.innerHTML = 'Email address must be properly formatted (e.g., user@example.com).';
      } else if (emailInput.value.length === 0) {
        icon?.classList.add('display-active');
        emailInput.classList.add('input-wrong');
        notValidEmail.innerHTML = 'Fill in this field';
      } else if (!(emailRegex.test(emailInput.value) && domainRegex.test(emailInput.value.split('@')[1]))) {
        icon?.classList.add('display-active');
        emailInput.classList.add('input-wrong');
        notValidEmail.innerHTML = 'Email address must contain a domain name (e.g., example.com).';
      } else {
        icon?.classList.remove('display-active');
        emailInput.classList.remove('input-wrong');
      }
    }
  }

  public passwordValidation(wrapper?: HTMLDivElement): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.password');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.not-valid-password');
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

  public togglePasswordVisibility(): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.password');
    const toggleButton: HTMLButtonElement | null = document.querySelector('.toggle-password-button');

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

  private cleanSpan(): void {
    const notValidEmail: HTMLSpanElement | null = document.querySelector('.not-valid-email');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.not-valid-password');
    if (notValidEmail && notValidPassword) {
      notValidEmail.innerHTML = '';
      notValidPassword.innerHTML = '';
    }
  }

  public buttonListener(): void {
    const loginButton: HTMLButtonElement | null = document.querySelector('.login-button');
    this.togglePasswordVisibility();
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.cleanSpan();
        this.emailValidation();
        this.passwordValidation();
        loginOnServ();
      });
    }
  }
}

export default ValidationLoginPage;
