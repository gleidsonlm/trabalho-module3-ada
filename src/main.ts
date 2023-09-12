/** 
 * Welcome to main.ts
 * @author Gleidson Medeiros <gleidsonlm@gmail.com>
 * @author Clóvis Garcia <theviolatorx@gmail.com>
 * @author Henrique Galieta <HGalieta>
 * @author João Marcos Donizetti Rodrigues <jmdonizetti>
 */

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
    
    /**
    * Método para retornar uma chave aleatória pix
    * @exemple
    * <objeto>.generateRandomPixKey();
    * 
    * @return {string} chave aleatória
    */
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
    setCreditCard(number: string, cvv: string, expirationDate: string):void {
        this.creditCard = new CreditCard(this.name, number, cvv, expirationDate);
    }

    /**
    * Método para retornar o número do cartão de crédito
    * @exemple
    * <objeto>.getCreditCard();
    * 
    * @return {CreditCard | undefined} cartão de crédito
    */
    getCreditCard():CreditCard | undefined {
        return this.creditCard;
    }
    
    /**
    * Método para definir a chave pix
    * @exemple
    * <objeto>.setPix();
    * 
    * @return {void}
    */
    setPix():void {
        this.pix = new Pix(this.name, this.generateRandomPixKey());
    }

    /**
    * Método retornar a chave pix
    * @exemple
    * <objeto>.setPix();
    * 
    * @return {Pix | undefined}  chave pix
    */
    getPix(): Pix | undefined {
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

    /**
    * Método para retirar uma determinada quantidade de produtos do estoque
    * @exemple
    * <objeto>.sell(5);
    * 
    * @arg {number} quantity - Quantidade de produtos a retirar do estoque
    *
    * @return {void}
    */
    sell(quantity: number):void {
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
    restock(quantity: number):void {
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

    /**
    * Método para adicionar a quantidade de produtos para serem comprados
    * @exemple
    * <objeto>.addQuantity(5);
    * 
    * @arg {number} quantity - Quantidade de produtos
    *
    * @return {void}
    */
    addQuantity(quantity: number):void {
        this.quantity += quantity;
        this.price = this.product.price * this.quantity
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
    removeQuantity(quantity: number): void {
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

    /**
    * Método para adicionar ao carrinho o produto a ser comprado
    * @exemple
    * <objeto>.addProduct(5);
    * 
    * @arg {cartProduct} product - Produto a ser comprado
    *
    * @return {void}
    */
    addProduct(product: cartProduct): void {
        this.products.push(product);
    }

    /**
    * Método para remover do carrinho o produto a ser comprado
    * @exemple
    * <objeto>.removeProduct(<objeto>);
    * 
    * @arg {cartProduct} product - Produto do carrinho
    *
    * @return {void}
    */
    removeProduct(product: cartProduct): void {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }

    /**
    * Método para adicionar mais quantidade do produto no carrinho
    * @exemple
    * <objeto>.plusProduct(<objeto>, 5);
    * 
    * @arg {cartProduct} product - Produto no carrinho
    * @arg {number} quantity - Quantidade
    *
    * @return {void}
    */
    plusProduct(product: cartProduct, quantity: number): void {
        product.addQuantity(quantity);
    }

    /**
    * Método para retirar uma quantidade do produto no carrinho
    * @exemple
    * <objeto>.minusProduct(<objeto>, 5);
    * 
    * @arg {cartProduct} product - Produto no carrinho
    * @arg {number} quantity - Quantidade
    *
    * @return {void}
    */
    minusProduct(product: cartProduct, quantity: number): void {
        product.removeQuantity(quantity);
    }

    /**
    * Método para retornar os produtos no carrinho
    * @exemple
    * <objeto>.getProducts();
    *
    * @return {cartProduct[]}
    */
    getProducts(): cartProduct[] {
        return this.products;
    }

    /**
    * Método para retornar o total do carrinho
    * @exemple
    * <objeto>.getTotal();
    *
    * @return {number}
    */
    getTotal(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    // TODO: Retirar este método
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

    /**
    * Método para efetuar o pagamento total do carrinho
    * @exemple
    * <objeto>.pay();
    *
    * @return {void}
    */
    pay(): void {
        
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

/**
 * Constante que recebe o método de pagamento.
 * 
 * @arg {string} choice - tipo de pagamento escolhido: creditCard ou pix
 * 
 * @return {CreditCard | Pix | undefined}
 */
const paymentMethod = (choice: string): CreditCard | Pix | undefined => { 
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
