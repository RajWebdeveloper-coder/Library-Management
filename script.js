let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('loadingSpinner');

function createAndAppendTodo(books) {
    searchResultsEl.textContent = "";

    if (books.length === 0) {
        let notFoundMsg = document.createElement('h3');
        notFoundMsg.textContent = "No result Found 😢";
        notFoundMsg.classList.add('text-center', 'mt-3');
        searchResultsEl.appendChild(notFoundMsg);
        return;
    }

    let heading = document.createElement('h2');
    heading.classList.add('p-2', 'text-muted');
    heading.textContent = "Popular Books";
    searchResultsEl.appendChild(heading);

    let rowEl = document.createElement('div');
    rowEl.classList.add('row');
    searchResultsEl.appendChild(rowEl);

    //for of looping use
    for (let book of books) {

        let colEl = document.createElement('div');
        colEl.classList.add('col-6', 'col-md-6', 'col-lg-3',);
        rowEl.appendChild(colEl);

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('p-2');
        colEl.appendChild(contentContainer);

        let imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-container', 'mb-3');
        contentContainer.appendChild(imageWrapper);

        let imageElement = document.createElement('img');
        imageElement.src = book.imageLink;
        imageElement.alt = book.title;
        imageElement.classList.add('books-image', 'mb-3');
        imageWrapper.appendChild(imageElement);

        let booksName = document.createElement('p');
        booksName.textContent = book.author;
        booksName.classList.add('fs-6');
        contentContainer.appendChild(booksName);
    }
}

function fetchData(event) {
    if (event.key === "Enter") {
        let query = searchInputEl.value;
        if (query === "") {
            searchResultsEl.textContent = "Please enter a book title";
        }
        spinnerEl.classList.remove("d-none");
        searchResultsEl.innerHTML = "";

        let urlEl = "https://apis.ccbp.in/book-store?title=" + query;
        fetch(urlEl)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                spinnerEl.classList.add('d-none');
                createAndAppendTodo(jsonData.search_results);
            });
    }
}

searchInputEl.addEventListener('keydown', fetchData);