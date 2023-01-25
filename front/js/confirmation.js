   
//-----------affichage du n° de commande-----------


url = new URL(window.location.href); 
orderId = url.searchParams.get("orderId");
document.getElementById("orderId").textContent = orderId;
