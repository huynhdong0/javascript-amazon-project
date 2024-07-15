import * as orderSummaryModule from './checkout/orderSummary.js';
import * as paymentSummaryModule from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

// anonymnous function without name that can run multiple functions inside

loadProducts(() => {
    orderSummaryModule.renderOrderSummary();
    paymentSummaryModule.renderPaymentSummary();
});

