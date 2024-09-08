//select component with server side search

import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Select, Spin } from "antd";
import debounce from "lodash.debounce";

const DebounceSelect = ({ fetchOptions, debounceTimeout = 1000, fieldNames, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      await fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout,fieldNames]);
  return (
    <>
      <Select
        labelInValue
        filterOption={false}
        showSearch
        allowClear={true}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        fieldNames={fieldNames}

      />
    </>
  );
};
export default DebounceSelect;
DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
  fieldNames: PropTypes.object
};