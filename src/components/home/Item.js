import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { List } from 'semantic-ui-react';

class Item extends Component {

  handleClickItem(item, event) {
    alert(item.name);
  }

  render() {
    const { item } = this.props;

    return (
      <List.Item onClick={this.handleClickItem.bind(this, item)}>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a'>{item.name}</List.Header>
          <List.Description as='a'>{`${item.lastname} - ${item.age}`}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object
}

export default Item
