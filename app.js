// bugs you gotta fix/things you gotta add bc you are a piece of shit programmer
// buy all of your items when they are in the cart

function getFlavorText(itemsPurchased) {
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

function buyItems() {
    if (itemsPurchased.length === 0) {
        return
    }
    let total_cost = getTotalCost(itemsPurchased);
    let receipt_flavor_text = getFlavorText(itemsPurchased);
    itemsPurchased.length = 0;
    updateCart();

    let display = document.querySelector("body");
    let receipt_notification = document.querySelector(".receipt-notification");
    if (receipt_notification) {
        receipt_notification.remove();
    }
    display.insertAdjacentHTML("afterbegin", `
        <div class="receipt-notification">
        <div class="receipt-notification__img-container">
            <img src="images/x.png" class="receipt-notification__x"/>
        <div>
            <h2 class="receipt-notification__text">
                ${ receipt_flavor_text }
            </h2>
            <h2 class="receipt-notification__cost">
                Total Spent: $${ total_cost }
            </h2>
        </div>
        `)

    const xButton = document.querySelector(".receipt-notification__x");
    xButton.addEventListener("click", () => {
        removeReceiptWindow();
    })
}

function inject_item(item) {
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

function removeOne(button_id, itemsPurchased) {
    for(i=0;i<itemsPurchased.length;i++) {
        let item = itemsPurchased[i];
        let item_id = items.indexOf(item).toString();
        if (item_id === button_id) {
            itemsPurchased.splice(i, 1);
            updateCart();
            return;
        }
    }
}

function removeAll(button_id, itemsPurchased) {
    let target_item = items[button_id];

    for(i=0;i<itemsPurchased.length;i++) {
        if (itemsPurchased[i] === target_item) {
            itemsPurchased.splice(i, 1);
            i-=1;
        }
    }
    updateCart();
    return;
}

function removeReceiptWindow() {
    const receipt = document.querySelector(".receipt-notification")
    receipt.remove();
}

function applyFilter() {
    // use filtersActive to filter items
    const marketItems = document.querySelectorAll(".market-item");
    marketItems.forEach(item => item.remove());
    filtersActive.sort();
    if (filtersActive.length === 0) {
        items.forEach(item => inject_item(item));
    }
    else {
        if (filterMode === "ANY") {
            filtersActive.forEach(filter => {
                items.forEach(
                    item => {
                        if (item.filters.includes(filter)) {
                            inject_item(item);
                        }})})
        }
        else if (filterMode === "ALL") {
            items.forEach(item => {
                for (let i=0;i<filtersActive.length;i++) {
                    if (!item.filters.includes(filtersActive[i])) {
                        return
                    }
                }
                inject_item(item);
            })
        }
    }
} // nesting code is a passion

function changeFilterButton(button) {
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        filtersActive.splice(filtersActive.indexOf(button.textContent), 1);
      } else {
        button.classList.add("active");
        filtersActive.push(button.textContent);
      }
      applyFilter();
}

function inject_item(item) {
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

function applyFilter() {
    // use filtersActive to filter items
    const marketItems = document.querySelectorAll(".market-item");
    marketItems.forEach(item => item.remove());
    filtersActive.sort();
    if (filtersActive.length === 0) {
        items.forEach(item => inject_item(item));
    }
    else {
        if (filterMode === "ANY") {
            filtersActive.forEach(filter => {
                items.forEach(
                    item => {
                        if (item.filters.includes(filter)) {
                            inject_item(item);
                        }})})
        }
        else if (filterMode === "ALL") {
            items.forEach(item => {
                for (let i=0;i<filtersActive.length;i++) {
                    if (!item.filters.includes(filtersActive[i])) {
                        return
                    }
                }
                inject_item(item);
            })
        }
    }

    let buttons = document.querySelectorAll(".market-item__purchase-button");
    buttons.forEach(button => {
    button.addEventListener("click", () => {addToCart(button)});
})
} // nesting code is a passion

function changeFilterButton(button) {
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        filtersActive.splice(filtersActive.indexOf(button.textContent), 1);
      } else {
        button.classList.add("active");
        filtersActive.push(button.textContent);
      }
      applyFilter();
}

function getTotalCost(itemsPurchased) {
    total_price = 0;
    itemsPurchased.forEach(item => total_price += item.price);
    return total_price.toFixed(2);
}

function addToCart(button) {
    itemsPurchased.push(items[button.id]);
    updateCart();
}

function updateCart() {
    itemsAdded = [];
    
    let cartItems = document.querySelectorAll(".checkout__card");
    cartItems.forEach(item => item.remove());

    for(i=0;i<itemsPurchased.length;i++) {
        if(!itemsAdded.includes(itemsPurchased[i])) {
            itemsAdded.push(itemsPurchased[i]);

            let quantity = 0;
            for(j=0;j<itemsPurchased.length;j++) {
                if (itemsPurchased[i] === itemsPurchased[j]) {
                    quantity++;
                }
            }
            insertCartItem(itemsPurchased[i], quantity);
        }
    }

    const removeOneButtons = document.querySelectorAll(".remove-button");
    const removeAllButtons = document.querySelectorAll(".remove-button-all");
    
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

    let total_cost = getTotalCost(itemsPurchased);
    let total_text = document.querySelector(".checkout__total-text");

    if (total_text) {
        total_text.textContent = `TOTAL COST: $${ total_cost }`;
    }
}

function getPriceForThese(item, quantity) {
    return (item.price*quantity).toFixed(2);
}

function insertCartItem(item, quantity) {
    const DOMSelectors = {
        display: document.querySelector(".checkout__card-holder")
    }
    DOMSelectors.display.insertAdjacentHTML(
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

function applySorting(button, sortingButtons) {
    sortingButtons.forEach(btn => {
        if(btn.classList.contains("active")) {
            btn.classList.remove("active");
        }
    })
    button.classList.add("active");
    
    if (button.id ==="price-low") {
        items.sort((a, b) => b.price - a.price);
        applyFilter();
    }
    else if (button.id === "price-high") {
        items.sort((a, b) => a.price - b.price);
        applyFilter();
    }
    else if (button.id === "alphabet-a") {
        items.sort((a, b) => b.title.localeCompare(a.title));
        applyFilter();
    }
    else if (button.id === "alphabet-z") {
        items.sort((a, b) => a.title.localeCompare(b.title));
        applyFilter();
    }
}

const searchModeToggle = document.querySelector(".filter-bar__search-mode");
const itemButtons = document.querySelectorAll(".market-item__purchase-button");
const sortingOptions = document.querySelectorAll(".sorting__button");

const items = [ // i dont like how much space it was taking up
    {"title": "12 Pack Coke Zero", "price": 14.99, "img_src": "images/coke-zero-pack.png", "filters": ["DRINKS"],},
    { "title": "12 Pack Cherry Coke Zero", "price": 16.99, "img_src": "images/coke-zero-cherry-pack.png", "filters": ["DRINKS"],},
    {"title": "Boston Kreme Donut", "price": 1.79, "img_src": "images/boston-kreme-donut.png", "filters": ["CHOCOLATE", "DESSERT"],},
    {"title": "Pastry Frank", "price": 4.69, "img_src": "images/pastry-frank.png", "filters": ["SAVORY", "DESSERT"],},
    {"title": "10 Pack Pocky - Chocolate", "price": 24.99, "img_src": "images/pocky.png", "filters": ["CHOCOLATE"],},
    {"title": "Oishi Salt and Vinegar Chips", "price": 1.49, "img_src": "images/oishi-salt-and-vinegar.png","filters": ["SAVORY"],},
    {"title": "12 Pack Kinder Bueno", "price": 11.99, "img_src": "images/kinder-bueno.png", "filters": ["CHOCOLATE"],},
    {"title": "30 Pack - Premier Protein Shake Chocolate", "price": 15.99, "img_src": "images/premier-protein.png", "filters": ["DRINKS", "CHOCOLATE"],},
    {"title": "Snack Size Haribo Goldbears", "price": 1.99, "img_src": "images/haribo-goldbear.png", "filters": ["CANDY"],},
    {"title": "Tuxedo Cake", "price": 18.99, "img_src": "images/tuxedo-cake.png", "filters": ["DESSERT", "CHOCOLATE"],},
    {"title": "6 Pack Tate's Bake Shop Cookies", "price": 24.99, "img_src": "images/tates-cookies.png", "filters": ["DESSERT"],},
    { "title": "6 Pack Fruit by the Foot", "price": 3.69, "img_src": "images/fruit-by-the-foot.png", "filters": ["CANDY"],},
    {"title": "Sausage Egg and Cheese Croissant", "price": 4.99, "img_src": "images/sausage-egg-cheese-croissant.png", "filters": ["SAVORY"],},
    {"title": "Butter Croissant", "price": 2.79, "img_src": "images/butter-croissant.png", "filters": ["SAVORY"],},
    {"title": "10 Pack Pocky - Strawberry", "price": 24.99, "img_src": "images/pocky-strawberry.png", "filters": ["DESSERT"],},
    {"title": "Haribo Twin Snakes", "price": 3.99, "img_src": "images/haribo-twin-snakes.webp", "filters": ["CANDY"],},
    {"title": "6 Pack Mallomars", "price": 4.49, "img_src": "images/mallomars.png", "filters": ["CHOCOLATE", "DESSERT"],},
    {"title": "6 Pack Fruit Roll Ups", "price": 4.99, "img_src": "images/fruit-roll-up.png", "filters": ["CANDY"],},
    {"title": "CARDSTOCK",  "price": 0.09, "img_src": "images/cardstock.png", "filters": [],},
    { "title": "Hershey's Cookies and Cream Bar", "price": 2.99, "img_src": "images/hersheys-cnc.png", "filters": ["CHOCOLATE", "DESSERT"],},
]
const filterButtons = document.querySelectorAll(".filter-bar__button");
const filtersActive = []
let filterMode = "ANY"; // ANY or ALL

const itemsPurchased = [];
const clearButton = document.querySelector(".checkout__clear")
const checkoutButton = document.querySelector(".checkout__button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeFilterButton(button);
    }
)}
)

items.forEach(item => inject_item(item));
itemButtons.forEach(button => {
    button.addEventListener("click", () => {addToCart(button)})
})

sortingOptions.forEach(button => {
    button.addEventListener("click", () => {applySorting(button, sortingOptions)})
})


checkoutButton.addEventListener("click", () => {
    buyItems(itemsPurchased);
})

clearButton.addEventListener("click", () => {
    itemsPurchased.length = 0;
    updateCart();
})

searchModeToggle.addEventListener("click", function() {
    if (filterMode === "ANY") {
        filterMode = "ALL";
        this.classList.add("active");
    } else {
        filterMode = "ANY";
        this.classList.remove("active");
    }
    applyFilter();
});

applyFilter(); // i dunno there's a bug where buttons don't add to cart until you put a filter
// so i just have that here now (it doens't do anything except putting a filter that already exists)