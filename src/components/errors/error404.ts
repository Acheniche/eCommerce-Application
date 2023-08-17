import Page from '../../utils/templates/page';
import '../../components/errors/error.css';


export enum ErrorTypes {
  Error404 = 404,
}

export default class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': '404 Page Not Found',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    this.container.classList.add('errorWrapper');
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}
