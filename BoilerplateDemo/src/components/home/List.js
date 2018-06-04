import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { List } from 'semantic-ui-react';
import Item from './Item';

class ListHome extends Component {



  renderItems() {
    const { data } = this.props;

    return data.map((item, index) => {
      return (
        <Item key={item.id} item={item} />
      );
    })
  }

  render() {
    const renderItems = this.renderItems();

    return (
      <List divided relaxed>
        {renderItems}
      </List>
    );
  }
}

ListHome.propTypes = {
  data: PropTypes.array
};

export default ListHome;
