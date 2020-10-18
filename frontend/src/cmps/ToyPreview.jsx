import React from 'react'
import {Link}  from 'react-router-dom'
import { Button } from '@material-ui/core';

export function ToyPreview({ toy,removeToy }) {

    return (
        <div className="toy-preview center">
            <img className="toy-img" alt="toy-img" style={{width:'30px'}} src="toy.png"/>
            <div className='type'>
                {toy.type}
                </div>
            <hr/>
            <h1 className="preview-name">{toy.name}
            </h1>
            <h4>Price:{toy.price}$</h4>
            <Button onClick={()=>removeToy(toy._id)} size="small" variant="contained" >Delete</Button>
            <Link to={`/toy/${toy._id}`}><Button size="small" variant="contained">Details</Button></Link>
            <Link to={`/toy/edit/${toy._id}`}><Button size="small" variant="contained">Edit</Button></Link>
        </div>
    )
}
