/** 
 * Welcome to main.ts
 * @author Gleidson Medeiros <gleidsonlm@gmail.com>
 * @author Clóvis Garcia <theviolatorx@gmail.com>
 * @author Henrique Galieta <HGalieta>
 * @author João Marcos Donizetti Rodrigues <jmdonizetti>
 */

interface IPerson {
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

export class Pix extends PaymentMethod {
    key: string;

    constructor(name: string, key: string) {
        super(name, 'pix');
        this.key = key;
    }
}

export class CreditCard extends PaymentMethod {
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

export class Product {
    name: string;
    description: string;
    price: number;
    stock: number;

    constructor(name: string, description: string, price: number, stock: number) {
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

export class CartProduct {
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

export class Cart {
    id: number;
    customer: Person;
    products: CartProduct[] = [];

    constructor(customer:Person) {
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
    addProduct(product: CartProduct): void {
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
    removeProduct(product: CartProduct): void {
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
    plusProduct(product: CartProduct, quantity: number): void {
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
    minusProduct(product: CartProduct, quantity: number): void {
        product.removeQuantity(quantity);
    }

    /**
    * Método para retornar os produtos no carrinho
    * @exemple
    * <objeto>.getProducts();
    *
    * @return {CartProduct[]}
    */
    getProducts(): CartProduct[] {
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

}

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

export class Store {
    name: string;
    cnpj: string;
    products: Product[];

    constructor(name: string, cnpj: string) {
        this.name = name;
        this.cnpj = cnpj;
        this.products = [];
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    removeProduct(product: Product): void {
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);
    }

    listProducts(): Product[] {
        return this.products;
    }

}
