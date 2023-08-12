import Component from '../../utils/templates/components';
import { PagesID } from '../app';

const Buttons = [
  {
    id: PagesID.mainPage,
    text: 'Main',
  },
  {
    id: PagesID.registrationPage,
    text: 'Registration',
  },
  {
    id: PagesID.loginPage,
    text: 'Login',
  },
];

export default class Header extends Component {
  renderHeaderButtons() {
    const headerButtons = document.createElement('div');
    headerButtons.classList.add('headerButtons');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      headerButtons.append(buttonHTML);
    });
    this.container.append(headerButtons);
  }

  renderHeaderLogo() {
    const headerLogo = document.createElement('div');
    headerLogo.classList.add('headerLogo');
    const logoHTML = document.createElement('a');
    const logo = document.createElement('img');
    logo.src = require('../../assets/svg/logo.svg');
    logo.alt = 'logo';
    const logoText = document.createElement('h1');
    logoText.textContent = 'Store';
    logoHTML.append(logo);
    logoHTML.append(logoText);
    logoHTML.classList.add('logoHTML');
    logoHTML.href = `#main-page`;
    headerLogo.append(logoHTML);
    this.container.append(headerLogo);
  }

  render() {
    this.renderHeaderLogo();
    this.renderHeaderButtons();
    return this.container;
  }
}
