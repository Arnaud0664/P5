
var getCart =JSON.parse(localStorage.getItem("cart")); // récupération du produit

for (let element in getCart) {
let cartId = getCart[element].id;
let cartQuantity = getCart[element].quantity;
let cartColor = getCart[element].color;

  fetch(`http://localhost:3000/api/products/${cartId}`)    // requête des informations restantes
  .then(function(response) { 
      if (response.ok) { 
          return response.json();  
      } 
      })
  .then(function(apiDatas) {  // intégration de l'ensemble des informations sur balises html
    document.querySelector("#cart__items").innerHTML +=
      `<article class="cart__item" data-id="${cartId}" data-color="${cartColor}">
          <div class="cart__item__img">
            <img src="${apiDatas.imageUrl}" alt="${apiDatas.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${apiDatas.name}</h2>
              <p>${cartColor}</p>
              <p>${apiDatas.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartQuantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`
  });
}; 






























