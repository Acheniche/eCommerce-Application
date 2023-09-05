class BurgerMenu {
  public block: string = `
  <div class="shadow"></div>
  <div class="header__burger">
    <span class="burger__line burger__line_first"></span>
    <span class="burger__line burger__line_second"></span>
    <span class="burger__line burger__line_third"></span>
  </div>`;

  private shadow() {
    const shadow: HTMLDivElement | null = document.querySelector('.shadow');
    if (window.innerWidth < 800) {
      if (shadow?.classList.contains('shadow_active')) {
        shadow.classList.remove('shadow_active');
        shadow.style.opacity = '0';
        setTimeout(() => {
          shadow.style.display = 'none';
        }, 400);
      } else {
        if (shadow) {
          shadow.classList.add('shadow_active');
          shadow.style.display = 'block';
          setTimeout(() => {
            shadow.style.opacity = '1';
          }, 10);
        }
      }
    } else {
      if (shadow) {
        shadow.classList.remove('shadow_active');
        shadow.style.opacity = '0';
        setTimeout(() => {
          shadow.style.display = 'none';
        }, 400);
      }
    }
  }

  private toggleClass() {
    if (window.innerWidth < 800) {
      const burger: HTMLDivElement | null = document.querySelector('.header__burger');
      const burgerMenu: HTMLDivElement | null = document.querySelector('.headerButtons');
      const body: HTMLBodyElement | null = document.querySelector('body');
      const lineFirst: HTMLSpanElement | null = document.querySelector('.burger__line_first');
      const lineSecond: HTMLSpanElement | null = document.querySelector('.burger__line_second');
      const lineThird: HTMLSpanElement | null = document.querySelector('.burger__line_third');
      burgerMenu?.classList.toggle('head_nav_active');
      burger?.classList.toggle('burger_active');
      body?.classList.toggle('body_hidden');
      lineFirst?.classList.toggle('burger__line_active');
      lineSecond?.classList.toggle('burger__line_active');
      lineThird?.classList.toggle('burger__line_active');
    }
  }

  burgerListener() {
    const burger: HTMLDivElement | null = document.querySelector('.header__burger');
    const burgerMenu: HTMLDivElement | null = document.querySelector('.headerButtons');
    const shadow: HTMLDivElement | null = document.querySelector('.shadow');
    burger?.addEventListener('click', () => {
      this.toggleClass();
      this.shadow();
    });
    burgerMenu?.addEventListener('click', () => {
      this.toggleClass();
      this.shadow();
    });

    shadow?.addEventListener('click', () => {
      this.toggleClass();
      this.shadow();
    });
  }
}

export default BurgerMenu;
