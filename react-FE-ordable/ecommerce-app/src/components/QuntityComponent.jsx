import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

const QuantitySelector = ({ initialQuantity = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button icon="minus" onClick={handleDecrease} />
      <Input
        type="number"
        value={quantity}
        onChange={(e) => {
          const newQuantity = parseInt(e.target.value, 10) || 1;
          setQuantity(newQuantity);
          onQuantityChange(newQuantity);
        }}
        style={{ width: "60px", textAlign: "center" }}
      />
      <Button icon="plus" onClick={handleIncrease} />
    </div>
  );
};

export default QuantitySelector;
