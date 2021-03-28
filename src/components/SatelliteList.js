import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         selected: [],
    //         isLoad: false
    //     };
    // }
    state = {
        selected: []
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;
        console.log(this.state);

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn" onClick={this.onShowSatOnMap} disabled={selected.length === 0}>
                    Track on the map
                </Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }


    showMap = () => {
        const { selected } = this.state;
        this.props.onShowMap(selected);
    }

    // adding/removing sats from the list
    addOrRemove = (sat, status, list) => {
        // check if it's already in selected 
            // add if status is true and is not in list 
        // use array.some(item => item == value) to determin if sat is in list 
        const found = list.some(item => item.satid === sat.saitid);
        if(status && !found){
            // add to the list 
            list = [...list, sat];
        }
        if(!status && found){
            // remove from the list 
            list = list.filter(item => item.satid !== sat.satid);
        }
        return list;
    }

    // for the checkbox 
    onChange = e => {
        // get datainfo and checkbox status 
        const {dataInfo, checked } = e.target; 

        // add/remove selected satellite to/from selected array
        const { selected } = this.state; 
        const list = this.addOrRemove(dataInfo, checked, selected); 

        // update by se{tting the state 
        this.setState({
            selected: list
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.satInfo !== this.props.satInfo) {
            this.setState({selected: []})
        }
    }
}

export default SatelliteList;
