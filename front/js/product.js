urlClickedProduct = window.location.href;   // récupération de l'url du produit cliqué
urlParams = new URL(urlClickedProduct); // analyse des composants de l'url
productId = urlParams.searchParams.get("id"); // récupération de l'id du produit cliqué

fetch(`http://localhost:3000/api/products/${productId}`)    // requête avec id du produit cliqué, avec une string interpolation
.then(function(res) { 
    if (res.ok) { 
        return res.json();  // récupération de la promesse  
    } 
})
.then(function(apiDatas) {  // chaque donnée des données API est intégré dans sa fiche produit
    productSheet(apiDatas);
    productImgSrc = apiDatas.imageUrl;
    productImgAltTxt = apiDatas.altTxt;
})

function productSheet(sofa) {  // création des fiches produits
    let divItemImg = document.getElementsByClassName("item__img");  // création des noeuds texte
    let img = document.createElement("img");
    let h1Title = document.getElementById("title");
    let spanPrice = document.getElementById("price");
    let pDescription = document.getElementById("description");
    let selectColors = document.getElementById("colors");
    
    divItemImg[0].appendChild(img);     // ?  tableau de listes de noeuds
    img.src = sofa.imageUrl;           // on relie les propriétés des produits aux noeuds texte
    img.alt = sofa.altTxt;
    h1Title.textContent = sofa.name;
    spanPrice.textContent = sofa.price;
    pDescription.textContent = sofa.description;
    let colors = sofa.colors;
    
    for (let color of colors){      // création des options couleurs, pour chaque couleur :
        option = document.createElement("option");  // création d'une balise option
        selectColors.appendChild(option);        // placement de la balise option dans la balise select
        option.textContent = color;      // création d'un noeud texte pour chaque couleur
        option.value = color;        // menu déroulant contenant chaque couleur
    }
}


//----------------------création panier---------------------------

let button = document.getElementById("addToCart");  
button.addEventListener("click", function(event) { // écoute du bouton "ajouter au panier"
 
    let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []; // initialisation du panier s'il est vide

    let productColor = document.querySelector('select').value; // récupération choix utilisateur 
    let productQuantity = document.querySelector("input").value;
    

    if ((productQuantity > 100) || (productQuantity <1) || (!productColor)){ // valeurs obligatoires pour les choix utilisateurs
        alert("valeur incorrecte");
        return;
    }

    let productOptions = { // création d'un objet produit avec les choix utlisateur
        id : productId,
        color : productColor,
        quantity : productQuantity,
    }
        
    if(cart.length > 0){
        let found = false;
        
        for (const element of cart) {  // recherche de doublons dans le panier 
            if(productOptions._id === element._id && productOptions.color === element.color){
                element.quantity = Number(element.quantity) + Number(productOptions.quantity); 
                found = true;  
                break;
            }
        }
        
        if(found === false){ // pas de doublons = ajouter l'objet produit au panier, sinon ajouter uniquement la quantité
            cart.push(productOptions);
        }
        
        localStorage.removeItem("cart");
        localStorage.setItem("cart",JSON.stringify(cart));
        
        }else { 
            cart.push(productOptions); 
            localStorage.setItem("cart",JSON.stringify(cart)); 
        }
        
});