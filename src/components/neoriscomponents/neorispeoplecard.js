import React, { Component } from 'react';

class NeorisPeopleCard extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const {texto, people}=this.props;
        return (
            <div>
                <h1>This is the PeopleCard {people.name}</h1>

            </div>
        );
    }
}

export default NeorisPeopleCard;
