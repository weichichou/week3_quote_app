import React, { Component } from 'react';
import './Quote.css'

export default class Quote extends Component {
    state = {
        like: null,
        id: this.props.id,

    }

    like = () => {
        this.setState({like: true});
        this.props.updateLikeness(this.state.id, true);
    }

    dislike = () => {
        this.setState({like: false});
        this.props.updateLikeness(this.state.id, false);
    }

    render(){
       let className;
       if (this.state.like === true) {
          className = 'isLiked'
       } else if (this.state.like === false) {
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