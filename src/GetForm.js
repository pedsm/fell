import React from 'react'
import axios from 'axios'
import axis from 'axislang'
import {
    Input,
    Icon,
    Button,
    Form
} from 'antd'

export default class GetForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            lat: '',
            lon: ''
        }
    }

    handleChange = (e) => {
        const target = e.target
        this.setState((prev, props) => {
            const state = Object.assign(prev)
            state[target.name] = target.value
            return state
        }, () => {console.log(this.state)})
    }

    submit = () => {
        // Do some checking and erroring
        const { url, lat, lon } = this.state
        axios.get(url)
            .then((res) => {
                const parser = new axis()
                try {
                    const lats = parser.parse(lat, res.data)
                    const lons = parser.parse(lon, res.data)
                    const markers = []
                    for(let i=0; i < lats.length; i++) {
                        markers.push({
                            lat: lats[i],
                            lon: lons[i]
                        }) 
                    }
                    this.props.return(markers)
                } catch (e) {
                    console.error(e)
                }
            })
            .catch(e => e)
    }

    render() {
        return(
            <form onChange={this.handleChange}>
                <Input name="url" prefix={<Icon type="user" />} placeholder="url" />
                <Input name="lat" prefix={<Icon type="user" />} placeholder="lat" />
                <Input name="lon" prefix={<Icon type="user" />} placeholder="lon" />
                <Button onClick={this.submit}>Submit</Button>
            </form>
        )
    }
}

// export default Form.create()(GetForm)
