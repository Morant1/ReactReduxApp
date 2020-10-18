import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { addToy, updateToy } from '../store/actions/toyActions.js';
import { toyService } from '../services/toyService.js';
// import { cloudinary } from '../services/cloudinary-service.js';


class _ToyEdit extends Component {
    state = {
        toy: {
            name: '',
            price: '',
            type: '',
            inStock: true
        }
    }

    componentDidMount() {
        const toyId = this.props.match.params._id

        if (toyId) {
            toyService.getById(toyId)
                .then(toy => {
                    this.setState({ toy })
                })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            const toyId = this.props.match.params._id;
            if (toyId) {
                toyService.getById(toyId)
                    .then(toy => {
                        this.setState({ toy })
                    })
            }

        }
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value = (target.type === 'number') ? +target.value : target.value;
      
       

        this.setState(prevState => {
            return {
                toy: {
                    ...prevState.toy,
                    [field]: value
                }
            }
        })
    }
    onSaveToy = (ev) => {
        ev.preventDefault()
        const { toy } = this.state

        if (this.state.toy._id) {
            this.props.updateToy(toy)

        } else {
            this.props.addToy(toy)
        }

        this.props.history.push('/toy')

    }

    // uploadImg = (ev) => {
    //     cloudinary.uploadImg(ev.target);
    // }

    render() {
        const { toy } = this.state
        return (
            <div>
                <form onSubmit={this.onSaveToy} className="edit-toy flex">
                    <label>Name</label>
                    <input autoFocus placeholder='Toy Name' type="text" value={toy.name} onChange={this.handleInput} name="name" />
                    <label>Price</label>
                    <input type="number" value={toy.price} placeholder='Toy Price' onChange={this.handleInput} name="price" />
                    <label>Type</label>
                    <input type="text" value={toy.type} placeholder='Toy type' onChange={this.handleInput} name="type" />
                    <label>Stock status</label>
                    <select name="inStock" value={toy.inStock} onChange={this.handleInput}>
                        <option value="true">True</option>
                        <option value="False">False</option>
                    </select>
                    <Button type="submit" size="small" variant="contained">Save</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toys: state.toyReducer.toys
    }
}

const mapDispatchToProps = {
    addToy,
    updateToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)




