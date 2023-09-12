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
    
    private generateRandomPixKey(): string {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keyLength = 20; 
    
        let pixKey = '';
    
        for (let i = 0; i < keyLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            pixKey += characters.charAt(randomIndex);
        }
    
        return pixKey;
    };

    setCreditCard(number: string, cvv: string, expirationDate: string) {
        this.creditCard = new CreditCard(this.name, number, cvv, expirationDate);
    }

    getCreditCard() {
        return this.creditCard;
    }
    

    setPix() {
        this.pix = new Pix(this.name, this.generateRandomPixKey());
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
// joseSilva.setPix('12345678900');
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

    getListCar(): any {
        const listCar: any[] = [];
        // console.log("Itens do Carrinho");
        this.products.forEach(element => {
            // console.log("Produto:", element.product.name, "Quantidade:",  element.quantity, "Preço:", element.price);
            listCar.push([element.product.name, element.quantity, element.price.toFixed(2)]);
        });
        // console.log("Total a pagar:", this.getTotal());
        return listCar;
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
console.log("Itens do Carrinho");
console.log(joseSilvaCart.getListCar());
console.log(joseSilvaCart.getTotal());

// console.log(joseSilvaCart,joseSilvaCart.getTotal());

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

        if (this.paymentMethod?.type === `pix`){
            this.total = this.cart.getTotal() * (1-5/100)
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

const joseSilvaPix = joseSilva.getPix()
const checkoutPix = new Checkout(joseSilvaCart, paymentMethod('pix'));
checkoutPix.pay();

console.log(joseSilvaPix, iPhone12, graphicCard)
console.log(joseSilvaPix)
console.log(checkoutPix.total)
console.log(checkoutPix.paymentMethod?.type)


// const joseSilvaCreditCard = joseSilva.getCreditCard()
// const checkoutCreditCard = new Checkout(joseSilvaCart, paymentMethod('creditCard'));
// checkoutCreditCard.pay();

// console.log(checkoutCreditCard, iPhone12, graphicCard)
// console.log(checkoutCreditCard)
// console.log(checkoutCreditCard.total)
// console.log(checkoutCreditCard.paymentMethod?.type)
// console.log(checkoutCreditCard, iPhone12, graphicCard)

const joao = new Person('Joao M', '123.456.789-00');
console.log(joao, joao.setCreditCard('1234 5678 9012 3456','969','12/2024') ,joao.setPix()); 

const henrique = new Person('Henrique', '123.456.789.10');
console.log(henrique, henrique.setPix()); 
