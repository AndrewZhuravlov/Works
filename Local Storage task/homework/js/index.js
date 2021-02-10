function visitLink(path) {
	const prevNumber = JSON.parse(localStorage.getItem(path));

	if (!prevNumber) {
		JSON.stringify(localStorage.setItem(path, 1));
	} else {
		JSON.stringify(localStorage.setItem(path, prevNumber + 1));
	};

};

function viewResults() {
	const container = document.querySelector('#content');
	const ul = document.createElement('ul');
	container.insertAdjacentElement('beforeend', ul);

	if (localStorage.length > 0) {
		for (let i = 1; i <= 3; i++) {
			let data = JSON.parse(localStorage.getItem(`Page${i}`));

			if (!data) {
				continue;
			};

			ul.insertAdjacentHTML('beforeend', `
				  <li>You visited Page${i}: ${data} time(s).</li>
			  `);
		};
		document.querySelector('button').disabled = true;
	} else {
		container.insertAdjacentHTML('beforeend', `<p>Sorry! No pages were visited!</p>`);
		document.querySelector('button').disabled = true;
	};

	localStorage.clear();
};
