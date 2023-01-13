
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
    let img = document.createElement("img")
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

var button = document.getElementById("addToCart");  
if (button !== null) {
    button.addEventListener("click", function(){    // sur écoute du bouton...
        var productColor = document.querySelector('select').value; // récupération choix couleur utilisateur 
        var productQuantity = document.querySelector("input").value;   // récupération choix quantité utilisateur
        
        if ((productQuantity > 100) || (productQuantity <1) || (!productColor)){ // valeurs obligatoires pour les choix utilisateurs
            alert("valeur incorrecte") 
        }else {
            var cart = []; // création du panier
            if (localStorage.getItem("cart")!== null){  // permet d'incrémenter le localStorage ???
                cart = JSON.parse(localStorage.getItem("cart"));
            } 
            
            let productOptions = { // création d'un objet avec les choix utlisateur
                id : productId,
                color : productColor,
                quantity : productQuantity,
            }
            
            let existingProduct = cart.find(productInCart => productInCart.id == productOptions.id && productInCart.color == productOptions.color);
            if (typeof existingProduct !== "undefined") {
                existingProduct.quantity = Number(existingProduct.quantity) + Number(productOptions.quantity);
                let updatedCart = cart.filter(productInCart => productInCart.id != productOptions.id && productInCart.color != productOptions.color);
                updatedCart.push(existingProduct);
                cart = updatedCart;
                console.log(updatedCart);
            } else {
                cart.push(productOptions);
            }
            
            localStorage.setItem("cart",JSON.stringify(cart));
            
            
            
            
            
            
            
            // l'objet est placé dans le panier, le panier est stocké dans le localStorage
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            /*let obj = arr.find((o, i) => {
                if (o.name === 'string 1') {
                    arr[i] = { name: 'new string', value: 'this', other: 'that' };
                    return true; // stop searching
                }*/
                
                
                
                
            }})   
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        