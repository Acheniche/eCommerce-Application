import Page from "../../utils/templates/page";

export default class MainPage extends Page{
    static TextObject = {
        MainTitle: 'Main',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}