/**
 * Welcome to main.ts
 * @author Gleidson Medeiros <gleidsonlm@gmail.com>
 * @author Clóvis Garcia <theviolatorx@gmail.com>
 * @author Henrique Galieta <HGalieta>
 * @author João Marcos Donizetti Rodrigues <jmdonizetti>
 */
export class Person {
    name;
    cpf;
    creditCard;
    pix;
    constructor(name, cpf) {
        this.name = name;
        this.cpf = cpf;
    }
    /**
    * Método para retornar uma chave aleatória pix
    * @exemple
    * <objeto>.generateRandomPixKey();
    *
    * @return {string} chave aleatória
    */
    generateRandomPixKey() {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keyLength = 20;
        let pixKey = '';
        for (let i = 0; i < keyLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            pixKey += characters.charAt(randomIndex);
        }
        return pixKey;
    }
    ;
    /**
    * Método para adicionar cartão de crédito
    * @exemple
    * <objeto>.setCreditCard("1234456789987654","159","09/2030")
    *
    * @arg {string} number - Número do cartão de crédito
    * @arg {string} cvv - Código cvv
    * @arg {string} expirationDate - Data de expiração do cartão
    * @return {void}
    */
    setCreditCard(number, cvv, expirationDate) {
        this.creditCard = new CreditCard(this.name, number, cvv, expirationDate);
    }
    /**
    * Método para retornar o número do cartão de crédito
    * @exemple
    * <objeto>.getCreditCard();
    *
    * @return {CreditCard | undefined} cartão de crédito
    */
    getCreditCard() {
        return this.creditCard;
    }
    /**
    * Método para definir a chave pix
    * @exemple
    * <objeto>.setPix();
    *
    * @return {void}
    */
    setPix() {
        this.pix = new Pix(this.name, this.generateRandomPixKey());
    }
    /**
    * Método retornar a chave pix
    * @exemple
    * <objeto>.setPix();
    *
    * @return {Pix | undefined}  chave pix
    */
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
export class Pix extends PaymentMethod {
    key;
    constructor(name, key) {
        super(name, 'pix');
        this.key = key;
    }
}
export class CreditCard extends PaymentMethod {
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
export class Product {
    name;
    description;
    price;
    stock;
    constructor(name, description, price, stock) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
    /**
    * Método para retirar uma determinada quantidade de produtos do estoque
    * @exemple
    * <objeto>.sell(5);
    *
    * @arg {number} quantity - Quantidade de produtos a retirar do estoque
    *
    * @return {void}
    */
    sell(quantity) {
        if (quantity > this.stock) {
            throw new Error('Insufficient stock');
        }
        this.stock -= quantity;
    }
    /**
    * Método para adicionar uma determinada quantidade de produtos ao estoque
    * @exemple
    * <objeto>.restock(5);
    *
    * @arg {number} quantity - Quantidade de produtos a adicionar ao estoque
    *
    * @return {void}
    */
    restock(quantity) {
        this.stock += quantity;
    }
}
export class CartProduct {
    product;
    quantity;
    price;
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.price * this.quantity;
    }
    /**
    * Método para adicionar a quantidade de produtos para serem comprados
    * @exemple
    * <objeto>.addQuantity(5);
    *
    * @arg {number} quantity - Quantidade de produtos
    *
    * @return {void}
    */
    addQuantity(quantity) {
        this.quantity += quantity;
        this.price = this.product.price * this.quantity;
    }
    /**
    * Método para remover a quantidade de produtos a serem comprados
    * @exemple
    * <objeto>.removeQuantity(5);
    *
    * @arg {number} quantity - Quantidade de produtos
    *
    * @return {void}
    */
    removeQuantity(quantity) {
        this.quantity -= quantity;
        this.price = this.product.price * this.quantity;
    }
}
export class Cart {
    id;
    customer;
    products = [];
    constructor(customer) {
        this.id = Math.floor(Math.random() * 1000);
        // this.id = uuidv4();
        this.customer = customer;
    }
    /**
    * Método para adicionar ao carrinho o produto a ser comprado
    * @exemple
    * <objeto>.addProduct(CartProduct);
    *
    * @arg {CartProduct} product - Produto a ser comprado
    *
    * @return {void}
    */
    addProduct(product) {
        this.products.push(product);
    }
    /**
    * Método para remover do carrinho o produto a ser comprado
    * @exemple
    * <objeto>.removeProduct(<objeto>);
    *
    * @arg {CartProduct} product - Produto do carrinho
    *
    * @return {void}
    */
    removeProduct(product) {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }
    /**
    * Método para adicionar mais quantidade do produto no carrinho
    * @exemple
    * <objeto>.plusProduct(<objeto>, 5);
    *
    * @arg {CartProduct} product - Produto no carrinho
    * @arg {number} quantity - Quantidade
    *
    * @return {void}
    */
    plusProduct(product, quantity) {
        product.addQuantity(quantity);
    }
    /**
    * Método para retirar uma quantidade do produto no carrinho
    * @exemple
    * <objeto>.minusProduct(<objeto>, 5);
    *
    * @arg {CartProduct} product - Produto no carrinho
    * @arg {number} quantity - Quantidade
    *
    * @return {void}
    */
    minusProduct(product, quantity) {
        product.removeQuantity(quantity);
    }
    /**
    * Método para retornar os produtos no carrinho
    * @exemple
    * <objeto>.getProducts();
    *
    * @return {CartProduct[]}
    */
    getProducts() {
        return this.products;
    }
    /**
    * Método para retornar o total do carrinho
    * @exemple
    * <objeto>.getTotal();
    *
    * @return {number}
    */
    getTotal() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
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
    /**
    * Método para efetuar o pagamento total do carrinho
    * @exemple
    * <objeto>.pay();
    *
    * @return {void}
    */
    pay() {
        if (!this.paymentMethod) {
            throw new Error('Payment method not found');
        }
        if (this.paymentMethod?.type === `pix`) {
            this.total = this.cart.getTotal() * (1 - 5 / 100);
        }
        this.paymentStatus = 'paid';
        this.cart.getProducts().forEach(item => {
            item.product.sell(item.quantity);
        });
    }
}
export class Store {
    name;
    cnpj;
    products;
    constructor(name, cnpj) {
        this.name = name;
        this.cnpj = cnpj;
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(product) {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }
    listProducts() {
        return this.products;
    }
}
