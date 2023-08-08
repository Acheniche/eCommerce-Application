import Page from '../../utils/templates/page';

export default class RegistrationPage extends Page {
  static TextObject = {
    MainTitle: 'Registration',
  };

  render() {
    const title = this.createHeaderTitle(RegistrationPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
