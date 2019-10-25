import React, { Component } from 'react';


export default class Quote extends Component {
    render(){
        return (
            <div>
                <p>{this.props.quoteText}</p>
                <p>By: {this.props.quoteAuthor}</p>
                &nbsp;
            </div>
        )
    }
}