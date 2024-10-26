import React, { useEffect } from "react";
import { Card, Header, List, Icon, Label, Loader } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../store/actions";
const OrderDisplay = ({ orders, fetchOrders, loading }) => {
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "30px" }}>
        <Icon name="shopping cart" />
        Your Orders
      </Header>
      {loading && (
        <div style={{ padding: "20px", height: "20vh" }}>
          <Loader active>Loading...</Loader>
        </div>
      )}
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card
            fluid
            key={order.id}
            style={{ marginBottom: "20px", padding: "15px" }}
          >
            <Header as="h3">
              Order #{order.id} - {order.customer_name}
              <Label
                color={order.status === "paid" ? "green" : "orange"}
                style={{ marginLeft: "10px" }}
              >
                {order.status.toUpperCase()}
              </Label>
            </Header>
            <p>
              <Icon name="mail" /> {order.customer_email}
            </p>
            <p>
              <Icon name="clock" />{" "}
              {moment(order.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </p>

            <List divided relaxed>
              {order.items.map((item) => (
                <List.Item key={item.id}>
                  <List.Content>
                    <List.Header as="h4">
                      Product ID: {item.product}
                      <Label color="blue" style={{ marginLeft: "10px" }}>
                        Quantity: {item.quantity}
                      </Label>
                      <span
                        style={{
                          marginLeft: "15px",
                          fontSize: "1.1em",
                          color: "#333",
                        }}
                      >
                        ${item.price_at_purchase}
                      </span>
                    </List.Header>
                    {item.selected_options.length > 0 && (
                      <List.List>
                        {item.selected_options.map((option) => (
                          <List.Item
                            key={option.id}
                            style={{ marginTop: "5px" }}
                          >
                            <Label color="teal" size="tiny">
                              Option: {option.value} (+${option.extra_price})
                            </Label>
                          </List.Item>
                        ))}
                      </List.List>
                    )}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Card>
        ))
      ) : (
        <Header as="h4" textAlign="center">
          No orders found.
        </Header>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDisplay);
