import React from 'react'
import PropTypes from 'prop-types'
import {Link}  from 'react-router-dom'
import { Button } from '@material-ui/core';

import { ToyPreview } from './ToyPreview'

export function ToyList({ toys,removeToy }) {
    return (
        <React.Fragment>
        <div className="add-toy">
        <Link to={`/toy/edit`}><Button size="small" variant="contained">Add toy</Button></Link>
        </div>
        <div className="grid-list-container">
            {
                toys.map(toy => <ToyPreview removeToy={removeToy} toy={ toy } key={ toy._id } />)
            }

        </div>
        </React.Fragment>
    )
}

ToyList.propTypes = {
    toys: PropTypes.array
}
ToyList.defaultProps = {
    toys: []
}