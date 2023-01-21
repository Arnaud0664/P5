function getCart() { // fonction de récupération du panier
    return localStorage.getItem("cart");
}

function saveCart(cart) { // fonction d'envoi sur le localStorage
    return localStorage.setItem("cart", JSON.stringify(cart));
}




//---------------------affichage du panier--------------------------


const objectCart = JSON.parse(getCart());

for (let element in objectCart) {  // tri des données du panier 
let cartId = objectCart[element].id;
let cartQuantity = objectCart[element].quantity;
let cartColor = objectCart[element].color;

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



//-------------modification quantité panier-------------------



function ModifyQuantity() {
    const itemQuantityList = document.getElementsByClassName("itemQuantity");   
    for (let item of itemQuantityList) {
        item.addEventListener("change", function (event) {  // évènement sur l'élément de modification
            
            let itemId = event.target.closest("article").getAttribute("data-id"); 
            let itemColor = event.target.closest("article").getAttribute("data-color");
            
            let objectCart = JSON.parse(getCart());         // identification du produit concerné
            let ProductToModify = objectCart.filter(element => element.id == itemId && element.color == itemColor); 
            
            ProductToModify[0].quantity = this.value;       // la valeur de l'écoute remplace l'ancienne quantité
            
            saveCart(objectCart);  
        });
    }
}
  

//-----------------suppression produit panier------------------------


function deleteProduct() {
    const deleteButtonList = document.getElementsByClassName("deleteItem");
    for (let button of deleteButtonList) {  //
        button.addEventListener('click', function(event) {  // évènement sur l'élément de suppression
            
            let inputId = event.target.closest("article").getAttribute("data-id");
            let inputColor = event.target.closest("article").getAttribute("data-color");
            
            let objectCart = JSON.parse(getCart());         // identification du produit concerné
            let updatedCart = objectCart.filter(element => element.id != inputId || element.color != inputColor); 
            
            let inputToDelete = document.querySelector(`article[data-id="${inputId}"][data-color="${inputColor}"]`);       
            inputToDelete.remove();                         // suppression du produit concerné
            
            saveCart(updatedCart);                          // sauvegarde du panier sans le produit
        });       
    }    
}  


function totalQuantity() {

    let objectCart = JSON.parse(getCart());
    
    let cartQuantities = [];
    for (let element in objectCart) {  
        cartQuantities.push(Number(objectCart[element].quantity));  
    }
    
    let totalCartQuantities = cartQuantities.reduce(function(accu, valeur) {
        return accu + valeur;
    })
    
    let spanTotalQuantity = document.querySelector("#totalQuantity");
    spanTotalQuantity.textContent = totalCartQuantities;
}












/*function totalPrice() {
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

*/






       
        
        
        
        
        
        
        
        

/*function test(){
    return (typeof(deleteProduct) == "function") ? alert("ma fonction existe") : alert("ma fonction n\’existe pas");
    }
    test();
    /*<
    function mafonction() {}
    */
  



















