export default function getAddressObjects() {
  const table = document.getElementById('table-wrapper');
  const rows = table ? table.getElementsByTagName('tr') : [];

  const addressObjects: Array<{
    city: string | null;
    street: string | null;
    postalCode: string | null;
    country: string | null;
    id: string | null;
    type: string | null;
    isDefault: boolean;
  }> = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName('td');
    console.log((cells[1].querySelector('.street') as HTMLInputElement)?.value);

    const addressObject = {
      city: (cells[0].querySelector('#registration-city_billing') as HTMLInputElement)?.value || null,
      street: (cells[1].querySelector('.street') as HTMLInputElement)?.value || null,
      postalCode: (cells[2].querySelector('.postal-code') as HTMLInputElement)?.value || null,
      country: (cells[3].querySelector('select') as HTMLSelectElement)?.value || null,
      id: cells[4]?.textContent || null,
      type: (cells[5].querySelector('select') as HTMLSelectElement)?.value || null,
      isDefault: (cells[7].querySelector("input[type='checkbox']") as HTMLInputElement)?.checked || false,
    };


    addressObjects.push(addressObject);
  }


  return addressObjects;
}
