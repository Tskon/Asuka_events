import {Component} from 'react'

export default class About extends Component {
  constructor(props){
    super(props)
    this.header = 'About page'
  }
  render(){
    return (
      <h1>{this.header}</h1>
    )
  }
}
