import Page from '../../utils/templates/page';
//import App from '../app';
//import { createCart } from '../basketPage/createAnonCart';
import './style.css';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main',
  };

  render() {
  //  if (App.isLogin === false) {
  //    createCart();
  //  }
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.classList.add('MainWrapper');
    this.container.append(title);
    return this.container;
  }
}
