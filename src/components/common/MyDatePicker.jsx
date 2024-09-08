import React from "react";
import * as Ant from "antd";
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { CiCalendar } from "react-icons/ci";

// import 'react-multi-date-picker/styles/colors/green.css'
// import "react-multi-date-picker/styles/colors/red.css"
// import 'react-multi-date-picker/styles/colors/yellow.css'
// import 'react-multi-date-picker/styles/colors/purple.css'
import "react-multi-date-picker/styles/colors/teal.css";

// import 'react-multi-date-picker/styles/backgrounds/bg-gray.css'
// import "react-multi-date-picker/styles/backgrounds/bg-brown.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { func, string } from "prop-types";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
//const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
const weekDays = ["شنبه", "یک", "دو", "سه", "چهار", "پنج", "جمعه"];

const MyDatePicker = (props) => {
  const themeName = useSelector((store) => store.theme);
  const render = (
    <Ant.Input addonAfter={<CiCalendar />} style={{ textAlign: "center",display: "block !important" }} />
  );
  const defaultDatePickerProps = {
    calendar: persian,
    locale: persian_fa,
    type: "inputIcon",
    render: render,
    digits: digits,
    weekDays: weekDays,
    calendarPosition: "bottom-right",
    animations: [transition()],
    className: `${themeName === "dark" && "bg-dark"}`,
    onChange: func,
  };
  return (
    <>
      <DatePicker

        {...defaultDatePickerProps}
        {...props}
      />
    </>
  );
};

export default MyDatePicker;

export const FormatDateToPost = (date) => {
  return date.toString().replace(/\//g, "");
};

export const FormatDateToDisplay = (date) => {
  const dateString = date.toString();
  const yearFrom = dateString.substr(0, 4);
  const monthFrom = dateString.substr(4, 2);
  const dayFrom = dateString.substr(6, 2);
  const formattedDate = `${yearFrom}/${monthFrom}/${dayFrom}`;
  return formattedDate;
};