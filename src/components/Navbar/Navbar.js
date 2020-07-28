import React, { Component } from 'react';
import Item from './Item';
import Button from './Button';
import Content from './Content';
import Drawer from '../../components/Drawer';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from '../../components/Icon';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }


  handleToggle = () => this.setState({ open: !this.state.open });


  render() {
    return (
      <div>
        <FloatingActionButton onClick={this.handleToggle}>
          <Icon name="menu" />
        </FloatingActionButton>
        <Drawer
          visible={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <Content>
            <h3>Gimme Venue App</h3>
            <p>
              Gimme Venue is an App that will help you browse through different music venues in different cities of the world.
              </p>
            <p>
              Either if you're a music lover searching for gigs in a specific city, or if you're a band and you want to get in contact with a specific venue in order
              to play, you will find it here.
            </p>
          </Content>
          <Item>
            <Icon name="arrowBack" fill="#104986" />
            <p>insert something here</p>
          </Item>
          <Item
            href="https://honeypotio.github.io/research/pages/london-techmap.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="assessment" fill="#104986" /> Research Report
          </Item>
          <Item
            href="https://www.honeypot.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="info" fill="#104986" /> About
          </Item>
          <Content>
            <Button
              href="https://www.honeypot.io/lp/join?utm_source=techmap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Honeypot
            </Button>
            <small>
              Honeypot is Europe’s developer-focused job platform. We are on a mission to get every developer a great job. To create the London Tech Map, we looked at over 12,000 developer job postings and the tech stacks of over 800 London companies.
            </small>
          </Content>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
