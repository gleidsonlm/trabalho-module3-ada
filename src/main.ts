export interface IPerson {
    name: string;
    cpf: string;
}

export class Person implements IPerson {
    name: string;
    cpf: string;
    private creditCard: CreditCard | undefined;
    private pix: Pix | undefined;

    constructor(name: string, cpf: string) {
        this.name = name;
        this.cpf = cpf;
    }

    setCreditCard(number: string, cvv: string, expirationDate: string) {
        this.creditCard = new CreditCard(this.name, number, cvv, expirationDate);
    }

    getCreditCard() {
        return this.creditCard;
    }

    setPix(pixKey: string) {
        this.pix = new Pix(this.name, pixKey);
    }

    getPix() {
        return this.pix;
    }
}

class PaymentMethod {
    name: string;
    type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }
}

class Pix extends PaymentMethod {
    key: string;

    constructor(name: string, key: string) {
        super(name, 'pix');
        this.key = key;
    }
}

class CreditCard extends PaymentMethod {
    number: string;
    cvv: string;
    expirationDate: string;

    constructor(name: string, number: string, cvv: string, expirationDate: string) {
        super(name, 'creditCard');
        this.number = number;
        this.cvv = cvv;
        this.expirationDate = expirationDate;
    }
}

const joseSilva = new Person('José Silva', '123.456.789-00');
joseSilva.setCreditCard('1234 5678 9012 3456','969','12/2024');
joseSilva.setPix('12345678900');
console.log(joseSilva)

class Product {
    name: string;
    price: number;
    stock: number;

    constructor(name: string, price: number, stock: number) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    sell(quantity: number) {
        if (quantity > this.stock) {
            throw new Error('Insufficient stock');
        }
        this.stock -= quantity;
    }

    restock(quantity: number) {
        this.stock += quantity;
    }
}

const iPhone12 = new Product('IPhone 12', 10000, 10);
const graphicCard = new Product('NVIDIA', 7000, 10);

class cartProduct {
    product: Product;
    quantity: number;
    price: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.price * this.quantity
    }

    addQuantity(quantity: number) {
        this.quantity += quantity;
        this.price = this.product.price * this.quantity
    }

    removeQuantity(quantity: number) {
        this.quantity -= quantity;
        this.price = this.product.price * this.quantity
    }
}

class Cart {
    id: number;
    customer: Person;
    products: cartProduct[] = [];

    constructor(customer:Person) {
        this.id = Math.floor(Math.random() * 1000);
        // this.id = uuidv4();
        this.customer = customer;
    }

    addProduct(product: cartProduct) {
        this.products.push(product);
    }

    removeProduct(product: cartProduct) {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }

    plusProduct(product: cartProduct, quantity: number) {
        product.addQuantity(quantity);
    }

    minusProduct(product: cartProduct, quantity: number) {
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

console.log(joseSilvaCart,joseSilvaCart.getTotal());

class Checkout {
    cart: Cart;
    paymentMethod: PaymentMethod | undefined;
    paymentStatus: string;
    total: number;

    constructor(cart: Cart, paymentMethod: PaymentMethod| undefined) {
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

const paymentMethod = (choice: string) => { 
    if (choice === 'creditCard' && joseSilva.getCreditCard()) {
        return joseSilva.getCreditCard()
    } else if (choice === 'pix' && joseSilva.getPix()) {
        return joseSilva.getPix()
    }
}

// const joseSilvaPix = joseSilva.getPix()
// const checkoutPix = new Checkout(joseSilvaCart, paymentMethod('pix'));
// checkoutPix.pay();

const joseSilvaCreditCard = joseSilva.getCreditCard()
const checkoutCreditCard = new Checkout(joseSilvaCart, paymentMethod('creditCard'));
checkoutCreditCard.pay();

console.log(checkoutCreditCard, iPhone12, graphicCard)