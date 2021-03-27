import React, {Component} from 'react';
import { Button } from 'antd';

class SatelliteList extends Component {
    render() {
        return (
            <div className="sat-list-box">
                <Button type="primary" className="sat-btn">Track on the map</Button>
                <hr/>
                <div>data</div>
            </div>
        );
    }
}

export default SatelliteList;
