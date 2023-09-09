export class Person {
    name;
    cpf;
    creditCard;
    pix;
    constructor(name, cpf) {
        this.name = name;
        this.cpf = cpf;
    }
    setCreditCard(number, cvv, expirationDate) {
        this.creditCard = new CreditCard(this.name, number, cvv, expirationDate);
    }
    getCreditCard() {
        return this.creditCard;
    }
    setPix(pixKey) {
        this.pix = new Pix(this.name, pixKey);
    }
    getPix() {
        return this.pix;
    }
}
class PaymentMethod {
    name;
    type;
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
class Pix extends PaymentMethod {
    key;
    constructor(name, key) {
        super(name, 'pix');
        this.key = key;
    }
}
class CreditCard extends PaymentMethod {
    number;
    cvv;
    expirationDate;
    constructor(name, number, cvv, expirationDate) {
        super(name, 'creditCard');
        this.number = number;
        this.cvv = cvv;
        this.expirationDate = expirationDate;
    }
}
const joseSilva = new Person('José Silva', '123.456.789-00');
joseSilva.setCreditCard('1234 5678 9012 3456', '969', '12/2024');
joseSilva.setPix('12345678900');
console.log(joseSilva);
class Product {
    name;
    price;
    stock;
    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    sell(quantity) {
        if (quantity > this.stock) {
            throw new Error('Insufficient stock');
        }
        this.stock -= quantity;
    }
    restock(quantity) {
        this.stock += quantity;
    }
}
const iPhone12 = new Product('IPhone 12', 10000, 10);
const graphicCard = new Product('NVIDIA', 7000, 10);
class cartProduct {
    product;
    quantity;
    price;
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.price * this.quantity;
    }
    addQuantity(quantity) {
        this.quantity += quantity;
        this.price = this.product.price * this.quantity;
    }
    removeQuantity(quantity) {
        this.quantity -= quantity;
        this.price = this.product.price * this.quantity;
    }
}
class Cart {
    id;
    customer;
    products = [];
    constructor(customer) {
        this.id = Math.floor(Math.random() * 1000);
        // this.id = uuidv4();
        this.customer = customer;
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(product) {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }
    plusProduct(product, quantity) {
        product.addQuantity(quantity);
    }
    minusProduct(product, quantity) {
        product.removeQuantity(quantity);
    }
    getProducts() {
        return this.products;
    }
    getTotal() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
const joseSilvaCart = new Cart(joseSilva);
const iPhone12CartProduct = new cartProduct(iPhone12, 2);
const graphicCardProduct = new cartProduct(graphicCard, 2);
joseSilvaCart.addProduct(iPhone12CartProduct);
joseSilvaCart.addProduct(graphicCardProduct);
console.log(joseSilvaCart, joseSilvaCart.getTotal());
class Checkout {
    cart;
    paymentMethod;
    paymentStatus;
    total;
    constructor(cart, paymentMethod) {
        this.cart = cart;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = 'pending';
        this.total = cart.getTotal();
    }
    pay() {
        if (!this.paymentMethod) {
            throw new Error('Payment method not found');
        }
        this.paymentStatus = 'paid';
        this.cart.getProducts().forEach(item => {
            item.product.sell(item.quantity);
        });
    }
}
const paymentMethod = (choice) => {
    if (choice === 'creditCard' && joseSilva.getCreditCard()) {
        return joseSilva.getCreditCard();
    }
    else if (choice === 'pix' && joseSilva.getPix()) {
        return joseSilva.getPix();
    }
};
// const joseSilvaPix = joseSilva.getPix()
// const checkoutPix = new Checkout(joseSilvaCart, paymentMethod('pix'));
// checkoutPix.pay();
const joseSilvaCreditCard = joseSilva.getCreditCard();
const checkoutCreditCard = new Checkout(joseSilvaCart, paymentMethod('creditCard'));
checkoutCreditCard.pay();
console.log(checkoutCreditCard, iPhone12, graphicCard);
