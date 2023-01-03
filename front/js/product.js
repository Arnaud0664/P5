

 
   

urlClickedProduct = window.location.href;   // récupération de l'url du produit
urlParams = new URL(urlClickedProduct); // analyse des composants de l'url
productId = urlParams.searchParams.get("id"); // récupération de l'id
console.log(productId)





























