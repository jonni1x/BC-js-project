import navBar from "./navBar.js";
//import bookDetails from './script.js';
//import Search from './SearchBar.js';

// navBar();
//Search();
navBar();

const Products = async() => {

    const booksSection = document.querySelector('main section.books')

    const res = await fetch('http://localhost:8000/books');
    const data = await res.json();
    data.forEach(book => {
        const { id, title, image, price, category} = book;
        const card = document.createElement('div');
        card.classList.add('book');
        card.innerHTML = `
                <img src=${image} alt=${title} class="img"/>
                <h4>${title}</h4>
                <div>
                    <span>${category}</span>
                    <span>€${price}</span>
                </div>
                <iconify-icon icon="carbon:add" class="add-btn""></iconify-icon>
        `;

        let img = card.querySelector(".img");
        img.addEventListener("click", () => bookDetails(id));

        let addBtn = card.querySelector('.add-btn');
        addBtn.addEventListener('click', () => addToCart(image, title, price));

        booksSection.appendChild(card);
    })

}

Products();

const addToCart = (image, title, price) => {
    let cartQuantity = document.querySelector('nav ul li span');
    const cartEls = document.querySelector('nav .cart-elements');
    const elements = cartEls.querySelectorAll('.cart');

    cartQuantity.textContent = elements.length + 1;
    console.log(title)
    elements.forEach(el => {
        const elTitle = el.querySelector('h5');
        if(elTitle.textContent == title) {
            alert('book is already on the cart');
            el.remove();
            cartQuantity.textContent = elements.length;
        }
    })

    const div = document.createElement('div');
    div.classList.add("cart");

    div.innerHTML = `
        <img src=${image} alt=${title} />
        <h5>${title}</h5>
        <span>${price}&#x20AC;</span>
        <input type="number" min="0" class="quantity" value="1" />
        <iconify-icon icon="el:remove"></iconify-icon>
    `;

    div.querySelector('iconify-icon').addEventListener('click', deleteCart)
    div.querySelector('.quantity').addEventListener('input', updateTotal);
    
    cartEls.appendChild(div);
    updateTotal()
}

const deleteCart = (e) => {
    const elements = document.querySelectorAll('nav .cart-elements .cart');
    let cartQuantity = document.querySelector('nav ul li span');
    cartQuantity.textContent = elements.length - 1;

    e.target.parentElement.remove();
    updateTotal()
}

const updateTotal = () => {
    let preTotal = 0;

    const cartTotal = document.querySelector("nav .cart-elements h3 span");
    const cartEls = document.querySelectorAll('nav .cart-elements .cart');

    cartEls.forEach(cart => {
        const price = cart.querySelector('span').innerHTML;
        const quantity = cart.querySelector('input').value;

        preTotal += parseFloat(price) * parseInt(quantity);
    })
    cartTotal.innerHTML = ''
    cartTotal.innerHTML = `${preTotal.toFixed(2)}&#x20AC;`
}

const menu = () => {
    const menuBtn = document.querySelector('nav .burger-menu');
    const navLinks = document.querySelector('nav ul');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        })
    }
};

menu()