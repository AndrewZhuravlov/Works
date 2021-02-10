
const root = document.getElementById('root');
const storageBooks = getBooksFromStorage('books');
let addFlag = false;

sessionStorage.length===0 ? setToSessionStorage(storageBooks): '';

function setToSessionStorage(item) {
    sessionStorage.setItem('forSession',JSON.stringify(item));
}

function getFromSessionStorage(item) {
    return JSON.parse(sessionStorage.getItem(item));
}

function getBooksFromStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

root.insertAdjacentHTML('afterbegin', `
    <div class="container">
        <div class="list-wrap">
            <ul class="book-list">
            </ul>
        </div>
        <div class="dynamic-part-wrap"></div>
    </div>`);
const bookListUl = document.querySelector('.book-list');

function renderList() {
    bookListUl.innerHTML = '';
    getFromSessionStorage('forSession').forEach(item => {
        const { id, name } = item;
        bookListUl.insertAdjacentHTML('beforeend', `
        <li id="${id}" class="book">
            <a class="book-name" href="preview">${name}</a>
            <a class="edit-btn" href="edit">Edit</a>
        </li>`);
    });
}
renderList();

bookListUl.insertAdjacentHTML('beforeend', `<a class="add-btn">Add</a>`);
bookListUl.addEventListener('click', onListClick);

function onListClick(event) {
    const element = event.target;
    let id;

    try {
        id = element.closest('li').id;
    } catch (e) {
        console.log('add form init');
    }

    event.preventDefault();

    switch (element.className) {
        case 'book-name':
            showPreview(id);
            addFlag = false;
            break;
        case 'edit-btn':
            showEditForm(id, false);
            addFlag = false;
            break;
        case 'add-btn':
            showEditForm(null, true);
            addFlag = true;
            break;
        default: return;
    }

}

function showPreview(id) {
    urlCreator(id, 'preview');
    const forPreviewBook = getFromSessionStorage('forSession').find(item => item.id === +id);
    renderPreview(forPreviewBook, dynamicDiv);
}

const dynamicDiv = document.querySelector('.dynamic-part-wrap');
urlChecker(location.href);

function renderPreview({ name = '', author = '', plot = '', imageUrl = '' }, placeTo) {
    const regExp = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;
    const isValid = regExp.test(imageUrl);
    const defaultImage = 'https://bipbap.ru/wp-content/uploads/2017/06/1459703022_kniga2.jpg';
    
    dynamicDiv.innerHTML = '';
    placeTo.insertAdjacentHTML('beforeend', `
    <div class="preview">
        <img class="book-img" src="${isValid ? imageUrl : defaultImage}" alt="Book title picture">
        <div class="about-book">
        <p><span class="book-name">${name}</span></p>
        <p><span class="author">${author}</span></p>
        <p class="book-plot">${plot}</p>
        </div>
    </div>`);
}

function showEditForm(id, isAdd) {

    if (isAdd) {
        renderForm({}, dynamicDiv);
        urlCreator(null, 'add');
    } else {
        const forEditBook = getFromSessionStorage('forSession').find(item => item.id === +id);
        renderForm(forEditBook, dynamicDiv);
        urlCreator(id, 'edit');
    }

}

function renderForm({ id = '', name = '', author = '', plot = '', imageUrl = '' }, placeTo) {
    dynamicDiv.innerHTML = '';
    placeTo.insertAdjacentHTML('beforeend', `
    <form action="#" class="edit-form">
        <legend id="form-title"></legend>
        <div><input placeholder="Name" value="${name}" class="edit-inp" type="text" required></div>
        <div><input placeholder="Author" value="${author}" class="edit-inp" type="text" required></div>
        <div><input placeholder="Image URL" value="${imageUrl}" class="edit-inp" type="text" required></div>
        <div><textarea placeholder="Plot" id="myTextArea" cols="30" rows="10"></textarea></div>
        <div id = "edit-conformation">
        <input class="edit-btn" type="button" value="Save">
        <input class="add-btn" type="reset" value="Cancel">
        </div>
  </form>`);
    const formTitle = document.querySelector('#form-title');
    const editConformation = document.querySelector('#edit-conformation');
    const textArea = document.querySelector('#myTextArea');

    id || id === 0 ? formTitle.innerHTML = 'Make your edits!' : formTitle.innerHTML = 'Add new book!';

    textArea.innerHTML = plot;
    textArea.select();
    editConformation.addEventListener('click', e => {
        const element = e.target;

        switch (element.value) {
            case 'Save': saveChanges(id, textArea);
                break;
            case 'Cancel': discardChanges();
                break;
            default: return;
        }
    });
}

function saveChanges(id, textPlot) {
    const allEditInp = document.querySelectorAll('.edit-inp');
    const [name, author, image] = allEditInp;
    const storageBooks = getFromSessionStorage('forSession')
    const twoHun = 200;

    if (!addFlag) {
        storageBooks.map(item => {

            if (item.id === id) {
                item.name = name.value;
                item.author = author.value;
                item.imageUrl = image.value;
                item.plot = textPlot.value;

                return item;
            } else {

                return item;
            }

        });
    } else {
        const id = storageBooks.length;
        storageBooks.push({
            id: id,
            name: name.value,
            author:  author.value,
            imageUrl:  image.value,
            plot:  textPlot.value
        });
        setToSessionStorage(storageBooks)
        renderList();
        renderPreview(getFromSessionStorage('forSession').find(item => item.id === +id), dynamicDiv);
        setTimeout(alert('Book successfully added'), twoHun);
       
        return;
    }

    setToSessionStorage(storageBooks)
    renderPreview(storageBooks.find(item => item.id === +id), dynamicDiv);
    setTimeout(alert('Book successfully updated'), twoHun) ;
}

function discardChanges() {

    if (confirm('Discard changes?')) {
        history.back();
    } else {
        return;
    }
}

function urlCreator(id, actionStr) {
    
    if (id) {
        const newURl = location.protocol + '//' + location.host + location.pathname +
        `?id={${id}}` + `#${actionStr}`;
        history.pushState({ path: newURl }, null, newURl);
    } else {
        const newURl = location.protocol + '//' + location.host + location.pathname +
        `#${actionStr}`;
        history.pushState({ path: newURl }, null, newURl);
    }

}

function urlChecker(urla) {
    const five = 5;
    const url = new URL(urla);
    const id = url.search.charAt(five);

    switch(url.hash) {
        case '#preview' :
            renderPreview(getFromSessionStorage('forSession').find(item => item.id === +id), dynamicDiv);
            break;
        case '#edit' : 
            renderPreview(getFromSessionStorage('forSession').find(item => item.id === +id), dynamicDiv);
            break;
        case '#add' : 
            renderForm({}, dynamicDiv);
            break;
        default: return;
    }
}

window.addEventListener('popstate', ev => {
    urlChecker(ev.state.path);
});
