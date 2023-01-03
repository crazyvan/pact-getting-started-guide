const superagent = require("superagent");
const { Order } = require("./order");

const fetchOrders = async (providerBaseUrl) => {
  const url = `${providerBaseUrl}/orders`;

  try {
    const res = await superagent.get(url);

    if (!res.body) {
      throw new Error(`Response body was ${res.body}`);
    }

    const orders = res.body.reduce((acc, v) => {
      acc.push(new Order(v.id, v.items));
      return acc;
    }, []);

    console.log(
      `Received the following orders from ${url}: ${JSON.stringify(
        orders,
        null,
        2
      )}`
    );

    return orders;
  } catch (err) {
    console.log(err);
    throw new Error(`Error from response: ${err.body}`);
  }
};

module.exports = {
  fetchOrders,
};
