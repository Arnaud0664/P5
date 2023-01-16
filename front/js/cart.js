
 var getCart =JSON.parse(localStorage.getItem("cart")); // récupération du produit
 console.log(getCart);
  /*if(cart == null) {
    var cart = []
    cart.push(save.id);
    cart.push(save.quantity);
    cart.push(save.color);
    
  }else if (save.id == cart.id && save.color == cart.color) {
    save.quantity ++;
  }
  


/*var cartArray = [localStorage.id, localStorage.quantity, localStorage.color]

for (let i in cartArray) 
  var cartId = cartArray[0];
  var cartQuantity = cartArray[1];
  var cartColor = cartArray[2];

fetch(`http://localhost:3000/api/products/${cartId}`)    // requête des informations restantes
.then(function(res) { 
    if (res.ok) { 
        return res.json();  
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
});*/






























