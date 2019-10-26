import React, { Component } from 'react';
import './AddQuote.css';

export default class AddQuote extends Component {
    state = {
        id:'',
        text: '',
        author: ''
    }
    
    handleChange = (event) => {
        this.setState({
            id: Math.round(Math.random()*100000000000),
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addQuote(this.state.id, this.state.text, this.state.author);
        this.setState({text:'', author: ''})
    }
    
    render(){
        return (
            <div className='add-quote'>
                <h3>Add Your Own Quote</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Your Quote:
                        <input onChange={this.handleChange} type='text' name='text' value={this.state.text}></input>
                    </label>
                    <label>Your Name:
                        <input onChange={this.handleChange} type='text' name='author' value={this.state.author}></input>
                    </label>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}