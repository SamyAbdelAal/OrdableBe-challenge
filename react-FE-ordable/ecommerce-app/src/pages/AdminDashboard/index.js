import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  Grid,
  Segment,
  Header,
  Modal,
  Form,
  Message,
  Image,
} from "semantic-ui-react";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import DragDrop from "../../components/Drag&Drop";

const AdminDashboard = ({
  fetchOrders,
  fetchedOrders,
  fetchedProducts,
  fetchProducts,
  createProduct,
  deleteProduct,
  updateOrder,
}) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([
    { name: "", product_options: [{ value: "", extra_price: "" }] },
  ]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);
  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const handleOptionNameChange = (index, e) => {
    const { value } = e.target;
    const newOptions = [...options];
    newOptions[index].name = value;
    setOptions(newOptions);
  };

  const handleProductOptionChange = (optionIndex, valueIndex, e) => {
    const { name, value } = e.target;
    const newOptions = [...options];
    newOptions[optionIndex].product_options[valueIndex][name] = value;
    setOptions(newOptions);
  };

  const addOptionCategory = () => {
    setOptions([
      ...options,
      { name: "", product_options: [{ value: "", extra_price: "" }] },
    ]);
  };

  const addProductOption = (optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].product_options.push({
      value: "",
      extra_price: "",
    });
    setOptions(newOptions);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.description) {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);
      formData.append("options", JSON.stringify(options));

      createProduct(formData);
      setNewProduct({ name: "", price: 0, description: "", image: null });
      setOptions([
        { name: "", product_options: [{ value: "", extra_price: "" }] },
      ]);
      setModalOpen(false);
    } else {
      setErrorMessage("Product name, price, and description must be valid.");
    }
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  const handleAcceptOrder = (order) => {
    updateOrder({ ...order, status: "accepted" });
  };

  const setProductImage = (image) => {
    setNewProduct({ ...newProduct, image });
  };
  console.log("newProduct", JSON.stringify(newProduct, null, 2));

  return (
    <Grid columns={2} padded>
      <Grid.Column width={10}>
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
      </Grid.Column>

      <Grid.Column width={6}>
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

          <Button primary onClick={() => setModalOpen(true)}>
            Add Product
          </Button>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            size="tiny"
          >
            <Modal.Header>Add a New Product</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input
                  label="Product Name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Form.Input
                  label="Description"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
                <Form.Input
                  label="Product Price"
                  placeholder="Enter product price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
                <DragDrop setProductImage={setProductImage} />

                <Header as="h4">Options</Header>
                {options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Form.Input
                      label="Option Category Name"
                      placeholder="Category name"
                      value={option.name}
                      onChange={(e) => handleOptionNameChange(optionIndex, e)}
                    />
                    {option.product_options.map(
                      (productOption, productOptionIndex) => (
                        <Form.Group key={productOptionIndex}>
                          <Form.Input
                            placeholder="Option Value"
                            name="value"
                            value={productOption.value}
                            onChange={(e) =>
                              handleProductOptionChange(
                                optionIndex,
                                productOptionIndex,
                                e
                              )
                            }
                          />
                          <Form.Input
                            placeholder="Extra Price"
                            name="extra_price"
                            type="number"
                            value={productOption.extra_price}
                            onChange={(e) =>
                              handleProductOptionChange(
                                optionIndex,
                                productOptionIndex,
                                e
                              )
                            }
                          />
                        </Form.Group>
                      )
                    )}
                    <Button
                      type="button"
                      onClick={() => addProductOption(optionIndex)}
                    >
                      Add Product Option
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addOptionCategory}>
                  Add Option Category
                </Button>
              </Form>
              {errorMessage && <Message negative>{errorMessage}</Message>}
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleAddProduct} primary>
                Add Product
              </Button>
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  fetchedOrders: state.order.orders,
  fetchedProducts: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
  fetchProducts: () => dispatch(actions.fetchProducts()),
  createProduct: (product) => dispatch(actions.createProduct(product)),
  deleteProduct: (id) => dispatch(actions.deleteProduct(id)),
  updateOrder: (order) => dispatch(actions.updateOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
