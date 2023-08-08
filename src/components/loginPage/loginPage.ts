import Page from '../../utils/templates/page';

export default class LoginPage extends Page {
  static TextObject = {
    MainTitle: 'Login',
  };

  render() {
    const title = this.createHeaderTitle(LoginPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
