import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "../../assets/colors";

const CustomButton = styled(Button)`
  min-width: 93px;
  &.ant-btn {
    height: 36px;
    font-size: 14px;
    line-height: 1;
  }
  &.ant-btn-lg {
    height: 36px;
    font-size: 14px;
    line-height: 1;
  }
  &.ant-btn-sm {
    height: 28px;
    font-size: 14px;
    line-height: 1;
  }
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "4px 12px";
      default:
        return "8px 16px";
    }
  }} !important;
  border-radius: ${(props) => {
    switch (props.size) {
      case "small":
        return "4px";
      default:
        return "8px";
    }
  }} !important;

  color: ${(props) => {
    switch (props.type) {
      case "primary":
        return colors.white;
      case "secondary":
        return colors.neutral900;
      case "plain":
        return colors.primary600;
      default:
        return colors.neutral900;
    }
  }} !important;
  background: ${(props) => {
    switch (props.type) {
      case "primary":
        return colors.primary800;
      case "secondary":
        return colors.neutral200;
      case "plain":
        return "transparent";
      default:
        return colors.white;
    }
  }} !important;

  border-color: ${(props) => {
    switch (props.type) {
      case "primary":
      case "secondary":
      case "plain":
        return "transparent";
      default:
        return colors.neutral900;
    }
  }} !important;

  &.ant-btn:hover {
    color: ${(props) => {
      switch (props.type) {
        case "primary":
          return colors.white;
        case "secondary":
          return colors.neutral900;
        case "plain":
          return colors.primary800;
        default:
          return colors.neutral900;
      }
    }}!important;
    background: ${(props) => {
      switch (props.type) {
        case "primary":
          return colors.primary600;
        case "secondary":
          return colors.neutral300;
        case "plain":
          return "transparent";
        default:
          return colors.primary100;
      }
    }} !important;

    border-color: ${(props) => {
      switch (props.type) {
        case "primary":
        case "secondary":
        case "plain":
          return "transparent";
        default:
          return colors.neutral900;
      }
    }} !important;

    box-shadow: none !important;
  }

  &.ant-btn:focus {
    color: ${(props) => {
      switch (props.type) {
        case "primary":
          return colors.white;
        case "secondary":
          return colors.neutral900;
        case "plain":
          return colors.primary900;
        default:
          return colors.neutral900;
      }
    }} !important;
    background: ${(props) => {
      switch (props.type) {
        case "primary":
          return colors.primary500;
        case "secondary":
          return colors.neutral400;
        case "plain":
          return "transparent";
        default:
          return colors.primary200;
      }
    }} !important;
    border-color: ${(props) => {
      switch (props.type) {
        case "primary":
        case "secondary":
        case "plain":
          return "transparent";
        default:
          return colors.neutral900;
      }
    }} !important;
  }
`;

export default function ButtonSystem({ children, type, ...props }) {
  return (
    <CustomButton type={type} {...props}>
      {children}
    </CustomButton>
  );
}
