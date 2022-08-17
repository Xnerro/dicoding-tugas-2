const modal = document.getElementsByClassName('modal');
const read = document.getElementById('read-table');
const unread = document.getElementById('unread-table');
const close = document.getElementsByClassName('close-button')[0];
const idInput = document.getElementById('id');
const toast = document.getElementsByClassName('toast')[0];
const toastContent = document.getElementsByClassName('toast-content')[0];
const progress = document.getElementsByClassName('progress')[0];

const bookRead = id => {
  book = JSON.parse(localStorage.getItem('book'));
  book.map(item => {
    if (item.id === id) {
      item.read = true;
      item.isComplete = false;
      console.log(item);
    }
  });
  localStorage.setItem('book', JSON.stringify(book));
  reRender();
};

const bookUnread = id => {
  book = JSON.parse(localStorage.getItem('book'));
  book.map(item => {
    if (item.id === id) {
      console.log(item);
      item.read = false;
      item.isComplete = true;
    }
  });
  localStorage.setItem('book', JSON.stringify(book));
  reRender();
};

const deleteBook = id => {
  book = JSON.parse(localStorage.getItem('book'));
  book.map(item => {
    if (item.id === id) {
      book.splice(book.indexOf(item), 1);
    }
  });
  localStorage.setItem('book', JSON.stringify(book));
  reRender();
  toastContent.innerHTML = 'Buku berhasil dihapus';
  progress.classList.add('animate');
  toast.classList.add('animate-2');
  toast.classList.add('delete');
  setTimeout(() => {
    progress.classList.remove('animate');
    toast.classList.remove('animate-2');
    toast.classList.remove('delete');
  }, 4500);
};

const render = () => {
  if (localStorage.getItem('book') === null) {
    book = [];
  } else {
    book = JSON.parse(localStorage.getItem('book'));
    book.map(item => {
      if (item.read) {
        read.innerHTML += `<tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.year}</td>
          <td class='pointer' onclick='bookUnread(${item.id})' >
            <input type='checkbox' ${
              item.isComplete === false ? 'checked' : null
            } />
          </td>
          <td class='pointer' onclick='deleteBook(${item.id})'>
            <img src='./asset/trash.png' />
          </td>
          </tr>`;
      } else {
        unread.innerHTML += `<tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.year}</td>
          <td class='pointer' onclick='bookRead(${item.id})'>
          <input type='checkbox' ${item.isComplete === false ? 'checked' : null}
          </td>
          <td class='pointer' onclick='deleteBook(${item.id})'>
            <img src='./asset/trash.png' />
          </td>
      </tr>`;
      }
    });
  }
};

const reRender = () => {
  book = JSON.parse(localStorage.getItem('book'));
  setTimeout(() => {
    unread.innerHTML = '';
    read.innerHTML = '';
    render();
  }, 800);
};

document.addEventListener('DOMContentLoaded', e => {
  render();
});

const openModal = () => {
  modal[0].style.display = 'flex';
  idInput.value = Math.floor(Math.random() * 1000000000);
};

close.addEventListener('click', e => {
  modal[0].style.display = 'none';
});

const submitHandler = e => {
  e = e || window.event;
  e.preventDefault();
  if (localStorage.getItem('book') === null) {
    book = [];
    book.push({
      id: parseInt(e.target.id.value),
      title: e.target.title.value,
      author: e.target.author.value,
      year: e.target.year.value,
      read: false,
      isComplete: true,
    });
    localStorage.setItem('book', JSON.stringify(book));
    modal[0].style.display = 'none';
  } else {
    book = JSON.parse(localStorage.getItem('book'));
    book.push({
      id: parseInt(e.target.id.value),
      title: e.target.title.value,
      author: e.target.author.value,
      year: e.target.year.value,
      read: false,
      isComplete: true,
    });
    localStorage.setItem('book', JSON.stringify(book));
    modal[0].style.display = 'none';
  }
  reRender();
  toastContent.innerHTML = 'Buku berhasil ditambah';
  progress.classList.add('animate');
  toast.classList.add('animate-2');
  toast.classList.add('success');
  setTimeout(() => {
    progress.classList.remove('animate');
    toast.classList.remove('animate-2');
    toast.classList.remove('success');
  }, 4500);
};
