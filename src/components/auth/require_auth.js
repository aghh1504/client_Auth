import React, {Component} from 'react'
import {connect} from 'react-redux'

export default function(ComposeComponent) {
  class Authenticate extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    componentWillMount() {
      if(!this.props.authenticate) {
        this.context.router.push('/')
      }
    }
    componentWillUpdate(nextProps) {
      if(!nextProps.authenticate) {
        this.context.router.push('/')
      }
    }

    render() {
      return(
        <ComposeComponent {...this.props}/>
      )
    }
  }
  const mapStateToProps = state => {
    return {
      authenticate: state.auth.authenticated
    }
  }
  return connect(mapStateToProps)(Authenticate)
}
