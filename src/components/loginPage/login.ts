import LogoutButton from '../../utils/templates/logout';
import PopupWindow from '../../utils/templates/popup';
import App, { PagesID } from '../app';
import { getCartByCustomerId, getCartById, setCustomerId } from '../basketPage/createAnonCart';
import Header from '../header/header';
import { getUserProfile } from '../userProfilePage/profileInfo';

export async function registration(email: string, password: string) {
  const popupWindow = new PopupWindow();
  const logoutBtn = new Header('header', 'header');
  const logoutBtnListener = new LogoutButton();

  const data = {
    email: email,
    password: password,
    anonymousCart: {
      id: sessionStorage.getItem('cartId'),
      typeId: 'cart',
    },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
  };
  const response = await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic akNVdWl0cXRNRzViRm03a1cwRDY5OGFNOjVMeElVQ2VFeFVsaXJUeEswb2pxWWFxdGtjcWRuVXh3',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const tokenData = await response.json();
  const accessToken = tokenData.access_token;

  await fetch(
    'https://api.europe-west1.gcp.commercetools.com/ghpr/me/login',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    },
  ).then(function (res) {
    if (!res.ok) {
      (<HTMLElement>document.querySelector('.not-valid-password')).innerHTML = 'Incorrect login or password';
    } else {
      getUserProfile(email).then((customerData) => {
        sessionStorage.setItem('customerId', customerData.id);
        const customerId = sessionStorage.getItem('customerId');
        if (customerId) {
          getCartByCustomerId(customerId).then((result) => {
            if (!result.statusCode) {
              sessionStorage.setItem('cartId', result.id);
            } else {
              const cartId = sessionStorage.getItem('cartId');
              if (cartId && customerId) {
                getCartById(cartId).then((version) => {
                  setCustomerId(cartId, version, customerId);
                });
              }
            }
          });
        }
      });
      App.renderPage(PagesID.mainPage);
      location.hash = 'main-page';
      const text = 'login';
      popupWindow.popupTrue(text);
      logoutBtn.renderHeaderButtonsOkLogin();
      setTimeout(() => {
        logoutBtnListener.logoutBtnListener();
        sessionStorage.setItem('email', email);
        getUserProfile(email);
      }, 10);
      const profileLink = document.querySelector('a[href="#profile-page"]') as HTMLAnchorElement;
      profileLink.classList.remove('display-none');
      App.isLogin = true;
    }
  });
}

export default function loginOnServ() {
  const popupWindow = new PopupWindow();
  (<HTMLInputElement>document.querySelector('.login-button')).addEventListener('click', () => {
    const passwordEl = <HTMLInputElement>document.querySelector('.password');
    const emailEl = <HTMLInputElement>document.querySelector('.email');
    if (!passwordEl.classList.contains('input-wrong') && !emailEl.classList.contains('input-wrong')) {
      const email = (<HTMLInputElement>document.querySelector('.email')).value;
      const password = (<HTMLInputElement>document.querySelector('.password')).value;
      popupWindow.popupTrue(' ', 'loaderOpen');
      registration(String(email), String(password)).then(() => {
        popupWindow.popupTrue(' ', ' ');
      });
      sessionStorage.setItem('login', email);
      sessionStorage.setItem('password', password);
    }
  });
}
