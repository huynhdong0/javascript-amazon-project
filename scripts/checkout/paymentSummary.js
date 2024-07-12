import * as cartModule from '../../data/cart.js';
import * as productModule from '../../data/products.js';
import * as deliveryOptionModule from '../../data/deliveryOptions.js';
import * as UtilityModule from '../utils/money.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cartModule.cart.forEach((cartItem) => {
        const product = productModule.getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = deliveryOptionModule.getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    })
    const totalPriceBeforeTax = productPriceCents + shippingPriceCents;
    const totalPiceTaxCents = totalPriceBeforeTax * 0.1;
    const totalPriceCents = totalPriceBeforeTax + totalPiceTaxCents;
    
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>
            Items (3):
            </div>
            <div class="payment-summary-money">
            $${UtilityModule.formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>
            Shipping &amp; handling:
            </div>
            <div class="payment-summary-money">
            $${UtilityModule.formatCurrency(shippingPriceCents)}
            </div>  
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>
            Total before tax:
            </div>
            <div class="payment-summary-money">
            $${UtilityModule.formatCurrency(totalPriceBeforeTax)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>
            Estimated tax (10%):
            </div>
            <div class="payment-summary-money">
            $${UtilityModule.formatCurrency(totalPiceTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>
            Order total:
            </div>
            <div class="payment-summary-money">
            $${UtilityModule.formatCurrency(totalPriceCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}