const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// Recuperation des élements du cache
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}

// afficher l'élément
function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCartContent(item)
  article.appendChild(cardItemContent)
  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}

// afficher la quantité total
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}

// afficher le prix total
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}

// créer le contenu du panier
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}

// definir les paramètre
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

// ajouter la suppresion aux parametres
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}

// supprimer un élément
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}

// supprimer l'article de la page
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
}

// ajouter une quantité
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

// mise à jour prix et quantité
function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

// supprimer les données du cache
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}

// enregistrer les nouvelles données dans le cache
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

// faire la description
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}

// afficher l'article
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

// faire l'article
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

// faire l'image
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}

const regexName = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.,\d\s]+$/;
const regexAddress = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.]+$/;
const regexCity = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.\d]+$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/;

let validFirstName = false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validEmail = false;

let contact = {
    firstName : "",
    lastName : "",
    address : "",
    city : "",
    email : ""
};

let products = [];

//Gère la validité des données entrées dans le formulaire
function formValidity() {
    if (document.getElementById("cart__items") != null) {
        document.getElementById("firstName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("firstNameErrorMsg").textContent = "";
                validFirstName = true
            } else {
                document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide";
                validFirstName = false
            }
        });
        document.getElementById("lastName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("lastNameErrorMsg").textContent = "";
                validLastName = true
            } else {
                document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide";
                validLastName = false
            }
        });
        document.getElementById("address").addEventListener("input", function(e) {
            if (regexAddress.test(e.target.value) && e.target.value != "") {
                document.getElementById("addressErrorMsg").textContent = "";
                validAddress = true
            } else {
                document.getElementById("addressErrorMsg").textContent = "Veuillez entrer une addresse valide";
                validAddress = false
            }
        });
        document.getElementById("city").addEventListener("input", function(e) {
            if (regexCity.test(e.target.value) && e.target.value != "") {
                document.getElementById("cityErrorMsg").textContent = "";
                validCity = true
            } else {
                document.getElementById("cityErrorMsg").textContent = "Veuillez entrer une ville valide";
                validCity = false
            }
        });
        document.getElementById("email").addEventListener("input", function(e) {
            if (regexEmail.test(e.target.value) && e.target.value != "") {
                document.getElementById("emailErrorMsg").textContent = "";
                validEmail = true
            } else {
                document.getElementById("emailErrorMsg").textContent = "Veuillez entrer une addresse email valide";
                validEmail = false
            }
        })
    }
}
formValidity();

//Enregistre les données contact si les champs sont bien remplis
function confirmForm() {
    if (validFirstName == true && validLastName == true && validAddress == true && validCity == true && validEmail == true) {
        contact.firstName = document.getElementById("firstName").value;
        contact.lastName = document.getElementById("lastName").value;
        contact.address = document.getElementById("address").value;
        contact.city = document.getElementById("city").value;
        contact.email = document.getElementById("email").value;
    } else {
        alert("Veuillez correctement remplir tous les champs du formulaire")
    }
}

//Liste les id des produits dans le panier
function confirmProducts() {
  products = [];
  for (i in cart) {
      products.push(cart[i].id)
  }
}

//Envoie les détails de la commande à l'Api
function confirmApi() {
  if (contact.firstName !== "" && products.length > 0) {
      let order = {
          contact,
          products
      };
      fetch("http://localhost:3000/api/products/order", {
          method : "POST",
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(order)
      })
      .then(function(res) {
          if (res.ok) {
            return res.json();
          }
      })
      .then(function(value) {
          sessionStorage.removeItem("cart");
          window.location.href=`../html/confirmation.html?order_id=${value.orderId}`
      })
      .catch(function(err) {
          console.log(err)
      });
  }
}

//Ecoute le clique du bouton commander et lance les autres fonctions
function confirmPurchase() {
  if (document.getElementById("cart__items") != null) {
      const confirm = document.getElementById("order");
      confirm.addEventListener("click", function(e) {
          e.preventDefault();
          if (cart == null) {
              alert("Le panier est vide");
              return
          }
          confirmForm();
          confirmProducts();
          confirmApi()
      })
  }
}
confirmPurchase();
