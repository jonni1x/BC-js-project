import Search from './SearchBar.js';

document.addEventListener('DOMContentLoaded', () => {
    FetchBooks('http://localhost:8000/books');
})

const feedBacksArr = [
    {
        "image": "/assets/images/feedBackImg1.jpg",
        "description": "Lorem ipsum dolor, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        "person": "ALEXGL"
    },
    {
        "image": "/assets/images/feedBackImg2.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetuer elit. Aenean commodo ligula eget dolor. Aenean massa.",
        "person": "JESSEQLI"
    },
    {
        "image": "/assets/images/feedBackImg3.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. consectetuer",
        "person": "4UR3LIEN"
    },
    {
        "image": "/assets/images/feedBackImg4.jpg",
        "description": "Aenean Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. massa.",
        "person": "CHUCKY76"
    }
]

Search();

function bookDetails(id) {
    localStorage.setItem('id', id)
    window.location.href = '/BookDetails.html'
}

const FetchBooks = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const booksSection = document.querySelector('.swiper .swiper-wrapper')

    let arr = data.filter(book => book.author == 'Maria Garcia');
    addBestAuthorBooks(arr);

    data.forEach(book => {
        const { id, title, image, price, category, description} = book;
        const bookCard = document.createElement('div');
        bookCard.classList.add('swiper-slide');
        
        bookCard.innerHTML = `
                <img src=${image} alt=${title} class="img"/>
                <h3>${title}</h3>
                <span>${category}</span>
                <h4>€${price}</h4>
        `;

        bookCard.addEventListener('click', () => bookDetails(id));
        console.log(bookCard)
        booksSection.appendChild(bookCard)
    })
} 

const addBestAuthorBooks = (bestAuthorBooks) => {
    const books = document.querySelector('.author-of-month .books');
    
    bestAuthorBooks.forEach(_book => {
        const {title, image, price, category, id } = _book;
        
        const book = document.createElement('div');
        book.classList.add('book');

        book.innerHTML = `
            <img src=${image} alt=${title} />
            <h3>${title}</h3>
            <p>${category}</p>
            <span>€${price}</span>
        `
        book.addEventListener('click', () => bookDetails(id));

        books.appendChild(book);
        
    })
}

const feedBack = () => {
    const dots = document.querySelectorAll('.feedbacks .feedbacks-dots span');
    const fb_img = document.querySelector('.feedbacks .feedback img');
    const fb_p = document.querySelector('.feedbacks .feedback div p');
    const fb_span = document.querySelector('.feedbacks .feedback div span');

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const feedback = feedBacksArr[i];

            fb_img.src = feedback.image;
            fb_p.textContent = feedback.description;
            fb_span.textContent = feedback.person;

            dots.forEach(dot => {
                dot.classList.remove('active')
            });

            dot.classList.add('active')
        })
    })
}

feedBack()

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

menu();

const swiper = () => {
    const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

swiper();





export default bookDetails;