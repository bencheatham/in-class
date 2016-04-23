import React, { Component, PropTypes } from 'react'


export default class User extends Component {
   constructor(props) {
     super(props)
     this.handleKeyUp = this.handleKeyUp.bind(this)
     this.handleGoClick = this.handleGoClick.bind(this)
   }

   componentWillReviewProps(nextProprs) {
     if (nextProps.value !== this.props.value) {
       this.setInputValue(nextProps.value)
     }
   }

   setInputValue(val) {
    this.refs.input.value = val
   }

   handleKeyUp(e) {
     if (e.keyCode === 13) {
       this.handleGoClick()
     }
   }

   handleGoClick() {
    this.props.onChange(this.getInputValue())
   }

   render() {
     return (
       <div>
         <p>Type a username</p>
         <input size="40"
                ref="input"
                defaultValue={this.props.value}
                onKeyUp={this.handleKeyUp} />
         <button onClick={this.handleKeyUp}>
           Get 'er Done!
         </button>
       </div>
     )
   }
}

User.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired

}

export default User
