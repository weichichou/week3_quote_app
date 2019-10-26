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

    updateLikeness = (id, likeness) => {
        this.setState({
            quotes: this.state.quotes.map((quote)=>{
                if (quote._id === id) {
                    return {...quote, likeness: likeness} 
                } else {
                    return quote
                }
            })
        })
    }


    render(){
        const numLikes = this.state.quotes.filter(quote => quote.likeness === true).length;
        const numDislikes = this.state.quotes.filter(quote => quote.likeness === false).length;

        return(
            <div>
                <h3>Liked: {numLikes} / Disliked: {numDislikes}</h3>
                { this.state.quotes === [] && 'Loading...' }
                { this.state.quotes !== [] && 
                    <p>{this.state.quotes.map((quote)=>{
                        return  <Quote updateLikeness={this.updateLikeness} key={quote._id} id={quote._id} quoteText={quote.quoteText} quoteAuthor={quote.quoteAuthor} likeness={quote.likeness}/>
                    })}</p>
                }
            </div>
        )
    }
}