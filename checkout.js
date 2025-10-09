const checkoutButton = document.querySelector(".checkout__button");

function buyItems(itemsPurchased) {
    if (itemsPurchased.length === 0) {
        return
    }
    console.log(itemsPurchased);
}

checkoutButton.addEventListener("click", () => {
    buyItems(itemsPurchased);
})