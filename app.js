
const items = [
    {
        "title": "12 Pack Coke Zero",
        "price": 14.99,
        "img_src": "coke-zero-pack.png",
        "filters": ["DRINKS"],
    },
    {
        "title": "12 Pack Cherry Coke Zero",
        "price": 16.99,
        "img_src": "coke-zero-cherry-pack.png",
        "filters": ["DRINKS"],
    },
    {
        "title": "Boston Kreme Donut",
        "price": 1.79,
        "img_src": "boston-kreme-donut.png",
        "filters": ["CHOCOLATE", "DESSERT"],
    },
    {
        "title": "Pastry Frank",
        "price": 4.69,
        "img_src": "pastry-frank.png",
        "filters": ["SAVORY", "DESSERT"],
    },
    {
        "title": "10 Pack Pocky - Chocolate",
        "price": 24.99,
        "img_src": "pocky.png",
        "filters": ["CHOCOLATE"],
    },
    {
        "title": "Oishi Salt and Vinegar Chips",
        "price": 1.49,
        "img_src": "oishi-salt-and-vinegar.png",
        "filters": ["SAVORY"],
    },
    {
        "title": "12 Pack Kinder Bueno",
        "price": 11.99,
        "img_src": "kinder-bueno.png",
        "filters": ["CHOCOLATE"],
    },
    {
        "title": "30 Pack - Premier Protein Shake Chocolate",
        "price": 15.99,
        "img_src": "premier-protein.png",
        "filters": ["DRINKS", "CHOCOLATE"],
    },
    {
        "title": "Snack Size Haribo Goldbears",
        "price": 1.99,
        "img_src": "haribo-goldbear.png",
        "filters": ["CANDY"],
    },
    {
        "title": "Tuxedo Cake",
        "price": 18.99,
        "img_src": "tuxedo-cake.png",
        "filters": ["DESSERT", "CHOCOLATE"],
    },
    {
        "title": "6 Pack Tate's Bake Shop Cookies",
        "price": 24.99,
        "img_src": "tates-cookies.png",
        "filters": ["DESSERT"],
    },
    { 
        "title": "6 Pack Fruit by the Foot",
        "price": 3.69,
        "img_src": "fruit-by-the-foot.png",
        "filters": ["CANDY"],
    },
    {
        "title": "Sausage Egg and Cheese Croissant",
        "price": 4.99,
        "img_src": "sausage-egg-cheese-croissant.png",
        "filters": ["SAVORY"],
    },
    {
        "title": "Butter Croissant",
        "price": 2.79,
        "img_src": "butter-croissant.png",
        "filters": ["SAVORY"],
    },
    {
        "title": "10 Pack Pocky - Strawberry",
        "price": 24.99,
        "img_src": "pocky-strawberry.png",
        "filters": ["DESSERT"],
    },
    {
        "title": "Haribo Twin Snakes",
        "price": 3.99,
        "img_src": "haribo-twin-snakes.webp",
        "filters": ["CANDY"],
    },
    {
        "title": "6 Pack Mallomars",
        "price": 4.49,
        "img_src": "mallomars.png",
        "filters": ["CHOCOLATE", "DESSERT"],
    },
    {
        "title": "6 Pack Fruit Roll Ups",
        "price": 4.99,
        "img_src": "fruit-roll-up.png",
        "filters": ["CANDY"],
    },
    {
        "title": "CARDSTOCK",
        "price": 0.09,
        "img_src": "cardstock.png",
        "filters": [],
    },
    {
        "title": "Hershey's Cookies and Cream Bar",
        "price": 2.99,
        "img_src": "hersheys-cnc.png",
        "filters": ["CHOCOLATE", "DESSERT"],
    },
]
const filterButtons = document.querySelectorAll(".filter-bar__button");
const filtersActive = []
let filterMode = "ANY"; // ANY or ALL

const itemsPurchased = [];

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
    )
} 

function removeOne(button, itemsPurchased) {
    for(i=0;i<itemsPurchased.length;i++) {
        item = itemsPurchased[i];
        if (items.indexOf(item) === button.id) {
            itemsPurchased.splice(i, 1);
            return;
        }
    }
}

function removeAll(button, itemsPurchased) {
    for(i=0;i<itemsPurchased.length;i++) {
        item = itemsPurchased[i];
        if (items.indexOf(item) === button.id) {
            itemsPurchased.splice(i, 1);
        }
    }
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
items.forEach(item => inject_item(item));

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

function addToCart(button) {
    itemsPurchased.push(items[button.id]);
    updateCart();
}

function updateCart() {
    itemsAdded = []
    for(i=0;i<itemsPurchased.length;i++) {
        if(!itemsAdded.includes(itemsPurchased[i])) {
            itemsAdded.push(itemsPurchased[i]);

            
            let quantity = 0;
            for(j=0;j<itemsPurchased.length;j++) {
                if (itemsPurchased[i] === itemsPurchased[j]) {
                    quantity++;
                }
            }
            insertCartitem(itemsPurchased[i], quantity)
        }
    }
}

function insertCartItem(item, quantity) {
    const DOMSelectors = {
        display: document.querySelector(".checkout")
    }
    DOMSelectors.display.insertAdjacentHTML(
        'afterbegin', `
        asdf
        `
    )
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeFilterButton(button)
    }
)}
)

const searchModeToggle = document.querySelector(".filter-bar__search-mode");
const itemButtons = document.querySelectorAll(".market-item__purchase-button");


itemButtons.forEach(button => {
    button.addEventListener("click", () => {addToCart(button)})
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