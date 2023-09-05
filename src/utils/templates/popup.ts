class PopupWindow {
  public block: string = `
      <div class="modal-content">
        <p class="text-popup">Текст модального окна</p>
      </div>
    `;

  private loginText: string = 'You have successfully logged in';

  private registrationText: string = 'You have successfully registered';

  private passwordUpdate: string = 'Password is update';

  private passwordWrong: string = 'Wrong old password entered';

  public popupTrue(text: string) {
    const modal: HTMLDivElement | null = document.querySelector('.modal-content');
    const textPopup: HTMLParagraphElement | null = document.querySelector('.text-popup');
    if (modal) {
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
    }
  }
}

export default PopupWindow;
