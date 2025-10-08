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
        "title": "12 Pack Cherry Coke Zero",
        "price": "$16.99",
        "img_src": "coke-zero-cherry-pack.png",
    },
    {
        "title": "Boston Kreme Donut",
        "price": "$1.79",
        "img_src": "boston-kreme-donut.png",
    },
    {
        "title": "Pastry Frank",
        "price": "$4.69",
        "img_src": "pastry-frank.png",
    },
    {
        "title": "10 Pack Pocky - Chocolate",
        "price": "$24.99",
        "img_src": "pocky.png",
    },
    {
        "title": "Oishi Salt and Vinegar Chips",
        "price": "$1.49",
        "img_src": "oishi-salt-and-vinegar.png",
    },
    {
        "title": "12 Pack Kinder Bueno",
        "price": "$11.99",
        "img_src": "kinder-bueno.png",
    },
    {
        "title": "30 Pack - Premier Protein Shake Chocolate",
        "price": "$15.99",
        "img_src": "premier-protein.png",
    },
    {
        "title": "Snack Size Haribo Goldbears",
        "price": "$1.99",
        "img_src": "haribo-goldbear.png",
    },
    {
        "title": "Tuxedo Cake",
        "price": "$18.99",
        "img_src": "tuxedo-cake.png",
    },
    {
        "title": "6 Pack Tate's Bake Shop Cookies",
        "price": "$24.99",
        "img_src": "tates-cookies.png",
    },
    { 
        "title": "6 Pack Fruit by the Foot",
        "price": "$3.69",
        "img_src": "fruit-by-the-foot.png",
    },
    { // hi
        "title": "Sausage Egg and Cheese Croissant",
        "price": "$4.99",
        "img_src": "sausage-egg-cheese-crossaint.png",
    },
    {
        "title": "Butter Croissant",
        "price": "$2.79",
        "img_src": "butter-croissant.png",
    },
    {
        "title": "10 Pack Pocky - Strawberry",
        "price": "$24.99",
        "img_src": "pocky-strawberry.png",
    },
    {
        "title": "Haribo Twin Snakes",
        "price": "$3.99",
        "img_src": "haribo-twin-snakes.webp",
    },
    {
        "title": "6 Pack Mallomars",
        "price": "$4.49",
        "img_src": "mallomars.png",
    },
    {
        "title": "6 Pack Fruit Roll Ups",
        "price": "$4.99",
        "img_src": "fruit-roll-up.png",
    },
    {
        "title": "CARDSTOCK",
        "price": "$0.09",
        "img_src": "cardstock.png",
    },
    {
        "title": "Hershey's Cookies and Cream Bar",
        "price": "$2.99",
        "img_src": "hersheys-cnc.png",
    },
]

console.log(items.length)