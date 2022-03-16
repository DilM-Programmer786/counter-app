import React, { Component } from 'react';   

export default class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag3'],
    };

    styles = {
        fontSize: 10,
        fontWeight: "bold",
    };
  render() {
    return (
      <div>
      <span style={this.styles} className={this.getBadgeClasses()}>
        {this.formatCount()}
      </span>
      <button className='btn btn-secondary btn-sm'>
          Increment
      </button>
      <ul>
          <li>
              {this.state.tags.map(tag =><li>{tag}</li>)}
          </li>
      </ul>
      </div>
    )
  }

  getBadgeClasses(){
      let classes = "badge m-2 badge-";
      classes += (this.state.count == 0) ? "warning" : "primary";
      return classes;
  }
  formatCount(){
      const count = this.state.count;
     return count == 0 ? 'Zero' : count;
  }


}
