
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
    })
    
    function productSheet(asset) {  // création des fiches produits
        let divItemImg = document.getElementsByClassName("item__img");  // création des noeuds texte
        let img = document.createElement("img")
        let h1Title = document.getElementById("title");
        let spanPrice = document.getElementById("price");
        let pDescription = document.getElementById("description");
        let selectColors = document.getElementById("colors");
        
        divItemImg[0].appendChild(img);     // ?  tableau de listes de noeuds
        img.src = asset.imageUrl;           // on relie les propriétés des produits aux noeuds texte
        img.alt = asset.altTxt;
        h1Title.textContent = asset.name;
        spanPrice.textContent = asset.price;
        pDescription.textContent = asset.description;
        let colors = asset.colors
       
        for (let color of colors){      // création des options couleurs, pour chaque couleur :
            option = document.createElement("option");  // création d'une balise option
            selectColors.appendChild(option)        // placement de la balise option dans la balise select
            option.textContent = color      // création d'un noeud texte pour chaque couleur
            option.value = color        // menu déroulant contenant chaque couleur
    }
    }


//----------------------------ajout au panier-----------------------

var colorChoice = document.querySelector('select'); // récupération choix couleur utilisateur 
var colorUserChoice = 0;
colorChoice.addEventListener('change', function () {    
    colorUserChoice = colorChoice.value; 
});

var quantityChoice = document.querySelector("input");   // récupération choix quantité utilisateur
var quantityUserChoice = 0;
quantityChoice.addEventListener('input', function () {
    quantityUserChoice = quantityChoice.value;
    if (quantityChoice.value > 100) { 
        quantityChoice.value = false; 
    }
    });

var button = document.getElementById("addToCart");  // ajout des options séléctionnées + id produit au panier
button.addEventListener("click", function(){
    localStorage.id = productId;
    localStorage.quantity = quantityUserChoice;
    localStorage.color = colorUserChoice;
});



















