// import React, {Component} from 'react';
// import { List, Avatar, Button, Checkbox, Spin } from 'antd';
// import satellite from "../assets/images/satellite.svg";

// class SatelliteList extends Component {
//     constructor(){
//         super();
//         this.state = {
//             selected: [],
//             isLoaded: false
//         };
//     }

//     onShowSatMap = () =>{
//         this.props.onShowMap(this.state.selected);
//     }

//     render() {
//         const satList = this.props.satInfo ? this.props.satInfo.above : [];
//         const { isLoaded } = this.props;
//         const { selected } = this.state;
//         console.log(this.state);

//         return (
//             <div className="sat-list-box">
//                 <Button className="sat-list-btn" onClick={this.onShowSatMap} disabled={selected.length === 0}>
//                     Track on the map
//                 </Button>
//                 <hr/>

//                 {
//                     isLoaded ?
//                         <div className="spin-box">
//                             <Spin tip="Loading..." size="large" />
//                         </div>
//                         :
//                         <List
//                             className="sat-list"
//                             itemLayout="horizontal"
//                             size="small"
//                             dataSource={satList}
//                             renderItem={item => (
//                                 <List.Item
//                                     actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
//                                 >
//                                     <List.Item.Meta
//                                         avatar={<Avatar size={50} src={satellite} />}
//                                         title={<p>{item.satname}</p>}
//                                         description={`Launch Date: ${item.launchDate}`}
//                                     />

//                                 </List.Item>
//                             )}
//                         />
//                 }
//             </div>
//         );
//     }


//     // showMap = () => {
//     //     const { selected } = this.state;
//     //     this.props.onShowMap(selected);
//     // }

//     // adding/removing sats from the list
//     addOrRemove = (sat, status, list) => {
//         // check if it's already in selected 
//             // add if status is true and is not in list 
//         // use array.some(item => item == value) to determin if sat is in list 
//         const found = list.some(item => item.satid === sat.saitid);
//         if(status && !found){
//             // add to the list 
//             list = [...list, sat];
//         }
//         if(!status && found){
//             // remove from the list 
//             list = list.filter(item => item.satid !== sat.satid);
//         }
//         return list;
//     }

//     // for the checkbox 
//     onChange = e => {
//         // get datainfo and checkbox status 
//         const {dataInfo, checked } = e.target; 

//         // add/remove selected satellite to/from selected array
//         const { selected } = this.state; 
//         const list = this.addOrRemove(dataInfo, checked, selected); 

//         // update by se{tting the state 
//         this.setState({
//             selected: list
//         })
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if(prevProps.satInfo !== this.props.satInfo) {
//             this.setState({selected: []})
//         }
//     }
// }

// export default SatelliteList;
import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            selected: [],
            isLoad: false
        };
    }

    onChange = e => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid);
        if(status && !found){
            list.push(item)
        }

        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    onShowSatMap = () =>{
        console.log("show track");
        console.log(this.state.selected);
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <div className="btn-container">
                   <Button
                     className="sat-list-btn"
                     size="large"
                     disabled={selected.length === 0}
                     onClick={this.onShowSatMap}
                   >
            Track on the map
          </Button>
        </div>
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
}

export default SatelliteList;
