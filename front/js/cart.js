
//---------------------affichage du panier--------------------------


const getCart = JSON.parse(localStorage.getItem("cart")); // récupération du panier

for (let element in getCart) {  // tri des données du panier 
let cartId = getCart[element].id;
let cartQuantity = getCart[element].quantity;
let cartColor = getCart[element].color;

    const itemSection = document.getElementById ("cart__items");    // création des éléments d'affichage du DOM
    const article = document.createElement("article"); 
    const divCartImg = document.createElement("div");
    const img = document.createElement("img");
    const divCartContent = document.createElement("div");
    const divCartDescription  = document.createElement("div");
    const h2 = document.createElement("h2");
    const pColor = document.createElement("p");
    const pPrice = document.createElement("p");
    const divCartSetting = document.createElement("div");
    const divCartQuantity = document.createElement("div");
    const pQuantity = document.createElement("p");
    const input = document.createElement ("input");
    const divCartDelete = document.createElement("div");
    const pDelete = document.createElement("p");


    pColor.innerText = cartColor;  // données du panier intégrées au DOM
    input.value = cartQuantity;
    article.classList.add("cart__item");
    article.setAttribute("data-id", cartId);
    article.setAttribute("data-color", cartColor);




    fetch(`http://localhost:3000/api/products/${cartId}`)    // requête des informations manquantes
        .then(function(response) { 
            if (response.ok) { 
                return response.json();  
            } 
            })
        .then(function(apiDatas) {  // informations manquantes intégrées au DOM

        img.src = apiDatas.imageUrl;
        h2.innerText = apiDatas.name;
        
        pPrice.innerText = apiDatas.price + "€";
        divCartImg.classList.add("cart__item__img")
        img.setAttribute("alt", apiDatas.altTxt); 

    
        divCartContent.classList.add("cart__item__content");    // création des derniers éléments du DOM
        divCartDescription.classList.add("cart__item__content__description");
        divCartSetting.classList.add("cart__item__content__settings");
        divCartQuantity.classList.add("cart__item__content__settings__quantity");
        pQuantity.innerText = "Qté :";
        input.classList.add("itemQuantity");
        input.type = "number";
        input.min = "1";
        input.max = "100";
        divCartDelete.classList.add("cart__item__content__settings__delete");
        pDelete.classList.add("deleteItem");
        pDelete.innerText = "Supprimer"; 
    
        itemSection.appendChild(article);
        article.appendChild(divCartImg);
        divCartImg.appendChild(img);
        article.appendChild(divCartContent);
        divCartContent.appendChild(divCartDescription);
        divCartDescription.appendChild(h2);
        divCartDescription.appendChild(pColor);
        divCartDescription.appendChild(pPrice);
        divCartContent.appendChild(divCartSetting);
        divCartSetting.appendChild(divCartQuantity);
        divCartQuantity.appendChild(pQuantity);
        divCartQuantity.appendChild(input);
        divCartSetting.appendChild(divCartDelete);
        divCartDelete.appendChild(pDelete);
    });
}    




//-------------modification de la quantité panier-------------------


/*function ModifyQuantity() {
    const itemQuantity = document.getElementsByClassName("itemQuantity");
    for (let item of itemQuantity) {
        input.addEventListener("change", function (ModifyQuantityInput) {}); // écoute de l'input quantité
    } 
}    



function ModifyQuantityInput(event) {
    
    let quantityInput = event.target;
    const product = quantityInput.closest("article");
    
    let inputId = product.dataset.id; // récupération valeur id de l'input 
    let inputColor = product.dataset.color; // récupération valeur color de l'input
    let cartValues = getCart;
    console.log(cartValues);
    let updatedCart = cartValues.filter(function(product) {
        return inputId != cartValues.id || inputColor != cartValues.color;
    });
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    
    
    /*let updatedCart = cartValues.filter(function() { // recherche du produit modifié, d'abord par id
    return inputId === cartValues.id;
    });

    let ModifiedProduct = idSearch.find(function() { // ensuite par couleur 
    return inputColor === idSearch.color;
    });

    if (newQuantity > 0) {
    ModifiedProduct.quantity = newQuantity; // modification de la quantité
    localStorage.setItem("cart", JSON.stringify(cartValues));
    
    }  
    localStorage.setItem("cart", JSON.stringify(cartValues));

}*/
  



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











function deleteProducts() {
    const deleteButtonList = document.getElementsByClassName("deleteItem");
    console.log(deleteButtonList);
    for (let button of deleteButtonList) {
        button.addEventListener('click', deleteOneProduct)
    }
}



function deleteOneProduct(event) {
    const deleteButton = event.target;
    let inputId = deleteButton.closest("article").getAttribute("data-id")
    let inputColor = deleteButton.closest("article").getAttribute("data-color")
    let cartValues = JSON.parse(localStorage.getItem("cart"));
    console.log(cartValues);
    let updatedCart = cartValues.filter(function() {
        return inputId != cartValues.id && inputColor != cartValues.color;
    });
    localStorage.setItem("cart", JSON.stringify(updatedBasket));
}

deleteProducts();*/






















