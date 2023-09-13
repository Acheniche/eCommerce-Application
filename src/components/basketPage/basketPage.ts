import CreateBasketPage from '../../utils/templates/basketPageTemplate';
import Page from '../../utils/templates/page';
import { getProductsFromCartById } from './createAnonCart';
import './style.css';

export default class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket',
  };

  render() {
    const title = this.createHeaderTitle(BasketPage.TextObject.MainTitle);
    const basket = new CreateBasketPage();
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
    getProductsFromCartById(cartId).then((data) => {
      if (data.lineItems.length === 0) {
        const empty = document.createElement('div');
        empty.classList.add('empty-cart');
        empty.textContent = 'Cart is empty';
        const buttonToCatalog = document.createElement('button');
        buttonToCatalog.classList.add('toCatalog-button');
        buttonToCatalog.textContent = 'To Catalog';
        this.container.append(empty, buttonToCatalog);
        buttonToCatalog.addEventListener('click', () => {
          location.hash = 'catalog-page';
        });
      } else {
        for (let i = 0; i < data.lineItems.length; i++) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('product-wrapper');
          const name = document.createElement('h3');
          name.classList.add('product-name');
          name.textContent = `${data.lineItems[i].name['en-US']}`;
          const img = document.createElement('img');
          img.src = `${data.lineItems[i].variant.images[0].url}`;
          img.alt = 'pic';
          const price = document.createElement('h2');
          price.classList.add('product-price');
          if (data.lineItems[i].price.discounted?.value.centAmount === undefined) {
            const priceValue = `${data.lineItems[i].price.value.centAmount}`;
            price.textContent = `${priceValue.slice(0, -2)} ${data.lineItems[i].price.value.currencyCode}`;
          } else {
            const priceValue = `${data.lineItems[i].price.discounted.value.centAmount}`;
            price.textContent = `${priceValue.slice(0, -2)} ${data.lineItems[i].price.value.currencyCode}`;
          }
          const totalCost = document.createElement('h2');
          totalCost.classList.add('product-totalCost');
          const totalCostValue = `${data.lineItems[i].totalPrice.centAmount}`;
          totalCost.textContent = `Total: ${totalCostValue.slice(0, -2)} ${data.lineItems[i].totalPrice.currencyCode}`;
          wrapper.append(img, name, price, totalCost);
          this.container.append(wrapper);
          console.log(data);
        }
      }
    });
    }
    this.container.classList.add('BasketWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
