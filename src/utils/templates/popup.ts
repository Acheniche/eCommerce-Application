class PopupWindow {

  public block: string  = `
      <div class="modal-content">
        <p class="text-popup">Текст модального окна</p>
      </div>
    `;

  private loginText: string = 'You have successfully logged in';

  private registrationText: string = 'You have successfully registered';

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
      }
    }
  }
}

export default PopupWindow;
