const shortUrlButton = document.querySelector(".shorturlButton");
const linkLists = document.querySelector(".shortenLinks");
const error = document.querySelector(".error");
let urlInput = document.querySelector(".urlInput");
const openMobile = document.querySelector(".openMobileMenu");
const closeMobile = document.querySelector(".closeMobile");
const mobileMen = document.querySelector(".mobileMen");
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
			//create li,span elements
			const myLi = document.createElement("li");
			const span = document.createElement("span");
			const input = document.createElement("input");
			let code = data.result.code;
			span.classList.add("shortLink");
			input.classList.add("copyButton");
			input.setAttribute("type", "button");
			input.setAttribute("onclick", "copyUrl(this.id)");
			input.setAttribute(`id`, `${code}`);
			input.value = `Copy!`;
			urlInput.value = ``;
			//add value from Api
			myLi.innerHTML = data.result.original_link;
			span.innerHTML = data.result.short_link;
			//display create elements
			linkLists.appendChild(myLi);
			myLi.appendChild(span);
			span.appendChild(input);
		}
	} catch (e) {
		console.log(e);
		error.style.display = `flex`;
		urlInput.style.border = `2px solid red`;
		error.textContent = `${e.message}`;
	}
}

//copy to clipboard
function copyUrl(id) {
	//get clicked input id
	let clickedBtn = document.getElementById(id);
	//copy to clipboard
	clickedBtn.classList.add("copied");
	clickedBtn.value = `Copied!`;
	navigator.clipboard.writeText(clickedBtn.parentNode.textContent);
}
//open Mobile
openMobile.addEventListener("click", () => {
	mobileMen.style.display = `flex`;
});

closeMobile.addEventListener("click", () => {
	mobileMen.style.display = `none`;
});

shortUrlButton.addEventListener("click", showShortUrl);
