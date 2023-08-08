import Page from '../../utils/templates/page';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main',
  };

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
