import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';





class _Dashboard extends Component {
  
    getToysType = () => {
        const data = this.props.toys.reduce(function (acc, currVal) {
            if (!acc[currVal.type]) {
                acc[currVal.type] = currVal.price;
            } else {
                acc[currVal.type] += currVal.price;
            }
            return acc;
        }, {});

        return {
            types: Object.keys(data),
            prices: Object.values(data)
        }

    }

    onGetBack = () => {
        this.props.history.push('/toy')
    }

    render() {
        const { types, prices } = this.getToysType();
        const data = {
            labels: types,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)'],
                    borderColor: 'rgba(192,192,192,0.3)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(192,192,192,0.3)',
                    hoverBorderColor: 'rgba(192,192,192,0.3)',
                    data: prices
                }
            ]
        };

        const options = {
            title: {
                display: true,
                text: 'Sum Potential income per type'
            }
        }

        return (
            <div>
                <Doughnut data={data} options={options}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        toys: state.toyReducer.toys
    }
}



export const Dashboard = connect(mapStateToProps)(_Dashboard)

// getAvgPrices(items) {
//     const itemsObj = {}
//     for (const key in items) {
//         let type = items[key].type
//         if (!itemsObj[type]) {
//             itemsObj[type] = {
//                 accPrice : 0,
//                 freq: 0
//             }    
//         }
//         itemsObj[type].accPrice += items[key].price
//         itemsObj[type].freq += 1
//     }

//     for (const key in itemsObj) {
//         itemsObj[key].avg = itemsObj[key].accPrice/itemsObj[key].freq
//     }
//     return itemsObj
// }

// getAvgPriceData(items) { 
    
//     const itemCategories = utils.getUniqueHeaders(items,'type')

//     const itemAvgPrice = this.getAvgPrices(items)
//     const itemAvgPriceArray = itemCategories.map(type => itemAvgPrice[type].avg)

//     const randomColorArray = itemCategories.map(item => utils.getRandomColor(0.2))
//     return {
//         labels: itemCategories,
//         datasets: [{
//             label: 'Item Avg Price',
//             data: itemAvgPriceArray,
//             backgroundColor: randomColorArray,
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderWidth: 1
//         }]
//     }
// }