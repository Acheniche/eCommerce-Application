import Page from '../../utils/templates/page';
import './style.css';
import CreateCatalogPage from '../../utils/templates/catalogPageTemplate';
import { createProductsCards, createProductsCardsCategory, getProducts, getSubCategoryProduct, mainNameFilter, mainPriceFilter, nameFilter, priceFilter } from './products';


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
    sessionStorage.setItem('categoryId', 'main');
    this.container.insertAdjacentHTML('beforeend', catalog.mainCatalog());
    getProducts().then((data) => {
      createProductsCards(data);
    });
    document.body.addEventListener('click', e => {
      if (e.target as HTMLElement) {
      if ((e.target as HTMLElement).tagName === 'A') {
        document.querySelectorAll('A').forEach(i => {
          i.classList.remove('active');
        });
        (e.target as HTMLElement).classList.add('active');
        sessionStorage.setItem('categoryId', (e.target as HTMLElement).id);
        const products = document.querySelector('.products');
        if (products) {
        products.innerHTML = '';
        }
        getSubCategoryProduct((e.target as HTMLElement).id).then((data) => {
          createProductsCardsCategory(data);
        });
        if ((e.target as HTMLElement).id === 'main') {
          getProducts().then((data) => {
            createProductsCards(data);
          });
        }
      }
    }
    });
    document.body.addEventListener('click', e => {
      if ((e.target as HTMLElement).className === 'button-filterByName') {
      const products = document.querySelector('.products');
      if (products) {
      products.innerHTML = '';
      }
      if (sessionStorage.getItem('categoryId') != 'main') {
      nameFilter().then((data) => {
        createProductsCardsCategory(data);
      });
    } else {
      mainNameFilter().then((data) => {
        createProductsCardsCategory(data);
      });
    }
  }
    });
    document.body.addEventListener('click', e => {
      if ((e.target as HTMLElement).className === 'button-filterByPrice') {
      const products = document.querySelector('.products');
      if (products) {
      products.innerHTML = '';
      }
      if (sessionStorage.getItem('categoryId') != 'main') {
      priceFilter().then((data) => {
        createProductsCardsCategory(data);
      });
    } else {
      mainPriceFilter().then((data) => {
        createProductsCardsCategory(data);
      });
    }
  }
    });
    return this.container;
  }
}

export default CatalogPage;
