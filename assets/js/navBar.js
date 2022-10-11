const navBar = () => {
    const shoppingBtn = document.querySelector('nav ul li iconify-icon');
    const cartEl = document.querySelector('nav .cart-elements');

    shoppingBtn.addEventListener('click', () => {
        cartEl.classList.toggle('active');
    });

    
}

export default navBar;