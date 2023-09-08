import BurgerMenu from '../../utils/templates/burgerMenu';
import Component from '../../utils/templates/components';
import PopupWindow from '../../utils/templates/popup';
import { PagesID } from '../app';

const Buttons = [
  {
    id: PagesID.mainPage,
    text: 'Main',
  },
  {
    id: PagesID.catalogPage,
    text: 'Catalog',
  },
  {
    id: PagesID.registrationPage,
    text: 'Registration',
  },
  {
    id: PagesID.loginPage,
    text: 'Login',
  },
  {
    id: PagesID.profilePage,
    text: 'Profile',
  },
  {
    id: PagesID.basketPage,
    text: '🛒',
  },
  {
    id: PagesID.aboutUsPage,
    text: 'About Us',
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
    const newLink: HTMLAnchorElement = document.createElement('a');
    newLink.classList.add('logout');
    newLink.textContent = 'Logout';
    newLink.classList.add('display-none');

    headerButtons.appendChild(newLink);
    this.container.append(headerButtons);
    setTimeout(() => {
      const profileLink = document.querySelector('a[href="#profile-page"]') as HTMLAnchorElement;
      profileLink.classList.add('display-none');
    }, 10);
  }

  renderHeaderButtonsOkLogin() {
    const logoutBtn: HTMLButtonElement = document.querySelector('.logout') as HTMLButtonElement;
    const loginLink = document.querySelector('a[href="#login-page"]') as HTMLAnchorElement;
    logoutBtn.classList.remove('display-none');
    loginLink.classList.add('display-none');
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
    logoHTML.href = '#main-page';
    headerLogo.append(logoHTML);
    this.container.append(headerLogo);
  }

  render() {
    const burgerMenu = new BurgerMenu();
    this.renderHeaderLogo();
    this.renderHeaderButtons();
    const createPop = new PopupWindow();
    this.container.insertAdjacentHTML('beforeend', createPop.block);
    this.container.insertAdjacentHTML('beforeend', burgerMenu.block);
    setTimeout(() => {
      burgerMenu.burgerListener();
    }, 10);
    return this.container;
  }
}
