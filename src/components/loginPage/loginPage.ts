import CreateLoginPage from '../../utils/templates/loginPageTemplate';
import Page from '../../utils/templates/page';
import PopupWindow from '../../utils/templates/popup';
import './style.css';
import ValidationLoginPage from './validation';

export default class LoginPage extends Page {
  static TextObject = {
    MainTitle: 'Login',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(LoginPage.TextObject.MainTitle);
    const login = new CreateLoginPage();
    const validation = new ValidationLoginPage();
    const createPop = new PopupWindow();
    this.container.classList.add('LoginWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', createPop.block);
    this.container.insertAdjacentHTML('beforeend', login.block);
    setTimeout(() => {
      validation.buttonListener();
    }, 100);

    return this.container;
  }
}
