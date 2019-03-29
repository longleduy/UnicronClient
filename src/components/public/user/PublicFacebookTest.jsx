import React, { Fragment, Component, PureComponent } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Route, Link, withRouter } from 'react-router-dom'
import { withApollo, Mutation } from "react-apollo"
import Grid from '@material-ui/core/Grid'
//Todo: Styles
import appStyles from '../../../Styles/App.scss'
import styles from '../../../Styles/Public/HomePublic.scss'


class PublicFacebookTest extends PureComponent {
    responseFacebook = (response) => {
        console.log(response);
      }
      componentClicked = () => {
          return false;
      }
    render() {
        return <Fragment>
            <Grid item xs={6} className={`${styles.content} ${styles.signIn} ${appStyles.flexDivCol} `} id="sign-div">
                <FacebookLogin
                    appId="2228743917353964"
                    fields="name,email,picture.width(500).height(500)"
                    callback={this.responseFacebook} 
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>
                            <svg viewBox="0 0 24 24">
                                                <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                                            </svg>
                        </button>
                      )} />
            </Grid>
        </Fragment>
    }
}
export default withApollo(withRouter(PublicFacebookTest));