import Page from '../../utils/templates/page';
import './style.css';
import CreateRegistrationPage from '../../utils/templates/registrationPageTemplate';
import ValidationRegistrationPage from './validation';

export default class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);
    const login = new CreateRegistrationPage();
    const validation = new ValidationRegistrationPage();
    this.container.classList.add('RegistrationWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', login.block);
    setTimeout(() => {
      validation.buttonListener();
    }, 100);
    return this.container;
  }
}
