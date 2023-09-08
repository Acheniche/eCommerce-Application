import CreateAboutUsPage from '../../utils/templates/aboutUsPageTemplate';
import Page from '../../utils/templates/page';
import './style.css';

export default class AboutUsPage extends Page {
  static TextObject = {
    MainTitle: 'About Us',
  };

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);
    const basket = new CreateAboutUsPage();
    this.container.classList.add('AboutUsWrapper');
    this.container.append(title);
    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
