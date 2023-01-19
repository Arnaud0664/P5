
const getCart = JSON.parse(localStorage.getItem("cart")); // récupération du panier

for (let element in getCart) {  // tri des données  
let cartId = getCart[element].id;
let cartQuantity = getCart[element].quantity;
let cartColor = getCart[element].color;

  fetch(`http://localhost:3000/api/products/${cartId}`)    // requête des informations restantes
  .then(function(response) { 
      if (response.ok) { 
          return response.json();  
      } 
      })
  .then(function(apiDatas) {  // affichage du panier
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

function cart() { // pour réutiliser le panier sur l'ensemble des fonctionnalités
return JSON.parse(localStorage.getItem("cart"));
};




//-------------modification de la quantité panier-------------------

const quantityInput = document.querySelectorAll(".itemQuantity");
console.log(quantityInput);
for (let input of quantityInput) {
  input.addEventListener("change", function () { // écoute de l'input quantité
  
    let cartValues = [];
    cartValues = cart(); // récupération du panier
    
    let inputId = this.closest(".cart__item").dataset.id; // récupération valeur id de l'input 
    let inputColor = this.closest(".cart__item").dataset.color; // récupération valeur color de l'input
    let newQuantity = this.value; // récupération valeur quantité de l'input
    
    let idSearch = cartValues.filter(function() { // recherche du produit modifié, d'abord par id
      return inputId === cartValues.id;
    });

    let ModifiedProduct = idSearch.find(function() { // ensuite par couleur 
      return inputColor === idSearch.color;
    });

    if (newQuantity > 0) {
      ModifiedProduct.quantity = newQuantity; // modification de la quantité
      cartValues.push(ModifiedProduct.quantity);
      localStorage.setItem("cart", JSON.stringify(cartValues));
    };  
  });
};
  



/*function totalQuantity() {
  let cartValues = Cart();
  let spanTotalQuantity = document.getElementById("#totalQuantity");
  let quantityArray = [];
  if (cartValues === null) {
    return emptyCartMessage();
  } else {
    let total;
    for (let element=0; element.quantity<cartValues.length; element.quantity++)
      total = total + element.quantity;
      quantityArray.push(parseInt(total)); 
      spanTotalQuantity.textContent = total; //valeur initiale à 0 pour eviter erreur quand panier vide
    };
};

function totalPrice() {
  let cartValues = Cart();
  let spanTotalPrice = document.getElementById("#totalQuantity");
  let priceArray = [];
  if (cartValues === null) {
    return emptyCartMessage();
  } else {
    let total;
    for (let element=0; element.price<cartValues.length; element.price++)
      total = total + element.price;
      priceArray.push(parseInt(total)); 
      spanTotalPrice.textContent = total;
    };
};

for (let i = 0; i <= quantityInput.lenght; i++) {
};

let inputId = this.closest(".cart__item").dataset.id; // récupération valeur id de l'input 
    let inputColor = this.closest(".cart__item").dataset.color; // récupération valeur color de l'input
    let newQuantity = this.value; // récupération valeur quantité de l'input

*/



function deleteButtonListener() {
    const deleteButtons = document.getElementsByClassName("cart__item__content__settings__delete");
    console.log(deleteButtons);
    for (let i = 0; i <= deleteButtons.length; i++) {
        console.log(deleteButtons, i, deleteButtons[i]);
        deleteButtons[i].addEventListener("click", function (element) {console.log("bouton cliqué");});

    }
}

//deleteButtonListener();



function deleteProducts(){
    const deleteButtonList = document.getElementsByClassName("deleteItem");
    for (let button of deleteButtonList) {
        button.addEventListener('click', deleteOneProduct)
    }
}



function deleteOneProduct(element) {
    console.log(element);
}

deleteProducts();






















