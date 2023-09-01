import Page from '../../utils/templates/page';
import './style.css';
import CreateCatalogPage from '../../utils/templates/catalogPageTemplate';
import { createProductsCards, createProductsCardsCategory, getProducts, getSubCategoryProduct } from './products';


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
      createProductsCards(data);
    });
    document.body.addEventListener('click', e => {
      if (e.target as HTMLElement) {
      if ((e.target as HTMLElement).tagName === 'A') {
        document.querySelectorAll('A').forEach(i => {
          i.classList.remove('active');
        });
        (e.target as HTMLElement).classList.add('active');
        console.log((e.target as HTMLElement).id);
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
    return this.container;
  }
}

export default CatalogPage;
