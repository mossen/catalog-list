import React from "react";
import ReactSelect from "react-select";

import { Dispatch } from "../../redux/store";
import { ORDER_OPTIONS, OrderType } from "../../constants";

type Props = {
  dispatch: Dispatch;
  selectedOption: OrderType;
};

const SelectOrder: React.FC<Props> = ({ dispatch, selectedOption }) => {
  return (
    <ReactSelect
      options={ORDER_OPTIONS}
      defaultValue={selectedOption}
      onChange={(option: OrderType) => dispatch.catalogs.setOrder(option)}
    />
  );
};

export default SelectOrder;
