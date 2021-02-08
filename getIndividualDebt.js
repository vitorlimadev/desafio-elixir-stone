/**
 * Define your custom emails list here.
 * @type {Array<string>}
 */
const emailsList = [
  "another@castle.com",
  "arrow@theknee.com",
  "snake_eater@psychomantis.com",
  "alucard@belmont.com",
];

/**
 * @typedef ShoppingItem
 * @type {object}
 * @property {string} itemName - The item's name.
 * @property {number} amount - The amount of the specific item.
 * @property {number} price - Price per unit. 100 = 1 BRL.
 */

/**
 * Define your custom shopping items list here.
 * @type {Array<ShoppingItem>}
 */
const shoopingItemsList = [
  {
    amount: 1,
    itemName: "Assault Cuirass",
    price: 2000,
  },
  {
    amount: 1,
    itemName: "Tango",
    price: 202,
  },
  {
    amount: 2,
    itemName: "Iron branch",
    price: 143,
  },
];

/**
 * Returns an array of objects with an email and the value the email's owner needs to pay.
 * @param {Array<string>} emails - Emails list.
 * @param {Array<ShoppingItem>} items - Shopping items list.
 */
const getIndividualDebt = (emails, items) => {
  // Checking empty litsts.
  if (!emails || emails.length <= 0 || !items || items.length <= 0) {
    throw Error("You need at least one item in each list.");
  }

  // Getting the price of all items in the shopping list.
  const totalPrice = items.reduce(
    (acc, curr) => acc + curr.price * curr.amount,
    0
  );

  // Getting the value each person will pay.
  const dividedPrice = Math.floor(totalPrice / emails.length);

  // Checking for remainder.
  let remainder = totalPrice - dividedPrice * emails.length;

  // To help with readability on the shell.
  console.log(`TOTAL: ${totalPrice}`);
  console.log(`PEOPLE: ${emails.length}`);
  console.log(`PRICE PER PERSON: ${dividedPrice}`);
  console.log(`REMAINDER: ${remainder}`);
  console.log("*************************************");
  console.log("RESULT:");

  if (remainder <= 0) {
    const result = emails.map((email) => {
      return {
        email,
        debt: dividedPrice,
      };
    });

    return console.log(JSON.stringify(result, null, 2));
  }

  // If there's any remainder, increase the debt of each email by one.
  const compositeResult = emails.map((email) => {
    if (remainder > 0) {
      remainder--;

      return {
        email,
        debt: dividedPrice + 1,
      };
    }

    return {
      email,
      debt: dividedPrice,
    };
  });

  return console.log(JSON.stringify(compositeResult, null, 2));
};

getIndividualDebt(emailsList, shoopingItemsList);

module.exports = getIndividualDebt;
