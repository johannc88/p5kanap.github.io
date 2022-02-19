const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
  let itemPrice = 0
  let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res))

// gérer les données
function handleData(kanap) {
  const { altTxt, colors, description, imageUrl, name, price } = kanap
  itemPrice = price
  imgUrl = imageUrl
  altText = altTxt
  articleName = name
  makeImage(imageUrl, altTxt)
  makeTitle(name)
  makePrice(price)
  makeDescription(description)
  makeColors(colors)
}

// faire l'image
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)
}

// faire le titre 
function makeTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 != null) h1.textContent = name
}

// faire le prix
function makePrice(price) {
  const span = document.querySelector("#price")
  if (span != null) span.textContent = price
}

// faire description
function makeDescription(description) {
  const p = document.querySelector("#description")
  if (p != null) p.textContent = description
}

// faire couleurs
function makeColors(colors) {
  const select = document.querySelector("#colors")
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = color
      select.appendChild(option)
    })
  }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value

  if (isOrderInvalid(color, quantity)) return
  saveOrder(color, quantity)
  redirectToCart()
}

// enregistrer l'ordre
function saveOrder(color, quantity) {
  const key = `${id}-${color}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName
  }
  localStorage.setItem(key, JSON.stringify(data))
}

// ordre n'est pas valide
function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Merci de choisir une couleur et/ou quantité")
    return true
  }
}

// rediriger vers la carte
function redirectToCart() {
  window.location.href = "cart.html"
}