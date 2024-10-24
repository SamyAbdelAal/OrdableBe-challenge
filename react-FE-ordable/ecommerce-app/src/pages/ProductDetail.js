import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select,
  Divider,
  Dropdown,
  Radio,
} from "semantic-ui-react";

import * as actions from "../store/actions";
import OptionsCheckboxList from "../components/OptionsCheckboxes";
import QuantitySelector from "../components/QuntityComponent";
const ProductDetail = ({ fetchProductDetail, product, addItem }) => {
  const { productID } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [data, setData] = useState(product);
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleChange = (e, { value }) => {
    setSelectedOption(value);
  };
  const handleOptionChange = (optionIds, options) => {
    const selectedOptions = options.filter((opt) => optionIds.includes(opt.id));
    setSelectedOptions(selectedOptions);
  };
  useEffect(() => {
    fetchProductDetail(productID);
  }, [productID]);

  useEffect(() => {
    setData(product);
  }, [product]);

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
  };

  // const handleFetchItem = () => {
  //   setLoading(true);
  //   axios
  //     .get(productDetailURL(productID))
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // };

  const handleFormatData = (formData) => {
    // convert {colour: 1, size: 2} to [1,2] - they're all variations
    return Object.keys(formData).map((key) => {
      return formData[key];
    });
  };

  const handleAddToCart = (slug) => {
    setLoading(true);
    const variations = handleFormatData(formData);
  };

  console.log(`🚀 ~ handleOptionChange ~ option:`, selectedOptions);

  const calculateTotalPrice = () => {
    let total = parseFloat(product.price);
    selectedOptions.forEach((opt) => {
      total += parseFloat(opt.extra_price);
    });
    total *= quantity;
    return total.toFixed(2);
  };

  console.log("selectedOptions", selectedOptions);

  return (
    <Container>
      <Segment>
        <Header as="h2">{product.name}</Header>
        <Image src={product.image} size="medium" rounded />
        <Header as="h4">{product.description}</Header>
        <Label as="h4">Price: ${product.price}</Label>
        <Label as="h4">Total Price: ${calculateTotalPrice()}</Label>
        <QuantitySelector
          initialQuantity={quantity}
          onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        />
        <Header as="h3">Options</Header>
        {product?.options?.map((option, i) => (
          <div key={option.id}>
            <Header as="h4">{option.name}</Header>
            <OptionsCheckboxList
              onHandleOptionChange={(ids) =>
                handleOptionChange(ids, option.product_options)
              }
              options={option.product_options}
            />
          </div>
        ))}
        <Button
          primary
          onClick={() =>
            addItem(
              { ...product, quantity, price: calculateTotalPrice() },
              selectedOptions
            )
          }
        >
          Add to Cart
        </Button>
        {Object.keys(selectedOptions).length > 0 && (
          <Message>
            <Message.Header>Your selected options:</Message.Header>
            <ul>
              {selectedOptions.map((opt) => {
                return (
                  <li key={opt.id}>
                    {opt.name}: {opt.value} (+${opt.extra_price})
                  </li>
                );
              })}
            </ul>
          </Message>
        )}
      </Segment>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  product: state.products.product,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductDetail: (productID) =>
    dispatch(actions.fetchProductDetail(productID)),
  addItem: (product, selectedOptions) =>
    dispatch(actions.addItem(product, selectedOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
