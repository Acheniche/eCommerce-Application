import CreateAboutUsPage from '../../utils/templates/aboutUsPageTemplate';
import Page from '../../utils/templates/page';
import aboutUsInfo from './aboutUsInfo';
import usSchool from './usSchool';
import './style.css';

export default class AboutUsPage extends Page {
  static TextObject = {
    MainTitle: 'About Us',
  };

  render() {
    const title = this.createHeaderTitle(AboutUsPage.TextObject.MainTitle);
    title.className = 'about-us';
    const basket = new CreateAboutUsPage();
    this.container.classList.add('AboutUsWrapper');
    this.container.append(title);

    this.container.insertAdjacentHTML('beforeend', usSchool());


    //(firstName:string, lastName:string, dataOfBerth:string, email:string, role:string, foto:string, information:string, gitProfail:string)
    const aboutAlex = aboutUsInfo('Алексей', 'Евдокимов', '22.11.1992', 'yomayo1992@yandex.ru', 'I worked with APIs on this project.', 'https://img.hhcdn.ru/photo/505200434.jpeg?t=1694450370&h=J5gScY8y75k6ri02YJufbw', '"I\'ve completed courses from Meta and I\'m currently taking a course from RS School. I want to become a good front-end programmer."', 'https://github.com/yomayo666');
    this.container.insertAdjacentHTML('beforeend', aboutAlex);

    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
