import React, { Component } from 'react';
import NeorisPeopleCard from './neorispeoplecard'

class NeorisList extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { infolist } = this.props;
        return (
            <div>
                {infolist.map(result =>
                    <NeorisPeopleCard texto={result.name}  people = {result}/>
                )}

            </div>
        );
    }
}

export default NeorisList;
