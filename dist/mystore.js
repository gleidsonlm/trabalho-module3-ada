import { Store, Product, Cart, Person, CartProduct } from './main.js';
function displayProducts(products) {
    window.document.body.getElementsByTagName('main')[0].appendChild(document.createElement('div')).setAttribute('id', 'products');
    const productsContainer = document.getElementById('products');
    const productRow = document.createElement('div');
    productRow.className = 'row';
    productsContainer.appendChild(productRow);
    for (const product of products) {
        const productCol = document.createElement('div');
        productCol.className = 'col-sm-2';
        const productCard = document.createElement('div');
        productCard.className = 'card';
        const productCardHeader = document.createElement('h2');
        productCardHeader.className = 'card-header';
        productCardHeader.textContent = product.name;
        const productCardBody = document.createElement('div');
        productCardBody.className = 'card-body';
        const productCardPrice = document.createElement('p');
        productCardPrice.className = 'card-text';
        productCardPrice.textContent = `Price: R$ ${product.price}`;
        const productCardDescription = document.createElement('p');
        productCardDescription.className = 'card-text';
        productCardDescription.textContent = product.description;
        const productCardAddToCart = document.createElement('button');
        productCardAddToCart.className = 'btn btn-primary';
        productCardAddToCart.textContent = 'Add to cart';
        productCard.appendChild(productCardHeader);
        productCard.appendChild(productCardBody);
        productCardBody.appendChild(productCardDescription);
        productCardBody.appendChild(productCardPrice);
        productCardBody.appendChild(productCardAddToCart);
        productRow.appendChild(productCol);
        productCol.appendChild(productCard);
    }
}
const joseSilva = new Person('José Silva', '123.456.789-00');
joseSilva.setCreditCard('1234 5678 9012 3456', '969', '12/2024');
const joseSilvaCart = new Cart(joseSilva);
const myStore = new Store('My Store', '123.456.789/0001-00');
const iphone12 = new Product('IPhone 12', 'iPhone is a music player, phone and Internet navigator', 10000, 10);
myStore.addProduct(iphone12);
const graphicCard = new Product('Graphic Card', 'Run your games in max resolution and FPS. Or mine crypto', 5000, 10);
myStore.addProduct(graphicCard);
const notebook = new Product('Notebook', 'All-purpose calculating machine, mainly to see cat pictures.', 5000, 10);
myStore.addProduct(notebook);
const mouse = new Product('Mouse', 'Move the pointer and click stuff', 100, 10);
myStore.addProduct(mouse);
const keyboard = new Product('Keyboard', 'Type stuff', 200, 10);
myStore.addProduct(keyboard);
const monitor = new Product('Monitor', 'See stuff', 1000, 10);
myStore.addProduct(monitor);
const headphones = new Product('Headphones', 'Listen to stuff', 100, 10);
myStore.addProduct(headphones);
const microphone = new Product('Microphone', 'Record stuff', 100, 10);
myStore.addProduct(microphone);
const webcam = new Product('Webcam', 'See and record stuff', 100, 10);
myStore.addProduct(webcam);
joseSilvaCart.addProduct(new CartProduct(iphone12, 1));
joseSilvaCart.addProduct(new CartProduct(graphicCard, 1));
displayProducts(myStore.listProducts());
/**
 * Constante que recebe o método de pagamento.
 *
 * @arg {string} choice - tipo de pagamento escolhido: creditCard ou pix
 *
 * @return {CreditCard | Pix | undefined}
 */
const paymentMethod = (choice) => {
    if (choice === 'creditCard' && joseSilva.getCreditCard()) {
        return joseSilva.getCreditCard();
    }
    else if (choice === 'pix' && joseSilva.getPix()) {
        return joseSilva.getPix();
    }
};
// const joseSilvaCreditCard = joseSilva.getCreditCard()
// const checkoutCreditCard = new Checkout(joseSilvaCart, paymentMethod('creditCard'));
// checkoutCreditCard.pay();
// console.log(checkoutCreditCard, iPhone12, graphicCard)
// console.log(checkoutCreditCard)
// console.log(checkoutCreditCard.total)
// console.log(checkoutCreditCard.paymentMethod?.type)
// console.log(checkoutCreditCard, iPhone12, graphicCard)
// const joao = new Person('Joao M', '123.456.789-00');
// console.log(joao, joao.setCreditCard('1234 5678 9012 3456','969','12/2024') ,joao.setPix()); 
// const henrique = new Person('Henrique', '123.456.789.10');
// console.log(henrique, henrique.setPix()); 
