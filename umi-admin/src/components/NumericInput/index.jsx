import React from "react";
import { Input } from "antd";

export default class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    // eslint-disable-next-line no-restricted-globals
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (!value) {
      return;
    }
    const val = String(value).trim();
    if (!val) {
      return;
    }
    if (val.charAt(val.length - 1) === "." || val === "-") {
      onChange(val.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        maxLength={25}
      />
    );
  }
}
