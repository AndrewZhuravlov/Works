const data = [
	{
		'folder': true,
		'title': 'Grow',
		'children': [
			{
				'title': 'logo.png'
			},
			{
				'folder': true,
				'title': 'English',
				'children': [
					{
						'title': 'Present_Perfect.txt'
					}
				]
			}
		]
	},
	{
		'folder': true,
		'title': 'Soft',
		'children': [
			{
				'folder': true,
				'title': 'NVIDIA',
				'children': null
			},
			{
				'title': 'nvm-setup.exe'
			},
			{
				'title': 'node.exe'
			}
		]
	},
	{
		'folder': true,
		'title': 'Doc',
		'children': [
			{
				'title': 'project_info.txt'
			}
		]
	},
	{
		'title': 'credentials.txt'
	}
];

const rootNode = document.getElementById('root');
const container = document.createElement('div');
rootNode.appendChild(container);
container.className = 'container';
const mainTreeElements = [];
let targetForContextClick = null;

container.insertAdjacentHTML('beforeend', `
	<ul id="context-menu" class="context my-ul">
		<li class="menu-item rename">Rename</li>
		<li class="menu-item delete">Delete</li>
	</ul>
	<div id="out-of-click" class="out"></div>`);
const context_menu = document.querySelector('#context-menu');
const outOfClick = document.querySelector('#out-of-click');
outOfClick.addEventListener('click', outClick)

function outClick() {
	context_menu.classList.remove('show');
	outOfClick.style.display = 'none';
}

function renderTree(array, uniqueString, placeToPaste, displayType, hover) {
	const createdUl = document.createElement('ul');
	placeToPaste.appendChild(createdUl);
	createdUl.className = 'my-ul';
	createdUl.classList.add(`${displayType}`)

	if (array === null) {
		createdUl.insertAdjacentHTML('beforeend', `
			<li class="its-empty">Folder is empty</li>`)
	} else {
		array.forEach((item, i) => {

			if (item.folder) {
				createdUl.insertAdjacentHTML('beforeend', `
			<li id ='${uniqueString}-tree-${i}' class="folder-wrap ${hover}">
			  <span class="material-icons folder-icon folder">folder</span>
			  <span class="item-text">${item.title}</span>
			</li>`);
			} else {
				createdUl.insertAdjacentHTML('beforeend', `
			<li id ='${uniqueString}-tree-${i}' class="file-wrap">
			  <span class="material-icons file">insert_drive_file</span>
			  <span class="item-text file-text">${item.title}</span>
			</li>`);
			}

		});
	}
}

renderTree(data, 'main', container, 'd-block');
const four = 4;
const two = 2
for (let i = 0; i < four; i++) {
	mainTreeElements.push(document.querySelector(`#main-tree-${i}`));
}

renderTree(data[0].children, 'growChild', mainTreeElements[0], 'd-none');
const growChild_1 = document.getElementById('growChild-tree-1');
renderTree(data[0].children[1].children, 'englishChild', growChild_1, 'd-none');
renderTree(data[1].children, 'softChild', mainTreeElements[1], 'd-none');
const softChild_0 = document.getElementById('softChild-tree-0');
renderTree(data[1].children[0].children, 'nvidiaChild', softChild_0, 'd-none');
renderTree(data[two].children, 'docChild', mainTreeElements[two], 'd-none');

const allLi = document.querySelectorAll('li');

allLi.forEach(el => {

	if (!el.classList.contains('file-wrap')) {
		el.addEventListener('click', onLeftClickVisualChanging);
	} 
	el.addEventListener('contextmenu', onRightClick);
});

function onLeftClickVisualChanging(ev) {
	const element = ev.currentTarget.lastChild;
	const folder = ev.currentTarget.firstElementChild;
	ev.stopPropagation();
	
	if (ev.target.classList.contains('file-text')) {

		return
	}

	if (ev.target.classList.contains('rename') &&
		targetForContextClick.classList.contains('item-text')) {
		outClick();
		rename();
	} else if (ev.target.classList.contains('delete')) {
		outClick();
		deleteItem();
	} else if (ev.target.tagName === 'INPUT') {

		return;
	} else {		
		try {

			if (element.classList.contains('d-none')) {
				element.classList.remove('d-none');
				element.classList.add('d-block');
			} else if (element.classList.contains('d-block')) {
				element.classList.remove('d-block');
				element.classList.add('d-none');
			}

			if (folder.textContent === 'folder') {
				folder.textContent = 'folder_open';
			} else {
				folder.textContent = 'folder';
			}

		} catch (e) {

			return;
		}
	}
}

function onRightClick(ev) {
	ev.preventDefault();
	context_menu.style.top = `${ev.clientY}px`;
	context_menu.style.left = `${ev.clientX}px`;
	context_menu.classList.add('show');
	outOfClick.style.display = 'block';
	targetForContextClick = ev.target;
}

function rename() {
	const inp = document.createElement('input');
	const contextLi = targetForContextClick.closest('li');
	const folder = contextLi.firstElementChild;
	folder.remove();
	let itemTitle = targetForContextClick.textContent;
	inp.value = itemTitle;
	targetForContextClick.style.display = 'none';	
	contextLi.insertAdjacentElement('afterbegin', inp);
	contextLi.insertAdjacentElement('afterbegin', folder);
	inp.focus();
	inp.select();

	if(contextLi.classList.contains('file-wrap')) {
		inp.setSelectionRange(0, inp.value.length - four);
	}
	
	outOfClick.style.display = 'block';
	
	inp.onblur = () => {
		targetForContextClick.textContent = inp.value;
		outOfClick.style.display = 'none';
		inp.remove();
		targetForContextClick.style.display = 'inline-block';
	}
}

function deleteItem() {
	const closesLi = targetForContextClick.closest('li');
	const closesUl = targetForContextClick.closest('ul');
	closesLi.remove();

	if (closesUl.childElementCount === 0) {
		closesUl.insertAdjacentHTML('beforeend', `
			<li class="its-empty">Folder is empty</li>`);
	}
}