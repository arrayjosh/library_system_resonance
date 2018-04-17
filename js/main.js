/* global Requests */

const libraryID = 155;
const req = new Requests(libraryID);

let bookTemplate = $('#templates .bookRow');
let borrowerTemplate = $('#templates .borrowerRow');
let bookTable = $('#bookTableBody');
let borrowerTable = $('#borrowerTableBody');

async function getLibraryName() {
  let library = await req.getLibrary();
  $('.jumbotron h1').text(library.name);
}
//your lack of comments is disturbing
getLibraryName();



function addBookToPage(book) {
  let newBook = bookTemplate.clone(true, true);
  newBook.attr('data-id', book.id);
  newBook.find('.bookImg').attr('src', book.image_url);
  newBook.find('.bookTitle').text(book.title);
  newBook.find('.bookDesc').text(book.description);
  bookTable.append(newBook);
}

function addBorrowerToPage(borrower) {
  let newBorrower = borrowerTemplate.clone(true, true);
  newBorrower.attr('data-id', borrower.id);
  newBorrower.find('.borrowerFirstname').text(borrower.firstname);
  newBorrower.find('.borrowerLastname').text(borrower.lastname);
  borrowerTable.append(newBorrower);
}

async function getBooks() {
  let books = await req.getBooks();
  books.forEach((book) => {
    addBookToPage(book);
  });
}

getBooks();

async function getBorrowers() {
  let borrowers = await req.getBorrowers();
  borrowers.forEach((borrower) => {
    addBorrowerToPage(borrower);
  });
}
getBorrowers();





async function deleteBook(bookRow) {
  let bookID = bookRow.attr('data-id');
  await req.deleteBook({id: bookID});
  bookRow.fadeOut(300, () => bookRow.remove());
}

async function deleteBorrower(borrowerRow) {
  let borrowerID = borrowerRow.attr('data-id');
  await req.deleteBorrower({id: borrowerID});
  borrowerRow.fadeOut(300, () => borrowerRow.remove());
}

function deleteAllBooks() {
  $('.bookRow').each(function() {
    deleteBook($(this));
  });
}

function deleteAllBorrowers() {
  $('.borrowerRow').each(function() {
    deleteBorrower($(this));
  });
}

$('.deleteBook').click(function() {
  let bookRow = $(this).parents('.bookRow');
  deleteBook(bookRow);
});

$('.deleteBorrower').click(function() {
  let borrowerRow = $(this).parents('.borrowerRow');
  deleteBorrower(borrowerRow);
});


$('#addBookForm').on('submit', async function(event) {
  event.preventDefault();

  // Grab the book form data and create a new book object
  let newBook = {
    title: event.target.addBookTitle.value,
    description: event.target.addBookDescription.value,
    image_url: event.target.addBookImageURL.value,
  };

  // Create the book on the server
  newBook = await req.createBook(newBook);

  // Add the book to our books table
  addBookToPage(newBook);

  // Reset the form fields
  event.target.reset();

  // Finally, close the #addBookModal
  $('#addBookModal').modal('hide');

});

$('#addBorrowerForm').on('submit', async function(event) {
  event.preventDefault();

  // Grab the book form data and create a new book object
  let newBorrower = {
    firstname: event.target.addBorrowerFirstname.value,
    lastname: event.target.addBorrowerLastname.value,
  };

  // Create the book on the server
  newBorrower = await req.createBorrower(newBorrower);

  // Add the book to our books table
  addBorrowerToPage(newBorrower);

  // Reset the form fields
  event.target.reset();

  // Finally, close the #addBookModal
  $('#addBorrowerModal').modal('hide');

});


async function testAPI() {
  console.log("Before Book Creation");

  let book1 = await req.createBook({
    title: "An Async/Await Book creation",
    description: "A nice long reasonably sane description",
    image_url: "https://doesntmatter.org"
  });



  let books = await req.getBooks();



}

//Has anyone really been far as decided to use even go want to do look more like?
