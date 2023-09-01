import Page from '../../utils/templates/page';
import './style.css';
import CreateCatalogPage from '../../utils/templates/catalogPageTemplate';
import { getProducts } from './products';


class CatalogPage extends Page {

  static TextObject = {
    MainTitle: 'Catalog',
  };

  render(): HTMLElement {
    //const title = this.createHeaderTitle(CatalogPage.TextObject.MainTitle);
    // const login = new CreateLoginPage();
    const catalog = new CreateCatalogPage();
    this.container.classList.add('CatalogWrapper');
    //this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', catalog.mainCatalog());
    getProducts().then((data) => {
      const products = document.querySelector('.products');
      for (let i = 0; i < data.results.length; i++) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('cardWrapper');
        const img = document.createElement('img');
        img.src = `${data.results[i].masterData.staged.masterVariant.images[0].url}`;
        const name = document.createElement('h3');
        name.classList.add('productName');
        name.textContent = `${data.results[i].masterData.current.name['en-US']}`;
        const description = document.createElement('p');
        description.classList.add('productDescription');
        description.textContent = `${data.results[i].masterData.current.description['en-US']}`;
        const price = document.createElement('h3');
        price.classList.add('productPrice');
        const priceValue: string = data.results[i].masterData.staged.masterVariant.prices[0].value.centAmount;
        price.textContent = `${(priceValue)} ${data.results[i].masterData.staged.masterVariant.prices[0].value.currencyCode}`;

        cardWrapper.append(img);
        cardWrapper.append(name);
        cardWrapper.append(description);
        cardWrapper.append(price);

        if (data.results[i].masterData.staged.masterVariant.prices[0].discounted) {
          price.style.textDecoration = 'line-through';
          const discount = document.createElement('h3');
          discount.classList.add('discount');
          discount.textContent = `${data.results[i].masterData.staged.masterVariant.prices[0].discounted.value.centAmount} ${data.results[i].masterData.staged.masterVariant.prices[0].discounted.value.currencyCode}`;
          cardWrapper.append(discount);
        }
        if (products) {
          products.append(cardWrapper);
        }
      }
      console.log(data.results[0]);
    });
    return this.container;
  }
}

export default CatalogPage;
