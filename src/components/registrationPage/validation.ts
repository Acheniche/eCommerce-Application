import ValidationLoginPage from '../loginPage/validation';

class ValidationRegistrationPage {
  constructor() {
    const validationLoginPage = new ValidationLoginPage();

    validationLoginPage.emailValidation();
    validationLoginPage.passwordValidation();
    validationLoginPage.togglePasswordVisibility();
    validationLoginPage.buttonListener();
  }

}

export default ValidationRegistrationPage;
