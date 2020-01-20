import React, { createRef, RefObject } from 'react';
import { Input, InputProps } from 'semantic-ui-react';

export type Props = InputProps;

class FocusInput extends React.Component<Props> {
  public inputRef: RefObject<Input> = createRef();
  public componentDidMount() {
    this.inputRef.current?.focus();
  }
  public render() {
    return (
      <Input
        {...this.props}
        ref={this.inputRef}
      />
    )
  }
}

export default FocusInput;
