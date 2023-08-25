import Page from '../../utils/templates/page';
import MainPage from '../mainPage/mainPage';
import RegistrationPage from '../registrationPage/registrationPage';
import LoginPage from '../loginPage/loginPage';
import Header from '../header/header';
import ErrorPage, { ErrorTypes } from '../errors/error404';
import ProfilePage from '../userProfilePage/userProfilePage';
import CatalogPage from '../catalogProductPage/catalogProductPage';

export const enum PagesID {
  mainPage = 'main-page',
  registrationPage = 'registration-page',
  loginPage = 'login-page',
  profilePage = 'profile-page',
  catalogPage = 'catalog-page',
}

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageID: string = 'current-page';

  private initialPage: MainPage;

  private header: Header;

  public static isLogin = false;

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
    } else if (PageID === PagesID.loginPage && App.isLogin === false) {
      page = new LoginPage(PageID);
    } else if (PageID === PagesID.profilePage && App.isLogin === true) {
      page = new ProfilePage(PageID);
    } else if (PageID === PagesID.catalogPage) {
      page = new CatalogPage(PageID);
    } else {
      page = new ErrorPage(PageID, ErrorTypes.Error404);
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
    const hash = window.location.hash.slice(1);
    if (hash === '') {
      App.renderPage('main-page');
    } else {
      App.renderPage(hash);
    }
    this.routeChange();
  }
}
