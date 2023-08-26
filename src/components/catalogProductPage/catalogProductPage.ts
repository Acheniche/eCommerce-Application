import Page from '../../utils/templates/page';
import './style.css';

class CatalogPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(CatalogPage.TextObject.MainTitle);
    // const login = new CreateLoginPage();
    this.container.classList.add('LoginWrapper');
    this.container.append(title);
    // this.container.insertAdjacentHTML('beforeend', login.block);
    return this.container;
  }
}

export default CatalogPage;
