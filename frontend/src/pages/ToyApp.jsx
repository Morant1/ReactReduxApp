import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



import { loadToys, removeToy } from '../store/actions/toyActions'
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'


class _ToyApp extends Component {

    state = {
        filterBy: {
            sort: 'name'
        }
    }

    componentDidMount() {
        this.props.loadToys(this.state.filterBy)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.props.loadToys(this.state.filterBy))

    }

    render() {
        const { toys } = this.props
        if (!toys) return <div>Loading....</div>
        return (
            <React.Fragment>
                <div className="main-header center">
                    <ToyFilter onSetFilter={this.onSetFilter}></ToyFilter>
                </div>
                <ToyList removeToy={this.props.removeToy} toys={toys} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        toys: state.toyReducer.toys,
    }
}
const mapDispatchToProps = {
    loadToys,
    removeToy

}

_ToyApp.propTypes = {
    toys: PropTypes.array
}
_ToyApp.defaultProps = {
    toys: []
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)