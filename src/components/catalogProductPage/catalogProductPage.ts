import Page from '../../utils/templates/page';
import './style.css';
import CreateCatalogPage from '../../utils/templates/catalogPageTemplate';
import {
  Filter,
  createProductsCards,
  createProductsCardsCategory,
  getProducts,
  getSubCategoryProduct,
  mainNameFilter,
  mainPriceFilter,
  nameFilter,
  priceFilter,
  productSearch,
} from './products';
import App from '../app';

class CatalogPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog',
  };

  render(): HTMLElement {
    const catalog = new CreateCatalogPage();
    this.container.classList.add('CatalogWrapper');
    sessionStorage.setItem('categoryId', 'main');
    this.container.insertAdjacentHTML('beforeend', catalog.mainCatalog());
    getProducts()
      .then((data) => {
        createProductsCards(data);
      })
      .then(() => {
        document.body.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).tagName === 'A') {
            document.querySelectorAll('A').forEach((i) => {
              i.classList.remove('active');
            });
            (e.target as HTMLElement).classList.add('active');
            sessionStorage.setItem('categoryId', (e.target as HTMLElement).id);
            const products = document.querySelector('.products');
            if (products) {
              products.innerHTML = '';
            }
            if ((e.target as HTMLElement).id != 'main') {
              getSubCategoryProduct((e.target as HTMLElement).id).then((data) => {
                createProductsCardsCategory(data);
              });
            }

            if ((e.target as HTMLElement).id === 'main') {
              getProducts(true).then((data) => {
                createProductsCards(data);
              });
            }
          }
        });
        document.body.addEventListener('click', (e) => {
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
        document.body.addEventListener('click', (e) => {
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
        document.body.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).className === 'buttonSearch') {
            const products = document.querySelector('.products');
            if (products) {
              products.innerHTML = '';
            }
            const input = document.querySelector('.search') as HTMLInputElement;
            const text = input.value.toString();
            productSearch(text).then((data) => {
              createProductsCardsCategory(data);
              sessionStorage.setItem('categoryId', 'main');
              document.querySelectorAll('A').forEach((i) => {
                i.classList.remove('active');
              });
              const main = document.getElementById('main');
              if (main) {
                main.classList.add('active');
              }
            });
          }
        });
        document.body.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).closest('.cardWrapper')) {
            const products = document.querySelector('.products');
            if (products) {
              products.innerHTML = '';
            }
            const card = (e.target as HTMLElement).closest('.cardWrapper');
            if (card) {
              const cardId = card.id;
              sessionStorage.setItem('categoryId', 'main');
              sessionStorage.setItem('productId', `${cardId}`);
              App.renderPage('product-page');
              location.hash = cardId;
            }
          }
        });
        document.body.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).className === 'button-filterByBrand') {
            const products = document.querySelector('.products');
            if (products) {
              products.innerHTML = '';
            }
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const values: string[] = [];
            checkboxes.forEach((node) => {
              values.push((<HTMLInputElement>node).value);
            });
            const brands = values.join('","');
            if (brands != '') {
              Filter(brands).then((data) => {
                createProductsCardsCategory(data);
              });
            } else {
              if (sessionStorage.getItem('categoryId') != 'main') {
                const id = sessionStorage.getItem('categoryId');
                if (id) {
                  getSubCategoryProduct(id).then((data) => {
                    createProductsCardsCategory(data);
                  });
                }
              }

              if (sessionStorage.getItem('categoryId') === 'main') {
                getProducts().then((data) => {
                  createProductsCards(data);
                });
              }
            }
          }
        });
      });
    return this.container;
  }
}

export default CatalogPage;
