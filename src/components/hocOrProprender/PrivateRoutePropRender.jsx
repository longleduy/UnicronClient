import React, { Fragment, Component } from 'react'
import { withApollo } from "react-apollo"
import jwt from 'jsonwebtoken'
import { withRouter,Redirect } from 'react-router-dom'
import {QUERY_USER_INFO} from '../../graphql/local/state_mutation'
class PrivateRoutePropRender extends Component{
    constructor(props) {
        super(props); 
    }
    checkAuthen = () => {
        let payload = null;
        let token = null;
        let isAuthen = true;
        try {
            token = JSON.parse(localStorage.getItem('token'));
            payload = jwt.decode(token);
        } catch (error) {
            isAuthen = false;
        }
        if(payload == null || payload ==''){
            isAuthen = false;
        }
        return isAuthen;
    }
    componentDidMount = () => {
        $(window).scrollTop(0);
    }
    render(){
        let au = this.checkAuthen();
        if(!au){
            return <Redirect
        to={{
          pathname: "/"
        }}
      />
        }
        return (<Fragment>{this.props.privateRoutePropRender()}</Fragment>)
    }
}
export default withRouter(withApollo(PrivateRoutePropRender));