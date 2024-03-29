import React, { Component } from 'react';
import Quote from './Quote';
import AddQuote from './AddQuote';
import Count from './Count'

export default class QuoteSearcher extends Component {
    state = {
        quotes: null,
        search:'tree'
    }
    
    fetch = () => {
        fetch(`https://quote-garden.herokuapp.com/quotes/search/${this.state.search}`)
           .then(res => res.json())
           .then((data) => {   
              this.setState({quotes: this.removeDuplicate(data.results)})
           })
           .catch(console.error);
    }
    
    removeDuplicate = (array) => {
        let seen = {};
        const newArray = [];
        for (const element of array){
            if(!seen.hasOwnProperty(element.quoteText)){
                newArray.push(element);
                seen[element.quoteText] = true;
            }
        }
        return newArray; 
    }
   

    componentDidMount(){
       this.fetch();
    }

    addQuote = (id, text, author) => {
        const newQuote = {
            _id: id,
            quoteText: text,
            quoteAuthor: author
        }
        this.state.quotes.unshift(newQuote);
        this.setState({
            quotes: this.state.quotes
        })
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

    handleChange = (event) => {
       this.setState({
           search: event.target.value
       })
    }

    handleSubmit = (event) => {
       event.preventDefault();
       this.setState({quotes: null})
       this.fetch();
    }

    render(){
        
        let numLikes;
        let numDislikes;

        if(this.state.quotes){
            numLikes = this.state.quotes.filter(quote => quote.likeness === true).length;
            numDislikes = this.state.quotes.filter(quote => quote.likeness === false).length;
        }      

        return(
            <div>
                
                
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type='text' value={this.state.search}/>
                    <input type='submit' value='Search!' />
                </form>
                
                { this.state.quotes &&  <Count quotes={this.state.quotes}/>}
               
                <AddQuote addQuote={this.addQuote}/>

                <h3>Liked: {numLikes} / Disliked: {numDislikes}</h3>

                { !this.state.quotes && 'Loading...' }
                { (this.state.quotes && this.state.quotes.length === 0) && 'Results not found!'}
                { this.state.quotes && 
                    <div>{this.state.quotes.map((quote)=>{
                        return  <Quote updateLikeness={this.updateLikeness} key={quote._id} id={quote._id} quoteText={quote.quoteText} quoteAuthor={quote.quoteAuthor} likeness={quote.likeness}/>
                    })}</div>
                } 

            </div>
        )
    }
}