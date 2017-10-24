import React from 'react'
import ReactDOM from 'react-dom' 
import styles from './styles'
import params from './params.js'
import Sidebar from './Sidebar.js'
import enUS from 'antd/lib/locale-provider/en_US';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { 
    Input,
    Button, 
    Modal,
    LocaleProvider,
    Form
} from 'antd'

export default class App extends React.Component {
    constructor(props) {
        super(props)
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
            map: null,
            dialog: {
                visible: false,
                inputs: []
            }
        }
    }
    
    // Creates a map reference
    start = (map) => { this.setState({ map }) }

    // Toggles the modal, does not set content
    toggleModal = () => {
        this.setState((prev, props) => {
            let state = Object.assign(prev)    
            state.dialog.visible = !prev.dialog.visible
        })
    }

    // Handles the menu click from the sidebar Item
    handleClick = (item, key) => {
        switch(item.key) {
            case 'get':
                this.setState((prev) => {
                    let state = Object.assign(prev)
                    state.dialog.inputs = [
                        { name: 'url' },
                        { name: 'submit' },
                    ]
                }, this.toggleModal())
            break;
            default:
                console.warn('unimplemented feature')
        }
    }
    makeForm = (dialog) => {
        console.log(dialog)
        if(dialog.inputs.length === 0) {
            return <span/>
        }
        return (
            <Form style={{ maxWidth: 400 }}>
                {dialog.inputs.map((a,i) => {
                    return (
                        <Form.Item key={i}>
                            <Input placeholder={a.name} key={i} />
                        </Form.Item>
                    )
                })}
            </Form>
        )
    }

    render() {
        const { root, sidebar, map } = styles;

        return (
            <div style={root}>
                <Modal 
                    visible={this.state.dialog.visible} 
                    title={'Add Data'}
                    onOk={this.toggleModal}
                    onCancel={this.toggleModal}
                >
                    {this.makeForm(this.state.dialog)}
                </Modal>
                <Sidebar handleClick={this.handleClick.bind(this)} />
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
ReactDOM.render(<LocaleProvider locale={enUS}><App /></LocaleProvider>, document.getElementById("app"));
