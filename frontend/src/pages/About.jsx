import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import { Button } from '@material-ui/core';

import { branchService } from '../services/branchService'

class _About extends Component {

    state = {
        branches: [],
        center: {
            lat: 32.0853,
            lng: 34.7818
        },
        zoom: 7


    }

    componentDidMount = () => {

        branchService.query()
            .then(branches => this.setState({ branches }))
    }

    onGetPos = (coords) => {
        this.setState({ center: coords, zoom: 14 })

    }


    render() {
        const { branches } = this.state
        if (!branches.length) return <div>Loading...</div>

        const style = {
            width: '80%',
            height: '80%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }

        return (
            <React.Fragment>
                <Map initialCenter={this.state.center} style={style} center={this.state.center} google={this.props.google} zoom={this.state.zoom}>

                    {branches.map(branch => {
                        return (
                            <Marker key={branch._id} position={branch.pos}
                                name={branch.name}>

                                <InfoWindow visible={true}>
                                    <div>{branch.name}
                                    </div>
                                </InfoWindow>
                            </Marker>
                        )
                    })}
                </Map>
                <div className="locations center">
                    <Button size="small" variant="contained" onClick={() => { this.onGetPos({ "lat": 31.771959, "lng": 35.217018 }) }}>Jerusalem</Button>
                    <Button size="small" variant="contained" onClick={() => { this.onGetPos({ "lat": 32.08088, "lng": 34.78057 }) }}>Tel Aviv</Button>
                    <Button size="small" variant="contained" onClick={() => { this.onGetPos({ "lat": 32.794044, "lng": 34.989571 }) }}>Haifa</Button>
                </div>
            </React.Fragment>
        );
    }
}

export const About = GoogleApiWrapper({
    apiKey: ('AIzaSyA7wFxeGayDFtxLfft53sDr7sMu9cj7Vio')
})(_About)