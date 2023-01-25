
//-------------------fonctionnalités récurrentes----------------


function getCart() { // fonction de récupération du panier
    return localStorage.getItem("cart");
}

function saveCart(cart) { // fonction d'envoi sur le localStorage
    return localStorage.setItem("cart", JSON.stringify(cart));
}


//---------------------affichage du panier--------------------------


const objectCart = JSON.parse(getCart());

if (objectCart <= 0) {
    let spanTotalQuantity = document.getElementById("totalQuantity").textContent = "0"; // affichage panier vide
    let spanTotalPrice = document.getElementById("totalPrice").textContent = "0";
}

for (let element in objectCart) {  
let cartId = objectCart[element].id;                    // tri des données du panier 
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
        divCartImg.classList.add("cart__item__img");
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

        objectCart[element].price = apiDatas.price; // ajoute les prix des produits au panier
        
        saveCart(objectCart);  
        ModifyQuantity();
        deleteProduct();        // principales fonctionnalités rattachées à la page
        totalQuantity();
        totalPrice();
    });
}    




//-------------modification quantité panier-------------------


function ModifyQuantity() {
    const itemQuantityList = document.getElementsByClassName("itemQuantity");   
    for (let item of itemQuantityList) {
        item.addEventListener("change", function (event) {  // évènement sur l'input de modification
            
            let itemId = event.target.closest("article").getAttribute("data-id");   // récupération des identifiants du produits
            let itemColor = event.target.closest("article").getAttribute("data-color");
            
            let objectCart = JSON.parse(getCart());         // identification du produit concerné
            let ProductToModify = objectCart.filter(element => element.id == itemId && element.color == itemColor); 
            
            ProductToModify[0].quantity = this.value;       // la valeur de l'écoute remplace l'ancienne quantité
            
            saveCart(objectCart);           
            totalQuantity(objectCart);      // sauvegarde du panier, mise à jour du DOM
            totalPrice(objectCart);
        });
    }
}
  

//-----------------suppression produit panier------------------------


function deleteProduct() {
    const deleteButtonList = document.getElementsByClassName("deleteItem");
    for (let button of deleteButtonList) {  //
        button.addEventListener('click', function(event) {  // évènement sur le bouton de suppression
            
            let inputId = event.target.closest("article").getAttribute("data-id");
            let inputColor = event.target.closest("article").getAttribute("data-color");
            
            let objectCart = JSON.parse(getCart());         // identification du produit concerné
            let updatedCart = objectCart.filter(element => element.id != inputId || element.color != inputColor); 
            
            let inputToDelete = document.querySelector(`article[data-id="${inputId}"][data-color="${inputColor}"]`);       
            
            if (inputToDelete === null) {                   // si la valeur est nulle, ne rien faire
                ;
            } else {
                inputToDelete.remove();                     // sinon, suppression du produit concerné
            }

            saveCart(updatedCart);                          
            totalQuantity(updatedCart);                     // sauvegarde du panier, mise à jour du DOM           
            totalPrice(updatedCart);
        });       
    }    
}  


//-----------------calcul de la quantité total du panier------------------


function totalQuantity() {
    let objectCart = JSON.parse(getCart());
    
    let cartQuantities = [];        
    
    for (let element in objectCart) {   // récupération des quantités de l'ensemble du panier dans un tableau
        cartQuantities.push(Number(objectCart[element].quantity));  
    }
    
    let totalCartQuantities;

    if (cartQuantities.length <= 0) {   // si le tableau est vide, ne rien faire
        ;
    } else {
        totalCartQuantities = cartQuantities.reduce(function(accu, valeur) { // sinon, addition des valeurs du tableau
            return accu + valeur;
        })
    }
    
    let spanTotalQuantity = document.querySelector("#totalQuantity");  // affichage du total dans le DOM
    if (objectCart.length <= 0) {
        spanTotalQuantity.textContent = "0";
    } else {
        spanTotalQuantity.textContent = totalCartQuantities;
    }
}


//-------------------calcul prix total du panier----------------------


function totalPrice() {
    deleteProduct();        // mise à jour des produits supprimés 

    let objectCart = JSON.parse(getCart());
    
    let eachProductTotalPrice = [];

    for (let element in objectCart) {         // calcul du prix total de chaque produit du panier
        let eachProductPrice = Number(objectCart[element].price);
        let eachProductQuantity = Number(objectCart[element].quantity); 
        eachProductTotalPrice.push(eachProductPrice*eachProductQuantity); 
    }

    if (eachProductTotalPrice.length <= 0) {    
        ;       
    } else {                                  // addition de tous les prix 
        totalCartPrice = eachProductTotalPrice.reduce(function(accu, valeur) { 
            return accu + valeur;
        })
    }
    
    let spanTotalPrice = document.querySelector("#totalPrice");     // affichage du total dans le DOM
    
    if (objectCart.length <= 0) {
        spanTotalPrice.textContent = "0";
    } else {
        spanTotalPrice.textContent = totalCartPrice;
    }    
}




//-----------------------vérification du formulaire--------------------------   


let firstNameValidity;
let lastNameValidity; 
let addressValidity;      // pour réutilisation sur bouton "commander"
let cityValidity;
let EmailValidity;


//-----expressions régulières requises pour chaque champs de formulaire-------


function checkFirstName(value) {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if (!value.match(/^[a-zA-Z-]{2,25}$/)) {
        firstNameErrorMsg.textContent = "Champ invalide";
        firstNameValidity = false;
    
    } else {
        firstNameErrorMsg.textContent = "";
        firstName = value;
        firstNameValidity = true;
    };
};

function checkLastName(value) {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    
    if (!value.match(/^[a-zA-Z-]{2,25}$/)) {
        lastNameErrorMsg.textContent = "Champ invalide";
        lastNameValidity = false;
    
    } else {
        lastNameErrorMsg.textContent = "";
        lastName = value;
        lastNameValidity = true;
    };
};

function checkAddress(value) {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    
    if (!value.match(/^[0-9a-zA-Z-\s]{5,50}$/)) {
        addressErrorMsg.textContent = "Champ invalide";
        addressValidity = false;
    
    } else {
        addressErrorMsg.textContent = "";
        address = value;
        addressValidity = true;
    };
};

function checkCity(value) {
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    if (!value.match(/^[a-zA-Z-]{2,25}$/)) {
        cityErrorMsg.textContent = "Champ invalide";
        cityValidity = false;
    
    } else {
        cityErrorMsg.textContent = "";
        city = value;
        cityValidity = true;
    };
};

function checkEmail(value) {
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if (!value.match(/^[a-z0-9\_-]+[a-z0-9\.\_-]*@[a-z0-9\_-]{2,}\.[a-z\.\_-]+[a-z\_-]+$/)) {
        emailErrorMsg.textContent = "Email invalide.";
        EmailValidity = false;
    } else {
        emailErrorMsg.textContent = "";
        email = value;
        EmailValidity = true;
    };
};


//----------intégration des fonctions regEx sur le formulaire-----------------


const formInputs = document.querySelectorAll('input[type="text"], input[type="email"]');  
for (let input of formInputs) {
    input.addEventListener("change", function(event) {  // évènement sur inputs du formulaire
        let inputValue = this.value;
        let inputId = this.id;
        
        switch(inputId) {                          // test des regEx pour chaque champ de saisie
            case "firstName":
            checkFirstName(inputValue);
            break;
                
            case "lastName":
            checkLastName(inputValue);
            break;

            case "address":
            checkAddress(inputValue);
            break;

            case "city":
            checkCity(inputValue);
            break;
            
            case "email":
            checkEmail(inputValue);
            break;
            default: null;
        }
    });
}




//-----------------création requête POST------------------


function productArray() {
    let objectCart = JSON.parse(getCart());
    let productIds = [];
    
    for (let element in objectCart) {  
        productIds.push(objectCart[element].id);  // récupération des id de chaque produit du panier
    }

    if(productIds <=0) {
        ;
    } else {
    return productIds;
    }
}

function  CreatePostRequest() {
    let contactObject = {
        contact : {
        firstName:firstName,
        lastName:lastName,
        address:address,        // création d'un objet avec les valeurs des input écoutés
        city:city,
        email:email
        },
        products:productArray()  // intégration des id panier
    }

    const post = {
        method: "POST",
        headers: { 
            'Accept': 'application/json',    // méthode POST sur l'objet défini
            'Content-Type': 'application/json' 
            }, 
        body: JSON.stringify(contactObject)
    };
    
    fetch("http://localhost:3000/api/products/order", post)  // requête fetch avec méthode POST
    .then(function(response) { 
        if (response.ok) { 
            return response.json();  
        } 
    })
    .then(function(apiDatas) {    
        window.location.href = "./confirmation.html?orderId=" + apiDatas.orderId;  // redirection sur la page confirmation.js
    }) 
    .catch(function(err) { 
    }); 
}




//--------------------envoi du formulaire-----------------------


    let submitButton = document.getElementById("order");
    
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        if(objectCart <=0) alert("panier vide"); 

        if(firstNameValidity != true || lastNameValidity != true || addressValidity != true || cityValidity != true|| EmailValidity != true) {
            alert("champ vide ou invalide");
        } else {
            return CreatePostRequest();
        }  
    }); 