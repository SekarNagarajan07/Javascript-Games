// book class: representing a book
class Book {
  constructor(title, author, bn) {
    this.title = title;
    this.author = author;
    this.bn = bn;
  }
}
//UI class: to handle ui tasks

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookList(book));
  }

  static addBookList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td> ${book.bn}</td> <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#bn").value = "";
  }
}

//store class: to handle storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(bn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.bn === bn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//event: display books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

//event: add book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // get from values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const bn = document.querySelector("#bn").value;

  // Validate

  if ((title === "" || author === "", bn === "")) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    const book = new Book(title, author, bn);

    // console.log(book);

    // Add Book to ui
    UI.addBookList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message

    UI.showAlert("Book Added", "success");

    //Clear fields
    UI.clearFields();
  }
});

//event: remove book

document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  //Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message

  UI.showAlert("Book Removed", "success");
});
