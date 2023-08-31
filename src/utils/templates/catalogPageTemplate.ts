export type Products = {
    id: string;
    name: string;
    description: string;
};

export default class CreateCatalogPage {
    public mainCatalog() {
        return `
        <div class="filters"></div>
        <div class="rightSide">
            <div class="navigation"></div>
            <div class="products"></div>
        </div>
        `;
    }
}