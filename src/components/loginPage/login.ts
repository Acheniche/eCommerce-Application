import LogoutButton from '../../utils/templates/logout';
import PopupWindow from '../../utils/templates/popup';
import App, { PagesID } from '../app';
import Header from '../header/header';
import { getUserProfile } from '../userProfilePage/profileInfo';

export async function registration(email: string, password: string) {
  const popupWindow = new PopupWindow();
  const logoutBtn = new Header('header', 'header');
  const logoutBtnListener = new LogoutButton();

  await fetch(
    `https://auth.europe-west1.gcp.commercetools.com/oauth/ghpr/customers/token?grant_type=password&username=${email}&password=${password}`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic akNVdWl0cXRNRzViRm03a1cwRDY5OGFNOjVMeElVQ2VFeFVsaXJUeEswb2pxWWFxdGtjcWRuVXh3',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  ).then(function (res) {
    if (!res.ok) {
      (<HTMLElement>document.querySelector('.not-valid-password')).innerHTML = 'Incorrect login or password';
    } else {
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
  (<HTMLInputElement>document.querySelector('.login-button')).addEventListener('click', () => {
    const passwordEl = <HTMLInputElement>document.querySelector('.password');
    const emailEl = <HTMLInputElement>document.querySelector('.email');
    if (!passwordEl.classList.contains('input-wrong') && !emailEl.classList.contains('input-wrong')) {
      const email = (<HTMLInputElement>document.querySelector('.email')).value;
      const password = (<HTMLInputElement>document.querySelector('.password')).value;
      registration(String(email), String(password));
      sessionStorage.setItem('login', email);
      sessionStorage.setItem('password', password);
    }
  });
}
