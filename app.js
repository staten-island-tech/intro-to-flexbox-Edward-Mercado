function inject_item(item) {
    DOMSelectors.display.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="market-item">
        <h2 class="market-item__title">${item.title}</h2>
        <div class="thin-horizontal-line"></div>
        <img
          src=${item.img_src}
          alt=${item.title}
          class="market-item__img"
        />
        <div class="thin-horizontal-line" id="market-item__bottom-line"></div>
        <div class="market-item__purchase">
          <p class="market-item__price-text"> ${item.price} </p>
          <button class="market-item__purchase-button">ADD TO CART</button>
        </div>
    </div>
    `
    )
} // the first argument is position, second is an f string w all your stuff

// make a list of all my stuff
// title img price
// loop through the array and then run that

const items = [
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
    {
        "title": "12 Pack Coke Zero",
        "price": "$14.99",
        "img_src": "coke-zero-pack.png",
    },
]