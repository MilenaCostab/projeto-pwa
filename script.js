let books = [];
let currentEditId = null;

function loadBooks() {
  const stored = localStorage.getItem('estanteVirtual');
  if(stored) {
    books = JSON.parse(stored);
  } else {
    books = [
  { id: Date.now()+1, title: "Senhora", author: "José de Alencar", genre: "Romance", pages: 255, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5vL-PpO0kLZFG2i0-2IXKuOn7Mlr4E8-NQ&s" },
  { id: Date.now()+2, title: "Eu sou Malala", author: "Malala Yousafzai", genre: "Biografia", pages: 255, image: "https://via.placeholder.com/60x80?text=Eu+sou+Malala" },
  { id: Date.now()+3, title: "Um amor para recordar", author: "Nicholas Sparks ", genre: "Romance", pages: 144, image: "https://m.media-amazon.com/images/I/71jeQnaNsJL._AC_UF1000,1000_QL80_.jpg" },
  { id: Date.now()+4, title: "A vida debaixo do sol: o mais extraordinário projeto de vida", author: "Benne Den", genre: "Vida cristã", pages: 175, image: "https://i0.wp.com/www.touchelivros.com.br/wp-content/uploads/2025/03/a_vida_debaixo_do_sol_o_mais_extraordinario_projeto_de_vida.jpg?fit=300%2C465&ssl=1" },
  { id: Date.now()+5, title: "A Autobiografia de George Müller", author: "George Müller ", genre: "Autobiografia", pages: 240, image: "https://m.media-amazon.com/images/I/81eHh8evN3L._AC_UF1000,1000_QL80_.jpg" },
  { id: Date.now()+6, title: "Manso e humilde", author: "Dane Ortlund  ", genre: "Literatura Cristã", pages: 244, image: "https://m.media-amazon.com/images/I/81H18BWkniL.jpg" },
  { id: Date.now()+7, title: "Louco amor", author: "Francis Chan  ", genre: "Espiritualidade", pages: 176, image: "https://m.media-amazon.com/images/I/51p+v5qIeRS.jpg" },
  { id: Date.now()+8, title: "Dom Casmurro", author: "Machado de Assis ", genre: "Romance", pages: 400, image: "https://m.media-amazon.com/images/I/810IAPcQmoL._UF1000,1000_QL80_.jpg" },
  { id: Date.now()+9, title: "Ego transformado", author: "Timothy Keller", genre: "Vida Cristã", pages: 144, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSnxfss3bEPlFPtruYhfcEcH4hfNnKpT3ASdyvgIwRGlOaViAO4fsk-bPcBjlylx5BMJBcpgGApB6b_W3_1lEnW7sZaB3mfdvbyK4cbsj1bdDyze3PfbCKH&usqp=CAc" },
  { id: Date.now()+10, title: "Madame Bovary", author: "Gustave Flaubert ", genre: "Romance", pages: 368, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-VbSTj4UW7hAoS2R34aHrBl7uc1iyD1q5rw&s" },  // imagem atualizada
  { id: Date.now()+11, title: "Bíblia", author: "--", genre: "Religião", pages: 1169, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSotvsFe67zpmL_6uyfYHwZpV1A5Bsrgm-4T7dKgL2Hkm1PvShnYS3mAYzXyUcr-FpAXnSAhLao3UFUUtsSLkFOUL9USdgrt6NW2jxU41PvbcF8K-SgzsetaqV08Mivw5mSU7fj1w&usqp=CAc" },
  { id: Date.now()+12, title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", genre: "Romance", pages: 368, image: "https://m.media-amazon.com/images/I/91GAAzBixYL._UF1000,1000_QL80_.jpg" }
 ];
    saveBooks();
  }
  renderAll();
}

function saveBooks() {
  localStorage.setItem('estanteVirtual', JSON.stringify(books));
}

function addBook(book) {
  books.push(book);
  saveBooks();
  renderAll();
}

function updateBook(id, newData) {
  const index = books.findIndex(b => b.id == id);
  if(index !== -1) {
    books[index] = { ...books[index], ...newData };
    saveBooks();
    renderAll();
  }
}

function deleteBook(id) {
  const confirmDel = confirm("Remover este livro da estante?");
  if(confirmDel) {
    books = books.filter(b => b.id != id);
    saveBooks();
    renderAll();
  }
}

function renderBookList() {
  const container = document.getElementById('booksContainer');
  if(books.length === 0) {
    container.innerHTML = '<div class="empty-message">Sua estante esta vazia... adicione um livro!</div>';
    return;
  }
  container.innerHTML = '';
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    const imgUrl = book.image && book.image.trim() !== '' ? book.image : '';
    card.innerHTML = `
      ${imgUrl ? `<img class="book-cover" src="${escapeHtml(imgUrl)}" alt="Capa" onerror="this.style.display='none'">` : '<div class="book-cover-placeholder">📖</div>'}
      <div class="book-info">
        <h3>${escapeHtml(book.title)}</h3>
        <p>${escapeHtml(book.author)}  |  ${escapeHtml(book.genre)}  |  ${book.pages} paginas</p>
      </div>
      <div class="book-actions">
        <button class="edit-book" data-id="${book.id}">Editar</button>
        <button class="delete-book" data-id="${book.id}">Excluir</button>
      </div>
    `;
    container.appendChild(card);
  });
  document.querySelectorAll('.edit-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      startEditBook(id);
    });
  });
  document.querySelectorAll('.delete-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      deleteBook(id);
    });
  });
}

function escapeHtml(str) {
  if(!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    if(m === '&') return '&amp;';
    if(m === '<') return '&lt;';
    if(m === '>') return '&gt;';
    if(m === '"') return '&quot;';
    if(m === "'") return '&#39;';
    return m;
  });
}

function renderAll() {
  renderBookList();
  resetForm();
}

function startEditBook(id) {
  const book = books.find(b => b.id == id);
  if(!book) return;
  currentEditId = id;
  document.getElementById('Title').value = book.title;
  document.getElementById('Author').value = book.author;
  document.getElementById('Genre').value = book.genre;
  document.getElementById('Pages').value = book.pages;
  document.getElementById('Image').value = book.image || '';
  
  document.getElementById('addBtn').style.display = 'none';
  document.getElementById('editGroup').style.display = 'flex';
}

function resetForm() {
  document.getElementById('Title').value = '';
  document.getElementById('Author').value = '';
  document.getElementById('Genre').value = '';
  document.getElementById('Pages').value = '200';
  document.getElementById('Image').value = '';
  currentEditId = null;
  document.getElementById('addBtn').style.display = 'block';
  document.getElementById('editGroup').style.display = 'none';
}

function getFormData() {
  const title = document.getElementById('Title').value.trim();
  const author = document.getElementById('Author').value.trim() || 'Anonimo';
  const genre = document.getElementById('Genre').value.trim() || 'Geral';
  let pages = parseInt(document.getElementById('Pages').value);
  if(isNaN(pages) || pages < 1) pages = 50;
  const image = document.getElementById('Image').value.trim();
  if(!title) {
    alert("Por favor, insira o titulo do livro.");
    return null;
  }
  return { title, author, genre, pages, image };
}

document.getElementById('addBtn').addEventListener('click', () => {
  const data = getFormData();
  if(data) {
    const newBook = { id: Date.now(), ...data };
    addBook(newBook);
  }
});

document.getElementById('updateBtn').addEventListener('click', () => {
  if(currentEditId === null) return;
  const data = getFormData();
  if(data) {
    updateBook(currentEditId, data);
    resetForm();
  }
});

document.getElementById('cancelBtn').addEventListener('click', resetForm);

document.getElementById('resetBtn').addEventListener('click', () => {
  if(confirm("Deseja apagar todos os livros e restaurar a lista original?")) {
    localStorage.removeItem('estanteVirtual');
    location.reload();
  }
});

const parallaxBg = document.getElementById('parallaxBg');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if(parallaxBg) {
    parallaxBg.style.backgroundPosition = `0px ${scrollY * 0.3}px`;
  }
});

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    console.log('Service Worker registrado', reg);
  }).catch(err => console.log('Falha no SW', err));
}

loadBooks();