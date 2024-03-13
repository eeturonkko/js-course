class Book {
  constructor(title, author, category) {
    this.title = title;
    this.author = author;
    this.category = category;
  }
}
const inventory = [];

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const newBook = new Book(title, author, category);
  saveToLocalStorage(newBook);
  displayInventory();
}

function saveToLocalStorage(newBook) {
  inventory.push(newBook);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
}

function loadInventory() {
  if (localStorage.getItem("inventory")) {
    const savedInventory = JSON.parse(localStorage.getItem("inventory"));
    savedInventory.forEach((book) =>
      inventory.push(new Book(book.title, book.author, book.category))
    );
    displayInventory();
  }
}

function displayInventory() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "";
  inventory.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>Category: ${book.category}</p>`;
    inventoryDiv.appendChild(bookDiv);
  });
}

function searchBooks() {
  const searchCategory = document.getElementById("searchCategory").value;
  let filteredBooks;

  if (searchCategory.trim() === "") {
    filteredBooks = inventory;
  } else {
    filteredBooks = inventory.filter(
      (book) => book.category.toLowerCase() === searchCategory.toLowerCase()
    );
  }

  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "";

  if (filteredBooks.length > 0) {
    filteredBooks.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>Category: ${book.category}</p>`;
      inventoryDiv.appendChild(bookDiv);
    });
  } else {
    inventoryDiv.innerHTML = "<p>No books found in this category.</p>";
  }
}

loadInventory();
