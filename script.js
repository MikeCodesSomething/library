const myLibrary = [];

class Book {
    constructor(title,author,numberOfPages,read,rating) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
        this.rating = rating;
    }
    toggleRead() {
        this.read = !this.read;
    }
    

}

function addBookToLibrary(title,author,numberOfPages,read,rating) {
  // create book object using constructor
  let newBook = new Book(title, author, numberOfPages, read, rating);

  // add new book to array
  myLibrary.push(newBook);
}

function addBookFromForm(e) {
    e.preventDefault()
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
    let rating5 = document.getElementById("5-star");
    let rating4 = document.getElementById("4-star");
    let rating3 = document.getElementById("3-star");
    let rating2 = document.getElementById("2-star");
    let rating1 = document.getElementById("1-star");
    let rating ="Not rated"
    if (rating5.checked) rating = 5;
    if (rating4.checked) rating = 4;
    if (rating3.checked) rating = 3;
    if (rating2.checked) rating = 2;
    if (rating1.checked) rating = 1;  
    
    console.log(read.value);

    addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        read.checked,
        rating);
    
    displayLibrary(myLibrary);
    closeOverlay();
    newBookForm.reset();
}

function displayLibrary(myLibrary) {
    updateTotalBooks();
    hideBooks();
    let libraryContainer = document.getElementById("library-container");
    for(let book in myLibrary) {
        let currentBook = myLibrary[book]
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.classList.add(book);
        libraryContainer.appendChild(bookCard);
        for (let key in currentBook) {
            populateBookCard(key, currentBook, bookCard)
        }
        
        //Add mark as read button
        let toggleReadButton = document.createElement("button")
        toggleReadButton.classList.add("toggle-read-button");
        toggleReadButton.textContent = currentBook.read === true ? "Mark as Unread" : "Mark as Read"
        bookCard.appendChild(toggleReadButton);
        toggleReadButton.addEventListener('click', () => {
            currentBook.toggleRead();
            displayLibrary(myLibrary);
        });

        //Add remove book button
        let removeBookButton = document.createElement("button")
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "Remove Book"
        bookCard.appendChild(removeBookButton);
        removeBookButton.addEventListener('click', removeBook);
        
    }
}

function populateBookCard(key, currentBook, bookCard) {
    if (typeof currentBook[key] !== "function") {
        let bookProperty = document.createElement("div");
        if(key === 'author'){
            bookProperty.textContent = `By ${currentBook[key]}`}
        else if(key === 'numberOfPages') {
            bookProperty.textContent = `${currentBook[key]} pages`}
        else if(key === 'read') {
            bookProperty.textContent =
            currentBook[key] === true ? 'Read: Yes' : 'Read: No'
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

function updateTotalBooks() {
    let totalBooks = myLibrary.length;
    let totalBooksElement = document.getElementById("total-books");
    totalBooksElement.textContent = `Total books: ${totalBooks}`;
}

function removeBook(e) {
    //figure out which book to remove
    bookToRemove = e.target.closest(".book-card");
    //remove book from library
    let indexToRemove = bookToRemove.classList[1];
    myLibrary.splice(indexToRemove, 1);
    //reload display
    displayLibrary(myLibrary);
}

function hideBooks() {
    let bookCards = document.getElementsByClassName("book-card");
    let numberOfCards = bookCards.length;
    for(i = numberOfCards-1; i >= 0; i--) {
        bookCards[i].remove();
    }
}

function openOverlay() {
    overlay.classList.add("open");
}

function closeOverlay() {
    overlay.classList.remove("open");
}

// Example data
myLibrary.push(new Book("The Lion, The Witch and the Wardrobe","CS Lewis",208,true,4));
addBookToLibrary("The Lion, The Witch and the Wardrobe","CS Lewis",208,true,4);
// addBookToLibrary(
//     "Harry Potter and the Philosophers Stone",
//     "JK Rowling",
//     400,
//     true,
//     3);
// addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
// addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
// addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
// addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
// addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis",500,true,4);
 addBookToLibrary(1,1,1,true,1,1);
 addBookToLibrary(2,2,2,true,2,2);
 addBookToLibrary(3,3,3,true,3,3);
 addBookToLibrary(4,4,4,true,4,4);
 addBookToLibrary(5,5,5,true,5,5);
 addBookToLibrary(6,6,6,true,6,6);
 addBookToLibrary(7,7,7,true,7,7);
 addBookToLibrary(8,8,8,true,8,8);


let addBookButton = document.getElementById("add-book-button");
let overlay = document.getElementById("overlay");
let closeOverlayButton = document.getElementById("close-overlay-button");

addBookButton.addEventListener('click', openOverlay);
overlay.addEventListener('click', (e) => {if(e.target === overlay) closeOverlay()});
closeOverlayButton.addEventListener('click', closeOverlay);

let newBookForm = document.getElementById("add-book-form");
newBookForm.addEventListener("submit", addBookFromForm, false);



displayLibrary(myLibrary);