import * as cartModule from '../data/cart.js';
import * as productModule from '../data/products.js';
import * as utilityModule from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import * as deliveryOptionModule from '../data/deliveryOptions.js';

console.log(dayjs().add(7,'days').format('YYYY, dddd, MMMM D '));

let cartItemContainerHTML = '';
cartModule.cart.forEach( (cartItem) => {
    let matchingProduct;
    productModule.products.forEach( (product) => {
    if (product.id == cartItem.productId) {
        matchingProduct = product;
    }
    }); 

    let deliveryOption;
    deliveryOptionModule.deliveryOptions.forEach( (option) => {
        if (option.id == cartItem.deliveryOptionId){
            deliveryOption = option;
        }
    });

    cartItemContainerHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${generateDateString(deliveryOption)}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${utilityModule.formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link"
                                data-product-id ="${matchingProduct.id}">
                        Update 
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="text">
                    <span class="save-quantity-link link-primary js-save-quantity-link"
                                data-product-id ="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                                data-product-id ="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(matchingProduct,cartItem)}
                </div>
            </div>
        </div>`;
});
document.querySelector('.order-summary').innerHTML = cartItemContainerHTML;

cartModule.updateCartQuantity('js-return-to-home-link','items');

// delete item from cart
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cartModule.removeCartItem(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    })
   
})


document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter'){
                const newQuantity = Number(inputElement.value);
                if (newQuantity >= 0 && newQuantity < 1000){
                    cartModule.updateQuantity(productId,newQuantity);
                    document.querySelector(`.js-quantity-input-${productId}`).value = '';
                    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
                }
            }
        })
    });
})

document.querySelectorAll('.js-save-quantity-link').forEach( (link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if (newQuantity >= 0 && newQuantity < 1000){
            cartModule.updateQuantity(productId,newQuantity);
            document.querySelector(`.js-quantity-input-${productId}`).value = '';
        }
    })
})

function generateDateString(deliveryOption) {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    return deliveryDate.format('dddd, MMMM D');
}

function deliveryOptionHTML(matchingProduct, cartItem) {
    let html ='';
    deliveryOptionModule.deliveryOptions.forEach((deliveryOption) => {

        const priceString = deliveryOption.priceCents == 0 ? 'FREE' 
        : `$${utilityModule.formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id == cartItem.deliveryOptionId;

        html += `
            <div class="delivery-option js-delivery-option"
                        data-product-id = "${matchingProduct.id}"
                        data-delivery-option-id ="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${generateDateString(deliveryOption)}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
            </div>`
    });
    return html;
}

document.querySelectorAll('.js-delivery-option').forEach((element) =>{
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        cartModule.updateDeliveryOption(productId, deliveryOptionId);
    })
})