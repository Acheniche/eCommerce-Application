import Page from '../../utils/templates/page';
import MainPage from '../mainPage/mainPage';
import RegistrationPage from '../registrationPage/registrationPage';
import LoginPage from '../loginPage/loginPage';
import Header from '../header/header';
import ErrorPage, { ErrorTypes } from '../errors/error404';
import ProfilePage from '../userProfilePage/userProfilePage';
import CatalogPage from '../catalogProductPage/catalogProductPage';
import ProductPage from '../detailedProductPage/detailedProductPage';
import { getProducts } from '../catalogProductPage/products';
import BasketPage from '../basketPage/basketPage';
import AboutUsPage from '../aboutUsPage/aboutUsPage';
import { createCart } from '../basketPage/createAnonCart';

export const enum PagesID {
  mainPage = 'main-page',
  registrationPage = 'registration-page',
  loginPage = 'login-page',
  profilePage = 'profile-page',
  catalogPage = 'catalog-page',
  productPage = 'product-page',
  basketPage = 'basket-page',
  aboutUsPage = 'about-us',
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
    } else if (PageID === PagesID.productPage) {
      page = new ProductPage(PageID);
    } else if (PageID === PagesID.basketPage) {
      page = new BasketPage(PageID);
    } else if (PageID === PagesID.aboutUsPage) {
      page = new AboutUsPage(PageID);
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
      const arr: string[] = [];
      getProducts()
        .then((data) => {
          for (let i = 0; i < data.results.length; i++) {
            arr.push(data.results[i].id);
          }
        })
        .then(() => {
          for (let i = 0; i < arr.length; i++) {
            if (hash === arr[i]) {
              App.renderPage('product-page');
              return;
            }
          }
          App.renderPage(hash);
        });
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header');
  }

  run() {
    if (App.isLogin === false) {
      createCart();
    }
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
