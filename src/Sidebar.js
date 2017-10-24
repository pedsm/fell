import React from 'react'
import styles from './styles'
import { 
    Menu, 
    Icon, 
} from 'antd'

export default class Sidebar extends React.Component {
    render() {
        const { sidebar } = styles;
        const { handleClick } = this.props;
        return (
            <div id="sidebar" style={sidebar}>
                <img src="img/logo.png" alt="" style={{width: sidebar.width, padding: 20}} />
                <Menu onClick={handleClick}>
                    <Menu.Item key="get">
                        <Icon type="download" />
                        Get request
                    </Menu.Item>
                    <Menu.Item key="post">
                        <Icon type="download" />
                        Post request
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="file">
                        <Icon type="hdd" />
                        File
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
