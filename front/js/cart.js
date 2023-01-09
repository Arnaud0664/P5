//-------------------------création des emplacements du panier--------------------------- 

var cartItems = document.getElementById("cart__items");
var articleCart = document.createElement("article");
articleCart.className = ("cart__item");


var divCartItemImg = document.createElement("div");
divCartItemImg.className = ("cart__item__img");

var imgCartItemImg = document.createElement("img")
imgCartItemImg.src = localStorage.imgSrc;           
imgCartItemImg.alt = localStorage.imgAlt;

var divCartItemContent = document.createElement("div")
divCartItemContent.className = ("cart__item__content")

var divCartItemContentDescription = document.createElement("div")
divCartItemContentDescription.className = ("cart__item__content_description")

var h2Cart = document.createElement("h2");

var pColorCart = document.createElement("p");

var pPriceCart = document.createElement("p");

var divCartItemContentSettings = document.createElement("div")
divCartItemContentSettings.className = ("cart__item__content_settings")

var divCartItemContentSettingsQuantity = document.createElement("div")
divCartItemContentSettingsQuantity.className = ("cart__item__content_settings_quantity")

var pQuantityCart = document.createElement("p");

var inputCart = document.createElement("input");
inputCart.className = ("itemQuantity");
inputCart.name = ("itemQuantity")
inputCart.type = ("number");
inputCart.min = ("1");
inputCart.max = ("100");
inputCart.value = ("42");

var divCartItemContentSettingsDelete = document.createElement("div")
divCartItemContentSettingsDelete.className = ("cart__item__content_settings_delete")

var pdeleteItem = document.createElement("p");
pdeleteItem.className = ("deleteItem")

cartItems.appendChild(articleCart);
articleCart.appendChild(divCartItemImg);
articleCart.appendChild(divCartItemContent);

divCartItemImg.appendChild(imgCartItemImg);

divCartItemContent.appendChild(divCartItemContentDescription);
divCartItemContent.appendChild(divCartItemContentSettings);

divCartItemContentDescription.appendChild(h2Cart);
divCartItemContentDescription.appendChild(pColorCart);
divCartItemContentDescription.appendChild(pPriceCart);

divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

divCartItemContentSettingsQuantity.appendChild(pQuantityCart);
divCartItemContentSettingsQuantity.appendChild(inputCart);

divCartItemContentSettingsDelete.appendChild(pdeleteItem);

articleCart.setAttribute = ("data-id", `${localStorage.id}`), ("data-color", localStorage.color);
inputCart.value = localStorage.quantity;


 const cartArray = new Array (localStorage.id, localStorage.quantity, localStorage.color)
console.log(cartArray)







/*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->*/




















   



































