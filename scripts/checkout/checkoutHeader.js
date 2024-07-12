import { getTotalItems } from "../../data/cart.js";

export function renderCheckoutHeader() {
    const html = `
    Checkout (
        <a class="return-to-home-link" href="amazon.html">
            ${getTotalItems()} items
        </a>
    )
    `
    document.querySelector('.js-checkout-header').innerHTML = html;
}