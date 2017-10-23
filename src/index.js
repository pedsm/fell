import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Button } from 'antd'

export default class App extends React.Component {
    render() {
        return(
            <div>
                <div id="sidebar"></div>
                    <Button>Hello</Button>
                <div id="map">
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
