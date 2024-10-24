import React, { useState } from "react";
import { Form, Checkbox } from "semantic-ui-react";

const OptionsCheckboxList = ({ options, onHandleOptionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e, { value }) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== value));
      onHandleOptionChange(selectedOptions.filter((opt) => opt !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
      onHandleOptionChange([...selectedOptions, value]);
    }
  };

  return (
    <Form>
      {options.map((option) => (
        <Form.Field key={option.id}>
          <Checkbox
            label={`${option.value} (+$${option.extra_price})`}
            value={option.id}
            checked={selectedOptions.includes(option.id)}
            onChange={handleChange}
          />
        </Form.Field>
      ))}
    </Form>
  );
};

export default OptionsCheckboxList;
