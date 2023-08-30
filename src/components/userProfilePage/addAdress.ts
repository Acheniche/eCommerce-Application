import CreateProfilePage from "../../utils/templates/profilePageTemplates";
export default function addAddress(data:any){
  deleteAddress(data);
  addAddressShiping(data)
  deleteAddressShiping(data)
  let allAdressesButton = document.querySelectorAll('.add-button-adressBilling')
  let div_array = [...allAdressesButton];
  div_array.forEach(elem =>{
    elem.addEventListener('click', (e)=>{
      e.stopImmediatePropagation()
      const profile = new CreateProfilePage(data);
      const container = document.querySelector('#adress-profail-id3');
      container?.insertAdjacentHTML('beforeend', profile.adressBilling());
      addAddress(data)
    })
  })
}

function addAddressShiping(data:any){
  let allAdressesButton = document.querySelectorAll('.add-button-adressShiping')
  let div_array = [...allAdressesButton];
  div_array.forEach(elem =>{
    elem.addEventListener('click', (e)=>{
      e.stopImmediatePropagation()
      const profile = new CreateProfilePage(data);
      const container = document.querySelector('#adress-profail-id3');
      container?.insertAdjacentHTML('beforeend', profile.adressShiping());
      addAddress(data)
    })
  })
}

function deleteAddressShiping(data:any){
  let allAdressesButtonDelete = document.querySelectorAll('.delete-button-adressShiping')
  let buttonDelete = [...allAdressesButtonDelete];
  buttonDelete.forEach(elem =>{
    elem.addEventListener('click', (e) =>{
      e.stopImmediatePropagation()
      if(allAdressesButtonDelete.length > 1){
        console.log((<HTMLElement>e.target).parentElement?.parentElement?.remove())
        deleteAddress(data)
      }else{
        console.log("You canot delete")
        console.log(allAdressesButtonDelete)
        deleteAddress(data)
      }
    })
  })
}

function deleteAddress(data:any){
  let allAdressesButtonDelete = document.querySelectorAll('.delete-button-adressBilling')
  let buttonDelete = [...allAdressesButtonDelete];
  buttonDelete.forEach(elem =>{
    elem.addEventListener('click', (e) =>{
      e.stopImmediatePropagation()
      if(allAdressesButtonDelete.length > 1){
        console.log((<HTMLElement>e.target).parentElement?.parentElement?.remove())
        deleteAddress(data)
      }else{
        console.log("You canot delete")
        console.log(allAdressesButtonDelete)
        deleteAddress(data)
      }
    })
  })
/*   (<HTMLButtonElement>document.querySelector('.delete-adress')).addEventListener('click', (e)=>{
    ((<HTMLElement>e.target).parentElement?.parentElement?.parentElement)
  }) */
}


//console.log((<HTMLElement>e.target).parentElement?.parentElement?.parentElement)
