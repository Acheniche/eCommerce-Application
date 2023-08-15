import Page from '../../utils/templates/page';
import './style.css';
import CreateRegistrationPage from '../../utils/templates/registrationPageTemplate';

export default class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);
    const login = new CreateRegistrationPage();
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', login.block);
    return this.container;
  }
}
