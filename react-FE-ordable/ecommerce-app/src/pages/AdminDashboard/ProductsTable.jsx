import React from "react";
import { Button, Header, Icon, Image, Segment, Table } from "semantic-ui-react";

export default function ProductsTable({
  products,
  handleEditProduct,
  handleRemoveProduct,
  setModalOpen,
  resetProductForm,
}) {
  return (
    <Segment>
      <Header as="h2" dividing>
        Product Management
      </Header>

      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>
                <Image src={product.image} size="tiny" />
              </Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.price} KWD</Table.Cell>
              <Table.Cell>
                <Button
                  color="blue"
                  icon
                  onClick={() => handleEditProduct(product)}
                >
                  <Icon name="edit" /> Edit
                </Button>
                <Button
                  color="red"
                  icon
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <Icon name="trash" /> Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Button
        primary
        onClick={() => {
          setModalOpen(true);
          resetProductForm();
        }}
      >
        Add Product
      </Button>
    </Segment>
  );
}
