import React from 'react'
import GoogleApiComponent from './GoogleApiComponent'
import MapComponent from './MapComponent'

export class Container extends React.Component {
    render() {
        const style = {
            width: '100vw',
            height: '50vh'
        }
        return (
            <div style={style}>
                <MapComponent google={this.props.google}
                />
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyB6A_FPXPxidc3vWP-Z5eEXddcNrti4iVM'
})(Container)
