class ValidationRegistrationPage {
  public emailValidation(): void {
    const emailInput: HTMLInputElement | null = document.querySelector('.email');
    const notValidEmail: HTMLSpanElement | null = document.querySelector('.not-valid-email');
    const emailRegex: RegExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (emailInput && notValidEmail) {
      const trimValue = emailInput.value.trim();
      if (!(emailRegex.test(emailInput.value))) {
        notValidEmail.innerHTML = 'Email address must be properly formatted (e.g., user@example.com).';
      }
      if (emailInput.value.length === 0) {
        notValidEmail.innerHTML = 'Fill in this field';
      }
      if (!(emailInput.value == trimValue)) {
        notValidEmail.innerHTML = 'Email address must not contain leading or trailing whitespace.';
      }
    }
  }

  public passwordValidation(): void {
    const passwordInput: HTMLInputElement | null = document.querySelector('.password');
    const notValidPassword: HTMLSpanElement | null = document.querySelector('.not-valid-password');
    const uppercaseLetter: RegExp = /^(?=.*[A-Z]).+$/;
    const lowercaseLetter: RegExp = /^(?=.*[a-z]).+$/;
    const containDigit : RegExp = /^(?=.*\d).+$/;
    const specialCharacter: RegExp = /^(?=.*[!@#$%^&*]).+$/;
    if (passwordInput && notValidPassword) {
      const trimValue = passwordInput.value.trim();
      if (passwordInput.value.length < 8) {
        notValidPassword.innerHTML = 'Password must be at least 8 characters long.';
      }
      if (!(uppercaseLetter.test(passwordInput.value))) {
        notValidPassword.innerHTML = 'Password must contain at least one uppercase letter (A-Z).';
      }
      if (!(lowercaseLetter.test(passwordInput.value))) {
        notValidPassword.innerHTML = 'Password must contain at least one lowercase letter (a-z).';
      }

      if (!(containDigit.test(passwordInput.value))) {
        notValidPassword.innerHTML = 'Password must contain at least one digit (0-9).';
      }
      if (!(specialCharacter.test(passwordInput.value))) {
        notValidPassword.innerHTML = 'Password must contain at least one special character (e.g., !@#$%^&*).';
      }
      if (!(passwordInput.value == trimValue)) {
        notValidPassword.innerHTML = 'Password must not contain leading or trailing whitespace.';
      }

      if (passwordInput.value.length === 0) {
        notValidPassword.innerHTML = 'Fill in this field';
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
    const loginButton: HTMLButtonElement | null = document.querySelector('.registration-button');
    this.togglePasswordVisibility();
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.cleanSpan();
        this.emailValidation();
        this.passwordValidation();

      });
    }
  }
}

export default ValidationRegistrationPage;
