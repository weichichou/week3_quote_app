import React, { Component } from 'react';
import Quote from './Quote';

export default class QuoteSearcher extends Component {
    state = {
        quotes: []
    }
    
    componentDidMount(){
       fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
           .then(res => res.json())
           .then(data => this.setState({quotes: data.results}))
           .catch(console.error);
    }

    render(){
        return(
            <div>
                { this.state.quotes === [] && 'Loading...' }
                { this.state.quotes !== [] && 
                    <p>{this.state.quotes.map((quote)=>{
                        return  <Quote key={quote._id} quoteText={quote.quoteText} quoteAuthor={quote.quoteAuthor}/>
                    })}</p>
                }
            </div>
        )
    }
}