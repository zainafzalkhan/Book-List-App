const title=document.getElementById('title');
const author=document.getElementById('author');
const isbn=document.getElementById('isbn');
const sub=document.getElementById('submit');
const tdata=document.querySelector('#tdata');
// to create book object
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
     }
}
// UI related functionality 
class UI{
    static displayBook(){
        const bookList=Store.getBooks()
        const books=bookList;
        books.forEach(book=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#tdata');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
       <td> <a href='#' class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static clearForm(){
        title.value=''
        author.value=''
        isbn.value=''
    }
    static deleteBook(e){
      if(e.target.classList.contains('delete')){
         e.target.parentElement.parentElement.remove();
          Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
      }
    }
}

// Store data into chrome local storage
class Store{
   static getBooks(){
       let books;
       // check storage have book data or not
    if(localStorage.getItem('books')===null){
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    return books
    }
   static addBook(book){
       const books=Store.getBooks();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books))
    }
   static removeBook(isbn){
       const books=Store.getBooks();
       books.forEach((book,index)=>{
           if(book.isbn===isbn){
               books.splice(index,1);
           }
       })
       localStorage.setItem('books',JSON.stringify(books));
    }

}

// Display Book Data to Table
document.addEventListener('DOMContentLoaded',UI.displayBook);
// Add Book from submited form
sub.addEventListener('click',addToBook);
function addToBook(e){
    e.preventDefault();
    if(title.value===''||author.value===""||isbn.value===''){
        alert('fill all the blanks input boxes')
        return false;
    }
    // create object of book class
    const b=new Book(title.value,author.value,isbn.value);
    // method to add created book into list
    UI.addBookToList(b);
    // add values to local storage
    Store.addBook(b);
    // clear input values after submiting vlaues
    UI.clearForm()
  
}

// Reomve Data by Click delete
tdata.addEventListener('click',UI.deleteBook)


