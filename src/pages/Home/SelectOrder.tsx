import React from "react";
import cx from "classnames";
import SelectSearch from "react-select-search";

import { Dispatch } from "../../redux/store";
import { ORDER_OPTIONS } from "../../constants";

type Props = {
  dispatch: Dispatch;
  selectedOption: string;
  className: string;
};

const SelectOrder: React.FC<Props> = ({
  dispatch,
  selectedOption,
  className,
}) => {
  const handleOnChange = (option) => {
    dispatch.catalogs.setOrder(option);
  };

  return (
    <SelectSearch
      className={cx("select-search", className)}
      options={ORDER_OPTIONS}
      value={selectedOption}
      onChange={(option) => {
        handleOnChange(option);
      }}
    />
  );
};

export default SelectOrder;
