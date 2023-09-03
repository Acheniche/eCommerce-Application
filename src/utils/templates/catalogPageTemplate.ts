export type Products = {
  id: string;
  name: string;
  description: string;
};

export default class CreateCatalogPage {
  public mainCatalog() {
    return `
        <div class="filters">
            <button class="button-filterByName">Filter by name</button>
            <button class="button-filterByPrice">Filter by price</button>
             <div class="search-wrapper">
                <input type="text" class="search" placeholder="search...">
                <button class="buttonSearch">Search</button>
            </div>
            <div class="filter">
                <form>
                    <label class="checkbox-container"> Samsung
                        <input type="checkbox" name="Brand" value="Samsung" class="brandCheck">
                        <span class="checkmark"></span>
                    </label>
                    <br>
                    <label class="checkbox-container"> Apple
                        <input type="checkbox" name="Brand" value="Apple" class="brandCheck">
                        <span class="checkmark"></span>
                    </label>
                    <br>
                    <label class="checkbox-container"> Xiaomi
                        <input type="checkbox" name="Brand" value="Xiaomi" class="brandCheck">
                        <span class="checkmark"></span>
                    </label>
                    <br>
                    <label class="checkbox-container"> ASUS
                    <input type="checkbox" name="Brand" value="ASUS" class="brandCheck">
                    <span class="checkmark"></span>
                    </label>
                    <br>
                    <label class="checkbox-container"> HP
                    <input type="checkbox" name="Brand" value="HP" class="brandCheck">
                    <span class="checkmark"></span>
                </label>
                <br>
                <label class="checkbox-container"> Epson
                <input type="checkbox" name="Brand" value="Epson" class="brandCheck">
                <span class="checkmark"></span>
            </label>
            <br>
            <label class="checkbox-container"> Lenovo
            <input type="checkbox" name="Brand" value="Lenovo" class="brandCheck">
            <span class="checkmark"></span>
        </label>
        <br>
        <label class="checkbox-container"> Canon
        <input type="checkbox" name="Brand" value="Canon" class="brandCheck">
        <span class="checkmark"></span>
    </label>
    <br>
    <label class="checkbox-container"> Sony
    <input type="checkbox" name="Brand" value="Sony" class="brandCheck">
    <span class="checkmark"></span>
</label>
<br>
<label class="checkbox-container"> Philips
<input type="checkbox" name="Brand" value="Philips" class="brandCheck">
<span class="checkmark"></span>
</label>
<br>
<label class="checkbox-container"> Bose
<input type="checkbox" name="Brand" value="Bose" class="brandCheck">
<span class="checkmark"></span>
</label>
<br>
                </form>
                <button class="button-filterByBrand">Submit</button>
            </div>
        </div>
        <div class="rightSide">
            <div class="navigation">
            <ul class="column1">
                <li><a class="category" id="main">Main</a></li>
            </ul>
            <ul class="column2">
                <li><a class="category" id="bc68bcc7-8b89-4bd2-b11a-552252a92b21">Cell phones and accessories</a></li>
                <li><a id="c481c62a-318b-45d3-bef7-feff154c9d58">Smartphones</a></li>
                <li><a id="7fae1263-6720-4748-a42b-3fa6bae2ef02">Smartwatches</a></li>
                <li><a id="f055b7b1-9aab-4022-b988-705412319ff8">Cases, Covers and Holsters</a></li>
            </ul>
            <ul class="column3">
                <li><a class="category" id="57fd3f41-95f6-4191-b6e5-afbb49cc2b86">Computers</a></li>
                <li><a id="a10a5c6a-f11b-4010-848b-b3607430dafc">Laptops</a></li>
                <li><a id="12506152-c53b-4235-972f-c3029b4be43b">PCs</a></li>
                <li><a id="04150097-8413-4d6f-b06c-bc9dcc2d3a56">Printers and Scanners</a></li>
            </ul>
            <ul class="column4">
                <li><a class="category" id="a9a76eea-80ff-44cf-8e37-eb125e85c096">TVs and accessories</a></li>
                <li><a id="45efac34-f6fd-46a8-ba10-97ef1ec270a2">Televisions</a></li>
                <li><a id="27178ae5-aba8-4ffc-aac2-d80d60829b08">Projectors</a></li>
                <li><a id="968de089-75e0-4d7c-8428-4b2bd0890547">Home Cinema</a></li>
            </ul>
            </div>
            <div class="products"></div>
        </div>
        `;
  }
}
