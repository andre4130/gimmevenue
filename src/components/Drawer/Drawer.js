import React, { Component } from 'react';
import Wrapper from './Wrapper';
import Overlay from './Overlay';
import Content from './Content';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: typeof props.visible !== 'undefined' ? props.visible : false
    };
  }

  toggleVisibility = visible => {
    this.props.onRequestChange(visible);
    this.setState({
      visible: visible
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.visible === nextProps.visible) return;
    this.toggleVisibility(nextProps.visible);
  }

  render() {
    return (
      <Wrapper
        visible={this.state.visible}
        innerRef={comp => {
          this.wrapper = comp;
        }}
      >
        <Overlay
          onClick={() => this.toggleVisibility(false)}
          visible={this.state.visible}
        />
        <Content visible={this.state.visible}>
          {this.props.children}
        </Content>
      </Wrapper>
    );
  }
}

export default Drawer;
