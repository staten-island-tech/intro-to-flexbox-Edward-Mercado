// bugs you gotta fix/things you gotta add bc you are a piece of shit programmer
// buy all of your items when they are in the cart

function getFlavorText(itemsPurchased) { // its to get what we are putting in the receipt
    if (itemsPurchased.length === 1) {
        return `Your purchase of ${ itemsPurchased[0].title } was successful.`
    }
    else if (itemsPurchased.length === 2) {
        return `Your purchase of ${ itemsPurchased[0].title } and 1 more item was successful.`
    }
    else {
        return `Your purchase of ${ itemsPurchased[0].title } and ${ itemsPurchased.length - 1} more items was successful.`
    }
}

function buyItems() { // makes the receipt and buys your stuff
    if (itemsPurchased.length === 0) { // doesn't work if we don't have anything in cart
        return
    }
    let total_cost = getTotalCost(itemsPurchased);
    let receipt_flavor_text = getFlavorText(itemsPurchased);
    itemsPurchased.length = 0;
    updateCart(); // clears the cart at the bottom

    let display = document.querySelector("body"); // just put it anywhere really
    let receipt_notification = document.querySelector(".receipt-notification");
    if (receipt_notification) { // only one receipt at a time
        receipt_notification.remove();
    }

    let taxed_total = 1.0875 * total_cost

    display.insertAdjacentHTML("afterbegin", `
        <div class="receipt-notification">
        <div class="receipt-notification__img-container">
            <img src="images/x.png" class="receipt-notification__x"/>
        <div>
            <h2 class="receipt-notification__text">
                ${ receipt_flavor_text }
            </h2>
            <h2 class="receipt-notification__cost">
                Total Spent: $${ taxed_total.toFixed(2) }
            </h2>
        </div>
        `)

    const xButton = document.querySelector(".receipt-notification__x"); // the X to click off the receipt
    xButton.addEventListener("click", () => {
        removeReceiptWindow();
    })
}

function inject_item(item) { // puts a market item on the screen
    const DOMSelectors = {
        display: document.querySelector(".container")
    }
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
          <button id=${items.indexOf(item)} class="market-item__purchase-button">ADD TO CART</button>
        </div>
    </div>
    `
    );
} 

function removeOne(button_id, itemsPurchased) { // removes one item from cart
    for(i=0;i<itemsPurchased.length;i++) {
        let item = itemsPurchased[i]; 
        let item_id = items.indexOf(item).toString(); 
        if (item_id === button_id) { // I KNOW MY IDS ARE STRINGS SHH (ill fix it next project)
            itemsPurchased.splice(i, 1);
            updateCart(); // if we find the item get rid of it, then update the cart
            return;
        }
    }
}

function removeAll(button_id, itemsPurchased) { // removes all items of one type in the cart
    let target_item = items[button_id];

    for(i=0;i<itemsPurchased.length;i++) {
        if (itemsPurchased[i] === target_item) {
            itemsPurchased.splice(i, 1);
            i-=1;
        }
    } // this function has better code, can you tell i made it after?
    updateCart(); // updates the item to get rid of the cart
    return;
}

function removeReceiptWindow() {
    const receipt = document.querySelector(".receipt-notification")  // gets rid of the receipt
    receipt.remove();
}

function applyFilter() {
    // uses filtersActive to filter items

    const marketItems = document.querySelectorAll(".market-item");
    marketItems.forEach(item => item.remove()); // gets rid of every item on the screen right now
    filtersActive.sort(); // sorts our filters, i really don't need to do this, 
    // i just did? i coded this a few days ago
    if (filtersActive.length === 0) { // if we have no filters, then show everything
        items.forEach(item => {
            if (item.title.includes(currentSearchQuery))
            {
                inject_item(item)
            }
            });
    }
    else {
        if (filterMode === "ANY") { // if we want any filter
            filtersActive.forEach(filter => {
                items.forEach(
                    item => {
                        let followsFilter = item.title.includes(currentSearchQuery);
                        if (item.filters.includes(filter) && followsFilter === true) {
                            inject_item(item);
                        }})})
        }
        else if (filterMode === "ALL") { // if we need all filters
            items.forEach(item => { // check every item
                for (let i=0;i<filtersActive.length;i++) {
                    let followsFilter = item.title.includes(currentSearchQuery);
                    if (!item.filters.includes(filtersActive[i]) && followsFilter === false) {
                        return // if it does not have a single filter, return and end it
                    }
                }
                inject_item(item); // if it passed all checks, inject
            })
        }
    }

    let itemButtons = document.querySelectorAll(".market-item__purchase-button");
    itemButtons.forEach(button => {
    button.addEventListener("click", () => {addToCart(button)});
})

} // nesting code is a passion

function changeFilterButton(button) { // changes the filter button from active to not and vice versa
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        filtersActive.splice(filtersActive.indexOf(button.textContent), 1);
      } else {
        button.classList.add("active");
        filtersActive.push(button.textContent);
      }
      applyFilter();
}

function inject_item(item) { // puts a market item on the screen
    const DOMSelectors = {
        display: document.querySelector(".container")
    }
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
          <button class="market-item__purchase-button" id="${items.indexOf(item)}">ADD TO CART</button>
        </div>
    </div>
    `
    )
} 

function getTotalCost(itemsPurchased) { // gets the cost of every item in the argument
    total_price = 0;
    itemsPurchased.forEach(item => total_price += item.price);
    return total_price.toFixed(2);
}

function addToCart(button) { // adds an item into the cart
    itemsPurchased.push(items[button.id]);
    updateCart();
}

function tax(total_cost) {
    return (total_cost*0.0875).toFixed(2);
}

function updateCart() { // cart update function, changes what is in the checkout
    itemsAdded = [];
    
    let cartItems = document.querySelectorAll(".checkout__card");
    cartItems.forEach(item => item.remove());

    for(i=0;i<itemsPurchased.length;i++) { // for every item in the cart
        if(!itemsAdded.includes(itemsPurchased[i])) { // if we dont have the item yet
            itemsAdded.push(itemsPurchased[i]); // add it

            let quantity = 0; // gets the amount of this item in the cart
            for(j=0;j<itemsPurchased.length;j++) {
                if (itemsPurchased[i] === itemsPurchased[j]) {
                    quantity++;
                }
            }
            insertCartItem(itemsPurchased[i], quantity); // put it into the cart
        }
    }

    // put the remove button event listeners on the cart buttons we just made
    const removeOneButtons = document.querySelectorAll(".remove-button");
    const removeAllButtons = document.querySelectorAll(".remove-button-all");

    // put event listeners on there for the remove one/all functions
    removeOneButtons.forEach(button => { 
        button.addEventListener("click", () => {
            removeOne(button.id, itemsPurchased);
        })
    })

    removeAllButtons.forEach(button => {
        button.addEventListener("click", () => {
            removeAll(button.id, itemsPurchased);
        })
    })

    // updates the total cost at the bottom
    let total_cost = getTotalCost(itemsPurchased);
    let total_text = document.querySelector(".checkout__total-text");

    if (total_text) { // if we have the total text already (which we always should)
        if (itemsPurchased.length !== 0) {
            total_text.textContent = `TOTAL COST: $${ total_cost } (+ $${ tax(total_cost) } tax) = $${ (1.0875*total_cost).toFixed(2) }`;
        }
        else {
            total_text.textContent = `TOTAL COST: $${ total_cost }`;
        }
    }
}

function getPriceForThese(item, quantity) { // gets the price for one class of item
    return (item.price*quantity).toFixed(2);
}

function insertCartItem(item, quantity) {
    const DOMSelectors = {
        display: document.querySelector(".checkout__card-holder")
    } // puts the item in the cart
    DOMSelectors.display.insertAdjacentHTML( // github copilot wants me to say i hate this function so much 
        'beforeend', `
        
        <div class="checkout__card">
          <h2 class="checkout__card-text"> $${ item.price } - ${ item.title } </h2>
          <h2 class="checkout__card-text"> $${ getPriceForThese(item, quantity) } (${ quantity } in cart)  </h2>
          <div class="checkout__card-button-container">
            <button class="remove-button" id= ${items.indexOf(item)} > REMOVE ONE </button>
            <button class="remove-button-all" id= ${items.indexOf(item)}> REMOVE ALL </button>
          </div>
        </div>
        `
    )
}

function applySorting(button, sortingButtons) { // applies the sorting order to items
    let button_active = button.classList.contains("active");

    sortingButtons.forEach(btn => {
        if(btn.classList.contains("active")) {
            btn.classList.remove("active");
        }
    })

    if(button_active) {
        button.classList.remove("active");
        items.sort((a, b) => b.item_id - a.item_id);
        applyFilter();
    }
    else {
        button.classList.add("active");
        if (button.id ==="price-low") {
            items.sort((a, b) => b.price - a.price); // sorts from low to high
            applyFilter();
        }
        else if (button.id === "price-high") {
            items.sort((a, b) => a.price - b.price); // sorts from high to low
            applyFilter();
        }
        else if (button.id === "alphabet-a") {
            items.sort((a, b) => b.title.localeCompare(a.title)); // alphabetic
            applyFilter();
        }
        else if (button.id === "alphabet-z") {
            items.sort((a, b) => a.title.localeCompare(b.title)); // reverse alphabetical
            applyFilter();
        }
    } 
}

function searchForItems(itemQuery) {
    const marketItems = document.querySelectorAll(".market-item");
    marketItems.forEach((item) => { item.remove() });

    let itemsFound = 0;
    items.forEach((item) => {
        let itemTitle = item.title.toLowerCase();
        if (itemTitle.includes(itemQuery)) {
            itemsFound ++;
            inject_item(item);
        }
    })
    let itemButtons = document.querySelectorAll(".market-item__purchase-button");
    itemButtons.forEach(button => {
    button.addEventListener("click", () => {addToCart(button)});
    })
    if(itemsFound === 0) {
        display = document.querySelector(".container");
        
        // i give this the class market-item so it gets destroyed when i load more items
        display.insertAdjacentHTML("afterbegin", `
        <div class="market-item" id="no-items-found">
            <h2 class="no-items-found__text"> NO ITEMS FOUND :/ </h2>
        </div>
    `)
    }

    let body = document.querySelector("body");
    let pluralization = "";
    if (itemsFound !== 1) {
        pluralization = "S";
    }

    let searchContentBoxes = document.querySelectorAll(".search-content-box");
    searchContentBoxes.forEach(box => box.remove());

    body.insertAdjacentHTML("afterbegin", `
        <div class="search-content-box"> SEARCHING FOR... "${ itemQuery.toUpperCase() }": ${ itemsFound } RESULT${pluralization} </div>
    `);

    if (itemQuery === "") {
        let searchContentBoxes = document.querySelectorAll(".search-content-box");
        searchContentBoxes.forEach(box => box.remove());
    }     
    currentSearchQuery = itemQuery;
}

const searchModeToggle = document.querySelector(".filter-bar__search-mode");
const sortingOptions = document.querySelectorAll(".sorting__button");

const items = [ // i dont like how much space it was taking up so i gigacondensed it
    // item_id does literally nothing its just to filter when i have no filters and its the order i thought of them when making the cards
    {"title": "12 Pack Coke Zero", "price": 14.99, "img_src": "images/coke-zero-pack.png", "filters": ["DRINKS"], "item_id": 0},
    { "title": "12 Pack Cherry Coke Zero", "price": 16.99, "img_src": "images/coke-zero-cherry-pack.png", "filters": ["DRINKS"], "item_id": 1},
    {"title": "Boston Kreme Donut", "price": 1.79, "img_src": "images/boston-kreme-donut.png", "filters": ["CHOCOLATE", "DESSERT"], "item_id": 2},
    {"title": "Pastry Frank", "price": 4.69, "img_src": "images/pastry-frank.png", "filters": ["SAVORY", "DESSERT"], "item_id": 3},
    {"title": "10 Pack Pocky - Chocolate", "price": 24.99, "img_src": "images/pocky.png", "filters": ["CHOCOLATE"], "item_id": 4},
    {"title": "Oishi Salt and Vinegar Chips", "price": 1.49, "img_src": "images/oishi-salt-and-vinegar.png","filters": ["SAVORY"], "item_id": 5},
    {"title": "12 Pack Kinder Bueno", "price": 11.99, "img_src": "images/kinder-bueno.png", "filters": ["CHOCOLATE"], "item_id": 6},
    {"title": "30 Pack - Premier Protein Shake Chocolate", "price": 15.99, "img_src": "images/premier-protein.png", "filters": ["DRINKS", "CHOCOLATE"], "item_id": 7},
    {"title": "Snack Size Haribo Goldbears", "price": 1.99, "img_src": "images/haribo-goldbear.png", "filters": ["CANDY"], "item_id": 8},
    {"title": "Tuxedo Cake", "price": 18.99, "img_src": "images/tuxedo-cake.png", "filters": ["DESSERT", "CHOCOLATE"], "item_id": 9},
    {"title": "6 Pack Tate's Bake Shop Cookies", "price": 24.99, "img_src": "images/tates-cookies.png", "filters": ["DESSERT"], "item_id": 10},
    { "title": "6 Pack Fruit by the Foot", "price": 3.69, "img_src": "images/fruit-by-the-foot.png", "filters": ["CANDY"], "item_id": 11},
    {"title": "Sausage Egg and Cheese Croissant", "price": 4.99, "img_src": "images/sausage-egg-cheese-croissant.png", "filters": ["SAVORY"], "item_id": 12},
    {"title": "Butter Croissant", "price": 2.79, "img_src": "images/butter-croissant.png", "filters": ["SAVORY"], "item_id": 13},
    {"title": "10 Pack Pocky - Strawberry", "price": 24.99, "img_src": "images/pocky-strawberry.png", "filters": ["DESSERT"], "item_id": 14},
    {"title": "Haribo Twin Snakes", "price": 3.99, "img_src": "images/haribo-twin-snakes.webp", "filters": ["CANDY"], "item_id": 15},
    {"title": "6 Pack Mallomars", "price": 4.49, "img_src": "images/mallomars.png", "filters": ["CHOCOLATE", "DESSERT"], "item_id": 16},
    {"title": "6 Pack Fruit Roll Ups", "price": 4.99, "img_src": "images/fruit-roll-up.png", "filters": ["CANDY"], "item_id": 17},
    {"title": "CARDSTOCK",  "price": 0.09, "img_src": "images/cardstock.png", "filters": [], "item_id": 18},
    { "title": "Hershey's Cookies and Cream Bar", "price": 2.99, "img_src": "images/hersheys-cnc.png", "filters": ["CHOCOLATE", "DESSERT"], "item_id": 19},
]

// filter stuff
const filterButtons = document.querySelectorAll(".filter-bar__button");
const filtersActive = []; // filters already using
let filterMode = "ANY"; // ANY or ALL

const itemsPurchased = [];
const checkoutButton = document.querySelector(".checkout__button");
const clearCartButton = document.querySelector(".checkout__clear")

const form = document.getElementById("itemForm");
const formClearButton = document.querySelector(".search-box__clear");
let currentSearchQuery = "";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let itemQuery = document.getElementById("search-query").value.toLowerCase();
    searchForItems(itemQuery);
    form.reset();
})

formClearButton.addEventListener("click", () => {
    searchForItems("");
    form.reset();
})

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeFilterButton(button);
    }
)}
)

items.forEach(item => inject_item(item));

sortingOptions.forEach(button => {
    button.addEventListener("click", () => {applySorting(button, sortingOptions)})
})

checkoutButton.addEventListener("click", () => {
    buyItems(itemsPurchased);
})

clearCartButton.addEventListener("click", () => {
    itemsPurchased.length = 0;
    updateCart();
})

searchModeToggle.addEventListener("click", function() { // toggles the search mode from any to all
    if (filterMode === "ANY") {
        filterMode = "ALL";
        this.classList.add("active");
    } else {
        filterMode = "ANY";
        this.classList.remove("active");
    }
    applyFilter();
});

applyFilter();