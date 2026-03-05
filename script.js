let cart = [];

function addToCart(name, price, button) {

    let existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    animateToCart(button);

    showNotification(name);
    updateCart();
    saveCart();
}

function updateCart() {

    const cartList = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(product => {

        const li = document.createElement("li");

li.innerHTML = `
    ${product.name} x${product.quantity} - $${product.price * product.quantity}
    <button onclick="removeFromCart('${product.name}')">❌</button>
`;
        cartList.appendChild(li);

        total += product.price * product.quantity;
    });

    totalElement.textContent = total;
    updateCartCount();
}

function sendWhatsApp() {

    if(cart.length === 0){
        alert("El carrito está vacío");
        return;
    }

    let message = "Hola quiero pedir:%0A";

    cart.forEach(product => {
        message += `- ${product.name} x${product.quantity} ($${product.price * product.quantity})%0A`;
    });

    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    message += `%0ATotal: $${total}`;

    const phone = "542646728026";

    const url = "https://wa.me/" + phone + "?text=" + message;

    window.open(url, "_blank");
}

function showNotification(name) {

    const notification = document.getElementById("notification");

    notification.textContent = `${name} agregado al carrito`;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
    notification.style.transform = "scale(1.1)";
setTimeout(() => {
    notification.style.transform = "scale(1)";
}, 200);
}

function removeFromCart(name) {
    cart = cart.filter(product => product.name !== name);
    updateCart();
    saveCart();
}

function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
     const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
        updateCartCount();
    }

}

loadCart();

function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    let totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

    countElement.textContent = totalQuantity;
}

function animateToCart(button) {

    const product = button.closest(".product");
    const img = product.querySelector(".product-img");
    const cartIcon = document.querySelector(".cart-icon");

    const imgClone = img.cloneNode(true);
    document.body.appendChild(imgClone);

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    imgClone.style.position = "fixed";
    imgClone.style.left = imgRect.left + "px";
    imgClone.style.top = imgRect.top + "px";
    imgClone.style.width = imgRect.width + "px";
    imgClone.style.transition = "all 0.8s ease-in-out";
    imgClone.style.zIndex = "1000";

    setTimeout(() => {
        imgClone.style.left = cartRect.left + "px";
        imgClone.style.top = cartRect.top + "px";
        imgClone.style.width = "30px";
        imgClone.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
        imgClone.remove();
    }, 800);
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    panel.classList.toggle("open");
}

const tituloMenu = document.querySelector(".titulo-menu");

window.addEventListener("scroll", () => {

    const posicion = tituloMenu.getBoundingClientRect().top;
    const pantalla = window.innerHeight;

    if(posicion < pantalla - 100){
        tituloMenu.classList.add("show");
    }

});


const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {

cards.forEach((card, index) => {

const posicion = card.getBoundingClientRect().top;
const pantalla = window.innerHeight;

if(posicion < pantalla - 100){

setTimeout(()=>{
card.classList.add("show");
}, index * 150);

}

});

});
