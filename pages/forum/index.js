import {Component} from 'react'
import css from '../../scss/forum.index.scss'
import Attachcss from '../attach-css';

export default class Forum extends Component{
  render(){
    <Attachcss include={['_app', 'forum']}/>
    return (
      <main>
        <h1 className={css.example}>Asuka forum</h1>
      </main>
    )
  }
}