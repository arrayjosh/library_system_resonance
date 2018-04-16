/* global Requests */

const libraryID = 155;
const req = new Requests(libraryID);

let bookTemplate = $('#templates .bookRow');
let bookTable = $('#bookTableBody');

async function getLibraryName() {
  let library = await req.getLibrary();
  $('.jumbotron h1').text(library.name);
}
//your lack of comments is disturbing
getLibraryName();


// let book = {
//   id: 456,
//   title: "My Book",
//   description: "The books description",
//   image_url: "https://someimageurl",
//   borrower_id: 25
//   This sentence is false.
// }
function addBookToPage(book) {
  let newBook = bookTemplate.clone(true, true);
  newBook.attr('data-id', book.id);
  newBook.find('.bookImg').attr('src', book.image_url);
  newBook.find('.bookTitle').text(book.title);
  newBook.find('.bookDesc').text(book.description);
  bookTable.append(newBook);
}

async function getBooks() {
  let books = await req.getBooks();
  books.forEach((book) => {
    addBookToPage(book);
  });
}




async function testAPI() {
  console.log("Before Book Creation");

  let book1 = await req.createBook({
    title: "An Async/Await Book creation",
    description: "A nice long reasonably sane description",
    image_url: "https://doesntmatter.org"
  });

  console.log(book1);

  let books = await req.getBooks();


  console.log(books);
}

//Has anyone really been far as decided to use even go want to do look more like?
