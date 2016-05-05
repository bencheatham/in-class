import React, { Component } from 'react';



export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
console.log('in props:   ')
      console.log(props)


  }


  appendIt(){
    console.log('IN APPEND IT CONTAINER')
        console.log((this.props.data.videoSession))
    if(this.props.data.videoSession){
     $('#vid-box').append(this.props.data.videoSession.outerHTML);
    }
  };

  render() {
    const videoSession = this.props.data.videoSession; 
   console.log('in video container')
    console.log(this.props)
    if (videoSession !== null && videoSession !== undefined){
      this.appendIt();
    }


   return (
         <div id="vid-box">

         </div>


  );
 }
}