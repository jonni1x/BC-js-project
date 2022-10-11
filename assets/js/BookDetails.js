const BookDetails = async() => {
    let id = localStorage.getItem('id');
    console.log(id);

    const res = await fetch('http://localhost:8000/books/'+id)
    const data = await res.json();
    
    const div = document.createElement('div');
    div.classList.add('book-content')
    const { image, title, description, price, category } = data;
    div.innerHTML = `
            <div class="image">
                <img src=${image} alt=${title}>
            </div>
            <div class="about-book">
                <h2>${title}</h2>
                <p>${description}</p>
                <p>${category}</p>
                <span>&#x20AC ${price}</span>
            </div>
    `;

    document.querySelector('main').appendChild(div)
}

BookDetails()
