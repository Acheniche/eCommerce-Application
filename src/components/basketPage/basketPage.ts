import CreateBasketPage from '../../utils/templates/basketPageTemplate';
import Page from '../../utils/templates/page';
import './style.css';

export default class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket',
  };

  render() {
    const title = this.createHeaderTitle(BasketPage.TextObject.MainTitle);
    const basket = new CreateBasketPage();
    this.container.classList.add('BasketWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
