import React, { Fragment, PureComponent } from 'react'
import {withRouter} from 'react-router-dom'
import appStyles from '../Styles/App.scss'
import otherStyles from '../Styles/Other.scss'

class ErrorForm extends PureComponent {
    render() {
        return <Fragment>
            <div className={`${appStyles.mainContent}`}>
                <div className={`${otherStyles.errorForm}`}>
                    <label>Something went wrong</label>
                </div>
            </div>
        </Fragment>
    }
}
export default withRouter(ErrorForm);