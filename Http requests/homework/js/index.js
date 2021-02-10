const mySpinner = spinner('lightgrey', '120px', '120px');
const myUl = document.querySelector('.user-list');
const display = document.querySelector('#display');
const state = {
    users: null,
    posts: null
}

const placeholderServices = {
    async getData(url, render) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${url}`);
            const data = await response.json();
            state.users = data;
            setTimeout(() => {
                render(data);
            }, 1000);

        } catch (e) {
            console.log(`Ups!!! Something went wrong :( ${e.message}`);
        }

    },

    async sendUser(data) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
        } catch (e) {
            alert(e.message);
        }
    },

    async deleteUser(id) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.log(e.message);
        }
    },

    async getPosts() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
            const result = await response.json();
            state.posts = result;
        }catch(e) {
            console.log(e.message);
        }
    }
}

const render = {
    usersList(data) {
        document.querySelector('.loader').remove();
        data.forEach(element => {
            myUl.insertAdjacentHTML('beforeend', `
        <li id="${element.id}" class="user">
            <span class='user-name'>${element.name}</span>
            <a href="#" class="edit">EDIT</a> or 
            <a href="#" class="delete">DELETE</a>
        </li>`
            );
        });
    },

    editUser(id) {
        display.innerHTML = '';
        const user = state.users.find(item => item.id === +id);
        this._form(user);
        display.insertAdjacentHTML('beforeend', `
       <div id="manage-btn" data-userID =${id}>
        <a class="confirm" href="#">CONFIRM</a>
        <a class="cancel" href="#">CANCEL</a>
       </div>
       `);
        const manageBtn = document.getElementById('manage-btn');
        manageBtn.addEventListener('click', ev => manageEditForm(ev, manageBtn));
    },

    posts(id) {
       display.innerHTML = '';
       const usersPosts = state.posts.filter(item => item.userId === +id);
       const ul = document.createElement('ul');
       
       display.appendChild(ul);
       usersPosts.forEach(item => {
           ul.insertAdjacentHTML('beforeend', `
           <li>
                <p>${item.title}</p>
                <p>${item.body}</p>
           </li>
           `)
       }) 
    },

    _form(data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                if (typeof element !== 'object' && key !== 'id') {
                    display.insertAdjacentHTML('beforeend', `
                    <fieldset  class="inp-field">
                        <span>${key}</span>
                        <input  type="text" value="${element}">
                    </fieldset>
                    `);
                } else if (typeof element === 'object') {
                    this._form(element);
                }
            }
        }
    }
}

myUl.insertAdjacentElement('afterbegin', mySpinner);
placeholderServices.getData('users', render.usersList);
placeholderServices.getPosts();
myUl.addEventListener('click', ev => {
    ev.preventDefault();
    const element = ev.target
    const li = element.closest('li');

    switch (element.className) {
        case 'edit': render.editUser(li.id);
            break;
        case 'delete': placeholderServices.deleteUser(li.id);
                       li.remove();
            break;
        case 'user-name': render.posts(li.id);       
            break;
        default: return;
    }
});

function spinner(borderColor, width, height) {
    const div = document.createElement('div');
    div.className = 'loader';
    div.style.border = `16px solid ${borderColor}`;
    div.style.borderRadius = '50%';
    div.style.borderTop = '16px solid #3498db';
    div.style.width = width;
    div.style.height = height;
    div.style.animation = 'spin 2s linear infinite';

    return div;
}

function manageEditForm(ev, manageBlock) {
    const element = ev.target;

    if (element.className === 'confirm') {
        collectData(manageBlock.dataset.userid)
    } else if (element.className === 'cancel') {
        display.innerHTML = '';
    }
    return;
}

function collectData(personID) {
    const nodeCollection = document.querySelectorAll('.inp-field');
    const updated = {
        id: personID,
        address: { geo: {} },
        company: {}
    }
    const addressField = ['street', 'suite', 'zipcode', 'city'];
    const geoField = ['lat', 'lng'];
    const companyField = ['catchPhrase', 'bs', 'name'];

    nodeCollection.forEach(item => {
        const key = item.firstElementChild.textContent;
        const value = item.lastElementChild.value;

        if (addressField.includes(key)) {
            updated.address[key] = value;
        } else if (geoField.includes(key)) {
            updated.address.geo[key] = value;
        } else if (companyField.includes(key)) {
            updated.company[key] = value;
        } else {
            updated[key] = value;
        }

    });

    placeholderServices.sendUser(updated);
    display.innerHTML = '';
    showSpinner();
}
function showSpinner() {
    display.appendChild(mySpinner);
    setTimeout(() => document.querySelector('.loader').remove(), 1000);
}