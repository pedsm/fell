import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles'
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { Menu, Button, Icon, Modal } from 'antd'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        console.log(styles)
        const low = navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                coords: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
            })
        })
        this.state = {
            coords: {
                lat: 0,
                lon: 0
            },
            map: null
        }
    }
    
    start = (map) => {
        this.setState({ map })
        console.log(map)
    }

    handleClick = (e) => {

    }

    render() {
        const { root, sidebar, map } = styles;
        const params = {
            v: '3.exp',
            key: 'AIzaSyAvI1of8u5aDRBmUSDAsLPy6BfUtAx5Lws'
        } 

        return (
            <div style={root}>
                <Modal visible={true} title={'Add Data'}>
                    Get request
                </Modal>
                <div id="sidebar" style={sidebar}>
                    <img src="img/logo.png" alt="" style={{width: sidebar.width, padding: 20}} />
                    <Menu>
                        <Menu.Item onclick={this.handleClick}>
                            <Icon type="download" />
                            Get request
                        </Menu.Item>
                        <Menu.Item onclick={this.handleClick}>
                            <Icon type="download" />
                            Post request
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item onclick={this.handleClick}>
                            <Icon type="hdd" />
                            File
                        </Menu.Item>
                    </Menu>
                </div>
                <div id="map" style={map}>
                    <Gmaps 
                        params={params}
                        width={'100%'}
                        height={'100%'}
                        zoom={12}
                        lat={this.state.coords.lat}
                        lng={this.state.coords.lon}
                        onMapCreated={this.start}
                    >
                    </Gmaps>
                </div>
            </div>
        )
    }
}

// eslint-ignore-next-line
ReactDOM.render(<App />, document.getElementById("app"));
