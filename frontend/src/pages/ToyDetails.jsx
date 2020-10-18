import React, { Component } from 'react'
import { Button } from '@material-ui/core';


import { toyService } from '../services/toyService';
import { Chat } from '../cmps/Chat'

export class ToyDetails extends Component {

    state = {
        toy: null,
        isPopUp: false
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.closePopup);
        this.loadToy();
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.closePopup);
      }

    closePopup = (ev) => {
        if (ev.key === "Escape"){
            this.setState({isPopUp:false})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params._Id !== this.props.match.params._Id) {
            this.loadToy()
        }
    }

    loadToy = () => {
        const toyId = this.props.match.params._id
        toyService.getById(toyId)
            .then(toy => this.setState({ toy }));


    }

    onGetBack = () => {
        this.props.history.push('/toy')
    }

    openPopUp = () => {
        this.setState({isPopUp:true});
    }

    render() {
        const { toy, isPopUp } = this.state
        if (!toy) return <div>Loading...</div>

        return (
            <div className="toy-details center">
                <div className="type">Type:{toy.type}</div>
                <hr />
                <h1>Name:{toy.name}</h1>
                <h2>Price:{toy.price}</h2>

                <h3>{toy.inStock ? 'IN STOCK' : 'NOT IN STOCK'}</h3>
                <Button onClick={this.onGetBack} size="small" variant="contained">Back</Button>
                <Button onClick={() => { this.openPopUp() }} size="small" variant="contained">Open Chat✉</Button>
                {isPopUp && <Chat id={toy._id} name={toy.name}/>}

            </div>
        )
    }
}



