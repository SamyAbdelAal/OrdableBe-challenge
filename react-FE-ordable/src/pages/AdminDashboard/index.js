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
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";

const AdminDashboard = ({
  fetchOrders,
  fetchedOrders,
  fetchedProducts,
  fetchProducts,
  createProduct,
  deleteProduct,
  updateOrder,
  updateProduct,
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  const handleAddOrUpdateProduct = () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.description) {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      if (typeof newProduct.image !== "string")
        //so it doesn't append the image if it's not a file
        formData.append("image", newProduct.image);
      formData.append("options", JSON.stringify(options));

      if (isUpdating) {
        updateProduct(selectedProductId, formData);
      } else {
        createProduct(formData);
      }

      resetProductForm(true);
    } else {
      setErrorMessage("Product name, price, and description must be valid.");
    }
  };

  const resetProductForm = (submittig = false) => {
    setNewProduct({ name: "", price: 0, description: "", image: null });
    setOptions([
      { name: "", product_options: [{ value: "", extra_price: "" }] },
    ]);
    setIsUpdating(false);
    setSelectedProductId(null);
    if (submittig) setModalOpen(false);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    console.log(`🚀 ~ handleEditProduct ~ product:`, product);
    setOptions(product.options || []);
    setSelectedProductId(product.id);
    setIsUpdating(true);
    setModalOpen(true);
  };

  const handleAcceptOrder = (order) => {
    updateOrder({ ...order, status: "accepted" });
  };

  const setProductImage = (image) => {
    setNewProduct({ ...newProduct, image });
  };

  return (
    <Grid columns={2} padded>
      <Grid.Column width={10}>
        <OrdersTable orders={orders} handleAcceptOrder={handleAcceptOrder} />
      </Grid.Column>

      <Grid.Column width={6}>
        <ProductsTable
          products={products}
          handleEditProduct={handleEditProduct}
          handleRemoveProduct={handleRemoveProduct}
          setModalOpen={setModalOpen}
          resetProductForm={resetProductForm}
        />

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="tiny">
          <Modal.Header>
            {isUpdating ? "Update Product" : "Add a New Product"}
          </Modal.Header>
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
            <Button onClick={handleAddOrUpdateProduct} primary>
              {isUpdating ? "Update Product" : "Add Product"}
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
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
  updateProduct: (id, product) => dispatch(actions.updateProduct(id, product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
