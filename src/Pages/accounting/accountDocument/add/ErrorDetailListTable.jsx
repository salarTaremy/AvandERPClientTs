import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import ModalHeader from "@/components/common/ModalHeader";

import { TbMoodConfuzed } from "react-icons/tb";

const ErrorDetailListTable = (props) => {
  const { errorsList, myKey, obj } = props;

  const [error, setError] = useState();

  useEffect(() => {
    const errList = Object.entries(errorsList).flatMap(([key, err]) =>
      err.map((errorItem) => ({
        key,
        errName: errorItem,
      })),
    );

    setError(errList);
  }, [errorsList, myKey]);

  return (
    <div>
      <ModalHeader title={`شماره ردیف سند : ${obj.rowNumber}`} />
      {error &&
        error.map((err, index) => {
          console.log(err, "err");
          if (err.key === myKey) {
            return (
              <>
                <Ant.Alert
                  className="mt-2"
                  message={
                    <Ant.Typography.Text
                      key={index}
                      className="text-orange-400"
                    >
                      {err.errName}
                    </Ant.Typography.Text>
                  }
                  type="warning"
                  showIcon
                  icon={<TbMoodConfuzed size={32} />}
                >
                  <p key={index}>{err.errName}</p>
                </Ant.Alert>
              </>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default ErrorDetailListTable;
ErrorDetailListTable.propTypes = {
  errorsList: PropTypes.any,
  myKey: PropTypes.any,
  obj: PropTypes.any,
};
