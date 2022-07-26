// Stroll through the shops and encounter a list of items you are able to buy
// select and item and get price of it. Get prompt to buy it and and if you select quantity.
// Prompt if you want to buy anything else
// In the end get the final items and total price to pay

const prompt = require('prompt-sync')();

const items = [
  { name: 'eggs', price: '2.49' },
  { name: 'bread', price: '4.50' },
  { name: 'cheese', price: '3.10' },
  { name: 'chips', price: '2.20' },
  { name: 'chicken', price: '12.49' },
  { name: 'yoghurt', price: '6.50' },
];

let basket = [];
let cost = 0;

let currentItem = null;

const listItems = () => {
  console.log(`
Hi Customer! What do you want to buy?
0: eggs
1: bread
2: cheese
3: chips
4: chicken
5: yoghurt`);
  currentItem = prompt('');
};

listItems();

if (currentItem > 5 || currentItem < 0) {
  console.log(
    'No item exists based on the number you have selected. Try again!'
  );
  listItems();
}

console.log(
  `You have selected ${items[currentItem].name} with a price of ${items[currentItem].price}`
);
let amount = prompt('How many do you want to buy? ');
cost += items[currentItem].price * amount;
console.log(`total cost: $${cost}`);

basket = [{ [items[currentItem].name]: amount }];
console.log('Your basket is:', basket);
