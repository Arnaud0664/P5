
fetch("http://localhost:3000/api/products")   // requête de l'ensemble des produits sur l'API
.then(function(res) { 
    if (res.ok) { 
        return res.json();  // récupération de la promesse
    } 
    })
    .then(function(apiDatas) {    // exploitation des données récupérées
        for (let apiData of apiDatas) {  // chaque donnée des données API est intégré dans sa carte
            card(apiData);
        }
    }) 
    .catch(function(err) { 
    });
 
function card(asset) {    // création des cartes produits
    let sectionItems = document.getElementById("items"); // on choist l'élément d'entrée des balises html dans le document
    let a = document.createElement("a");
    let article = document.createElement("article");  // création des balises
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    sectionItems.appendChild(a);     // insertion des balises dans le document
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    
    h3.classList.add("productName");  // on ajoute une classe aux balises
    p.classList.add("productDescription");   

    img.src = asset.imageUrl;  // on relie les propriétés des balises aux propriétés des produits
    img.alt = asset.altTxt;
    h3.innerText = asset.name;
    p.innerText = asset.description;
    a.href = "./product.html?id=" + asset._id;  //création des cibles des liens, en ajoutant l'ID de chaque produit
} 































































































































































































