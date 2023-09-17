class PopupWindow {
  public block: string = `
      <div class="modal-content">
        <p class="text-popup"></p>
      </div>
      <div class="loader display-none"></div>
      <div class="loader-shadow display-none"></div>

    `;

  private loginText: string = 'You have successfully logged in';

  private registrationText: string = 'You have successfully registered';

  private passwordUpdate: string = 'Password is update';

  private passwordWrong: string = 'Wrong old password entered';

  public popupTrue(text: string, load?: string) {
    const modal: HTMLDivElement | null = document.querySelector('.modal-content');
    const textPopup: HTMLParagraphElement | null = document.querySelector('.text-popup');
    const loader: HTMLDivElement | null = document.querySelector('.loader');
    const loaderShadow: HTMLDivElement | null = document.querySelector('.loader-shadow');
    if (modal && !load) {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.style.top = '7%';
      }, 10);
      setTimeout(() => {
        modal.style.top = '-100%';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }, 5000);
      if (text === 'login' && textPopup) {
        textPopup.innerHTML = this.loginText;
      } else if (text === 'registration' && textPopup) {
        textPopup.innerHTML = this.registrationText;
      } else if (text === 'password-tru' && textPopup) {
        textPopup.innerHTML = this.passwordUpdate;
      } else if (text === 'password-wrong' && textPopup) {
        textPopup.innerHTML = this.passwordWrong;
      }
    } else if (modal && load) {
      if (load === 'loaderOpen' && loader) {
        loader.style.top = '500%';
        loader.classList.remove('display-none');
        loaderShadow?.classList.remove('display-none');
      } else if (loader) {
        loader.style.top = '-100%';
        loader.classList.add('display-none');
        loaderShadow?.classList.add('display-none');
      }
    }
  }
}

export default PopupWindow;
