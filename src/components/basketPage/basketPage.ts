import CreateBasketPage from '../../utils/templates/basketPageTemplate';
import Page from '../../utils/templates/page';
import App from '../app';
import { changeLineItem, deleteAllProductsFromCart, getProductsFromCartById, removeProductFromCart } from './createAnonCart';
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
          const clearCart = document.createElement('button');
          clearCart.classList.add('clearCart-button');
          clearCart.textContent = 'Clear Cart';
          this.container.append(clearCart);
          clearCart.addEventListener('click', () => {
            deleteAllProductsFromCart(cartId);
          });
          for (let i = 0; i < data.lineItems.length; i++) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('product-wrapper');
            wrapper.setAttribute('id', `${data.lineItems[i].id}`);
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

            const addLineItemBtn = document.createElement('button');
            addLineItemBtn.classList.add('addLineItem');
            addLineItemBtn.textContent = '+';

            const quantityProducts = document.createElement('h2');
            quantityProducts.classList.add('quantityProducts');
            quantityProducts.textContent = `${data.lineItems[i].quantity}`;

            addLineItemBtn.addEventListener('click', (e) => {
              if ((e.target as HTMLElement).closest('.product-wrapper')) {
                const card = (e.target as HTMLElement).closest('.product-wrapper');
                if (card) {
                  const cardId = card.id;
                  changeLineItem(data.version, cartId, cardId, data.lineItems[i].quantity + 1).then(() => {
                    App.renderPage('basket-page');
                  });
                }
              }
            });

            const removeLineItemBtn = document.createElement('button');
            removeLineItemBtn.classList.add('removeLineItem');
            removeLineItemBtn.textContent = '-';
            removeLineItemBtn.addEventListener('click', (e) => {
              if ((e.target as HTMLElement).closest('.product-wrapper')) {
                const card = (e.target as HTMLElement).closest('.product-wrapper');
                if (card) {
                  const cardId = card.id;
                  changeLineItem(data.version, cartId, cardId, data.lineItems[i].quantity - 1).then(() => {
                    App.renderPage('basket-page');
                  });
                }
              }
            });

            const totalCost = document.createElement('h2');
            totalCost.classList.add('product-totalCost');
            const totalCostValue = `${data.lineItems[i].totalPrice.centAmount}`;
            totalCost.textContent = `Total: ${totalCostValue.slice(0, -2)} ${
              data.lineItems[i].totalPrice.currencyCode
            }`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', (e) => {
              if ((e.target as HTMLElement).closest('.product-wrapper')) {
                const card = (e.target as HTMLElement).closest('.product-wrapper');
                if (card) {
                  const cardId = card.id;
                  removeProductFromCart(data.version, cartId, cardId).then(() => {
                    App.renderPage('basket-page');
                  });
                }
              }
            });
            wrapper.append(img, name, price, addLineItemBtn, quantityProducts, removeLineItemBtn, totalCost, deleteButton);
            this.container.append(wrapper);
          }
          const totalCostOfCart = document.createElement('h2');
          totalCostOfCart.classList.add('totalCostOfCart');
          const costOfCart = `${data.totalPrice.centAmount}`;
          totalCostOfCart.textContent = `Total cost of cart: ${costOfCart.slice(0, -2)} ${data.totalPrice.currencyCode}`;
          this.container.append(totalCostOfCart);
        }
      });
    }
    this.container.classList.add('BasketWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
