import Page from '../../utils/templates/page';
import MainPage from '../mainPage/mainPage';
import RegistrationPage from '../registrationPage/registrationPage';
import LoginPage from '../loginPage/loginPage';
import Header from '../header/header';

export const enum PagesID {
  mainPage = 'main-page',
  registrationPage = 'registration-page',
  loginPage = 'login-page',
}

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageID: string = 'current-page';

  private initialPage: MainPage;

  private header: Header;

  static renderPage(PageID: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (PageID === PagesID.mainPage) {
      page = new MainPage(PageID);
    } else if (PageID === PagesID.registrationPage) {
      page = new RegistrationPage(PageID);
    } else if (PageID === PagesID.loginPage) {
      page = new LoginPage(PageID);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID;
      App.container.append(pageHTML);
    }
  }

  private routeChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header');
  }

  run() {
    App.container.append(this.header.render());
    App.renderPage('main-page');
    this.routeChange();
  }
}
