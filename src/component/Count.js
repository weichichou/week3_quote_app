import React, { Component } from 'react';

export default class Count extends Component {
    render(){
        const distinctAuthor = [...new Set(this.props.quotes.map(quote => quote.quoteAuthor))];
        return(
            <div>
                <h4>Number of quotes: {this.props.quotes.length}</h4>
                <h4>Number of authors: {distinctAuthor.length}</h4>
            </div>
        )
    }
}