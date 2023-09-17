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
    const aboutAndrei = aboutUsInfo('Andrei',
      'Bibik', ' ',
      'Email: Ache_niche00@mail.ru',
      'In this project, I was the team leader. I handled all the organizational aspects of the project and coordinated with teammates. ',
      '../src/assets/image/20230917_220528.jpg',
      '"I am 19 years old, at the moment i study at Belarusian State University of Informatics and Radioelectronics. My goal at the moment is to become a highly qualified IT specialist."',
      'https://github.com/Acheniche');
    const aboutAlex = aboutUsInfo('Алексей',
      'Евдокимов', '22.11.1992',
      'yomayo1992@yandex.ru',
      'I worked with APIs on this project.',
      '../src/assets/image/Alex.jpg',
      '"I\'ve completed courses from Meta and I\'m currently taking a course from RS School. I want to become a good front-end programmer."',
      'https://github.com/yomayo666');
      const aboutArtem = aboutUsInfo('Artem',
      'Farkhutdinov', ' ',
      'Email: artiom.farhutdinoff@yandex.ru',
      'In this project, I was responsible for responsiveness, design, and input field validation.',
      '../src/assets/image/Artem.jpg',
      '"I am 31 years old and currently completing my studies at Rolling Scopes School, specializing in JavaScript/Front-end 2023Q1. My current goal is to find my first job in IT) and become a highly skilled IT specialist."',
      'https://github.com/ChessMasterr');
    this.container.insertAdjacentHTML('beforeend', aboutAndrei);
    this.container.insertAdjacentHTML('beforeend', aboutAlex);
    this.container.insertAdjacentHTML('beforeend', aboutArtem);
    this.container.insertAdjacentHTML('beforeend', basket.block);
    return this.container;
  }
}
