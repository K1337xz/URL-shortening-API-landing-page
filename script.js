const shortUrlButton = document.querySelector(".shorturlButton");
const linkLists = document.querySelector(".shortenLinks");
const error = document.querySelector(".error");
let urlInput = document.querySelector(".urlInput");
//load api

async function loadApi() {
	let urlValue = urlInput.value;
	return (
		await fetch(`https://api.shrtco.de/v2/shorten?url=${urlValue}`)
	).json();
}

async function showShortUrl() {
	let data = [];
	try {
		if (!urlInput.value) {
			throw new TypeError("Please add a link");
		} else {
			data = await loadApi();
			error.style.display = `none`;
			urlInput.style.border = `none`;
		}
	} catch (e) {
		console.log(e);
		error.style.display = `flex`;
		urlInput.style.border = `2px solid red`;
		error.textContent = `${e.message}`;
	}
}

shortUrlButton.addEventListener("click", showShortUrl);
