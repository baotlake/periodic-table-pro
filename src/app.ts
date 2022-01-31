import { Component } from 'react'
import { initStorage } from './utils/storage'
import './app.scss'

class App extends Component {

  componentDidMount () {
    initStorage()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
