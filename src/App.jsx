import React, { Fragment, PureComponent, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from "react-apollo"
import { QUERY_USER_INFO } from './graphql/local/state_mutation'
import { Header } from './contaniners/Header.jsx'
import { Container } from './contaniners/Container.jsx'
import {Footer} from './contaniners/Footer.jsx'
import styles from './Styles/App.scss'

class App extends PureComponent {
    componentDidCatch(error, info){
        this.props.history.push({
            pathname: '/error',
            state: { error:'Something went wrong', log: "2" }
        });
    }
    render() {
        const isShowHeader = (location.hash).indexOf('/sign/sign-up') == -1  && (location.hash).indexOf('/sign/sign-in') == -1 && location.hash != '#/';
        return <Query query={QUERY_USER_INFO}>
            {({ loading, error, data }) => {
                const { isAuthen } = data.queryUserInfo;
                return <Fragment>
                    <div className={styles.app}>
                      {isShowHeader && <Header data={data}/>}  
                        <Container isShowHeader={isShowHeader}/>
                        {isAuthen && <Footer/>}
                    </div>
                </Fragment>
            }}
        </Query>
    }
}
export default withRouter(App);
