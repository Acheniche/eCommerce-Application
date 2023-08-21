class LogoutButton {
  public logoutBtnListener() {
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('EventListener work');
        try {
          const response = await fetch(
            'https://auth.europe-west1.gcp.commercetools.com/oauth/token/revoke',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: 'grant_type=client_credentials&scope=view_products',
            });

          if (response.ok) {
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
