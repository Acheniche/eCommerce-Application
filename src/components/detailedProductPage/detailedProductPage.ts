import Page from '../../utils/templates/page';
import { createProductsCards, getProduct } from './detaildProductInfo';
import './style.css';

export default class ProductPage extends Page {
  render() {
    this.container.classList.add('DetailedProductWrapper');
    getProduct().then((data) => {
        createProductsCards(data);
    });
    return this.container;
  }
}
