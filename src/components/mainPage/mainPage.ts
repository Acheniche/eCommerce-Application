import Page from '../../utils/templates/page';
import './style.css';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main',
  };

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.classList.add('MainWrapper');
    this.container.append(title);
    return this.container;
  }
}
