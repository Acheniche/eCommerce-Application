import App, { PagesID } from '../../components/app';

class LogoutButton {
  public logoutBtnListener() {
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('EventListener work');
        try {
          const response = await fetch(
            'https://auth.europe-west1.gcp.commercetools.com/oauth/ghpr/anonymous/token?grant_type=client_credentials',
            {
              method: 'POST',
              headers: {
                Authorization: 'Basic akNVdWl0cXRNRzViRm03a1cwRDY5OGFNOjVMeElVQ2VFeFVsaXJUeEswb2pxWWFxdGtjcWRuVXh3',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );
          if (response.ok) {
            location.hash = 'main-page';
            App.renderPage(PagesID.mainPage);
            console.log('Токен отозван успешно.');
            const loginLink = document.querySelector('a[href="#login-page"]') as HTMLAnchorElement;
            logoutBtn.classList.add('display-none');
            loginLink.classList.remove('display-none');
          } else {
            console.error('Ошибка при отзыве токена.');
          }
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
      });
    }
  }
}

export default LogoutButton;
