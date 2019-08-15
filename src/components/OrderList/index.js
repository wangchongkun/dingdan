import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/mock/orders.json').then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data
                    })
                })
            }
        })
    }

    handleSubmit = (id, comment, stars) => {
        // fetch('/saveComment').then(()=>{

        // })
        const newData = this.state.data.map((item, index) => {
            return item.id == id ?
                {
                    ...item, 
                    comment, 
                    stars, 
                    ifCommented: true
                } : item;
        });
        this.setState({
            data: newData
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map((item, index) => {
                        return <OrderItem key={item.id} data={item}
                            onSubmit={this.handleSubmit} />
                    })
                }
            </div>
        );
    }
}

export default OrderList;