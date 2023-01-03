const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const { provider } = require("../pact");
const { arrayContaining, eachLike } =
  require("@pact-foundation/pact").MatchersV3;

const { Order } = require("./order");
const { fetchOrders } = require("./orderClient");

describe("Pact with Order API", () => {
  describe("given there are orders", () => {
    const firstItemExpectation = {
      name: "burger",
      quantity: 2,
      value: 20,
    };

    const secondItemExpectation = {
      name: "coke",
      quantity: 2,
      value: 5,
    };

    const orderExpectation = {
      id: 1,
      items: arrayContaining(firstItemExpectation, secondItemExpectation),
    };

    describe("when a call to the API is made", () => {
      it("will receive the list of current orders", () => {
        provider
          .given("there are orders")
          .uponReceiving("a request for orders")
          .withRequest({
            method: "GET",
            path: "/orders",
          })
          .willRespondWith({
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: eachLike(orderExpectation),
          });

        return provider.executeTest((mockServer) => {
          return expect(
            fetchOrders(mockServer.url)
          ).to.eventually.have.deep.members([
            new Order(orderExpectation.id, [
              firstItemExpectation,
              secondItemExpectation,
            ]),
          ]);
        });
      });
    });
  });
});
