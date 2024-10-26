import React from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";

export default function OrdersTable({ orders = [], handleAcceptOrder }) {
  return (
    <Segment>
      <Header as="h2" dividing>
        Orders Management
      </Header>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.customer_name}</Table.Cell>
              <Table.Cell>{order.total_order_value} KWD</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                <Button
                  color="green"
                  disabled={order.status !== "paid"}
                  onClick={() => handleAcceptOrder(order)}
                >
                  Accept Order
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}
