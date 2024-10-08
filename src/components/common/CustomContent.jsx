import React from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import { MdWidthFull } from "react-icons/md";

const CustomContent = (props) => {
  const { shadow, bordered, height, bgColor, scroll = true } = props;
  const cardStyle = {
    overflow: (scroll && "auto") || "none",
    width: "100%",
    //  maxHeight: "20vh",
    //   minHeight: "20vh",
    maxHeight: height,
    minHeight: height,
    border: bordered ? "1px solid rgb(217 217 217 / 45%)" : "none",
    boxShadow: shadow ? "0 2px 8px rgba(0, 0, 0, 0.09)" : "none",
    backgroundColor: bgColor ? "rgb(32 32 55 / 11%)" : "none",
  };

  return (
    <Ant.Card style={cardStyle} {...props} type="inner">
      {props.children}
    </Ant.Card>
  );
};



export default CustomContent;
CustomContent.propTypes = {
  scroll: PropTypes.bool,
};

