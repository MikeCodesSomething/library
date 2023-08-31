const myLibrary = [];

function Book(title,author,numberOfPages,read,rating) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.rating = rating;
}

function addBookToLibrary(title,author,numberOfPages,read,rating) {
  // create book object using constructor
  let newBook = new Book(title, author, numberOfPages, read, rating);

  // add new book to array
  myLibrary.push(newBook);
}

function displayLibrary(myLibrary) {
    updateTotalBooks();
    let libraryContainer = document.getElementById("library-container");
    for(let book in myLibrary) {
        let currentBook = myLibrary[book]
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        libraryContainer.appendChild(bookCard);
        for (let key in currentBook) {
            // console.log(currentBook[key]);
            let bookProperty = document.createElement("div");
            if(key === 'author'){
                bookProperty.textContent = `By ${currentBook[key]}`}
            else if(key === 'numberOfPages') {
                bookProperty.textContent = `${currentBook[key]} pages`}
            else if(key === 'read') {
                bookProperty.textContent =
                currentBook[key] === true ? 'Read: Yes' : 'Read No'
            }
            else if(key === 'rating') {
                switch(currentBook[key]){
                    case 5: bookProperty.textContent = "★★★★★";
                    break;
                    case 4: bookProperty.textContent = "★★★★☆";
                    break;
                    case 3: bookProperty.textContent = "★★★☆☆";
                    break;
                    case 2: bookProperty.textContent = "★★☆☆☆";
                    break;
                    case 1: bookProperty.textContent = "★☆☆☆☆";
                    break;
                    case 0: bookProperty.textContent = "☆☆☆☆☆";
                    break;
                    default: bookProperty.textContent = "Not rated"
                }               
            }
            else bookProperty.textContent = currentBook[key]
            
            bookProperty.classList.add("book-property");
            bookCard.appendChild(bookProperty);
        }
    }
}

function updateTotalBooks() {
    let totalBooks = myLibrary.length;
    let totalBooksElement = document.getElementById("total-books");
    totalBooksElement.textContent = `Total books: ${totalBooks}`;
}

function openOverlay() {
    overlay.classList.add("open");
}

function closeOverlay(e) {
    console.log(e);
    if(e.target === overlay || e.target === closeOverlayButton) {
        overlay.classList.remove("open");
    }
}

// Example data
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
addBookToLibrary(
    "Harry Potter and the Philosophers Stone",
    "JK Rowling",
    400,
    true,
    3);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);


let addBookButton = document.getElementById("add-book-button");
let overlay = document.getElementById("overlay");
let closeOverlayButton = document.getElementById("close-overlay-button");

addBookButton.addEventListener('click', openOverlay);
overlay.addEventListener('click', closeOverlay);
closeOverlayButton.addEventListener('click', closeOverlay);


displayLibrary(myLibrary);