import  bookDetails from './script.js';

const Search = () => {
    const searchInput = document.querySelector('#search-input');
    const searchElements = document.querySelector('nav .elements');

    searchInput.addEventListener('click', () => {
        searchElements.classList.add('active');
    })

    const books = [];

    fetch("http://localhost:8000/books")
            .then(res => res.json())
            .then(_books => {
                _books.forEach(book => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h5>${book.title}</h5>
                        <span>€${book.price}</span>
                    `;

                    books.push(div)
                    div.addEventListener('click', () => bookDetails(book.id))
                    searchElements.appendChild(div)
                })
            })

    searchInput.addEventListener('input', e => {
        let value = e.target.value.toLowerCase();
        books.forEach(book => {
            const bookTitle = book.querySelector("h5").textContent;
            const isVisible = bookTitle.toLowerCase().includes(value)
            
            book.classList.toggle('hide', !isVisible)
        })
        
    })
}


export default Search;