import React, { Component } from 'react';
import './Quote.css'

export default class Quote extends Component {
    state = {
        id: this.props.id,
    }

    like = () => {
        this.props.updateLikeness(this.state.id, true);
    }

    dislike = () => {
        this.props.updateLikeness(this.state.id, false);
    }

    render(){
       let className;
       if (this.props.likeness === true) {
          className = 'isLiked'
       } else if (this.props.likeness === false) {
           className = 'isDisliked'
       } else {className = ''};

        return (
            <div>
                <p className={className}>{this.props.quoteText}</p>
                <p> By: {this.props.quoteAuthor} {''}
                    <button onClick={this.dislike}>:(</button> {''}
                    <button onClick={this.like}>:)</button>
                </p>
                &nbsp;
            </div>
        )
    }
}