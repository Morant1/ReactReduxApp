import React, { Component } from 'react'
import { Select, MenuItem, InputLabel,Button } from '@material-ui/core';


export class ToyFilter extends Component {
    state = {
        filter: {
            name: '',
            inStock: '',
            type: '',
            sort: 'name'

        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        let value = target.value;

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }),
            () => this.props.onSetFilter(this.state.filter));

    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }

    render() {
        const { name, inStock, type, sort } = this.state.filter
        return (
            <form className="main-filter-container flex justify-center" onSubmit={this.onFilter}>
                <div className="filter-name">
                    <label className="by-name">By name</label>
                    <input type="text" name='name' value={name} onChange={this.handleChange} />
                </div>
                <div className="filter-stock-type flex">
                <InputLabel id="stock Status">Stock</InputLabel>
                <Select labelId="stock Status" name="inStock" value={inStock} onChange={this.handleChange}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">IN STOCK</MenuItem>
                    <MenuItem value="false">OUT OF STOCK</MenuItem>
                </Select>
                <InputLabel id="type">Type</InputLabel>
                <Select labelId="type" name="type" value={type} onChange={this.handleChange}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Funny">Funny</MenuItem>
                    <MenuItem value="Educational">Educational</MenuItem>
                    <MenuItem value="Adult">Adult</MenuItem>
                </Select>
                </div>
                <div className="filter-sort flex">
                    <InputLabel id="sort">Sort By</InputLabel>
                    <Select labelId="sort" name="sort" value={sort} onChange={this.handleChange}>
                        <MenuItem value="name">name</MenuItem>
                        <MenuItem value="price">price</MenuItem>
                    </Select>
                </div>
                <Button size="small" variant="contained">Filter</Button>
            </form>
        )
    }
}



