import React, { Component } from "react";
import { Box, Color } from "ink";

type ErrorHandlerProps = {
  children?: React.ReactNode;
};

type ErrorHandlerState = {
  hasError: boolean;
  error?: Error;
};

class ErrorHandler extends Component<ErrorHandlerProps> {
  state: ErrorHandlerState;

  constructor(props: ErrorHandlerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorHandlerState {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError)
      return (
        <Box flexDirection="column">
          <Color hex="#ffffff" bgHex="#ff0000">
            {"Something has gone wrong!"}
          </Color>
          <Color hex="#ffffff" bgHex="#ff0000">
            {this.state.error?.message}
          </Color>
        </Box>
      );
    return this.props.children;
  }
}

export default ErrorHandler;
