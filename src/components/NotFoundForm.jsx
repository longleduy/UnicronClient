import React, { Fragment, Component } from 'react'
import appStyles from '../Styles/App.scss'
import otherStyles from '../Styles/Other.scss'
export const NotFoundForm = React.memo((props) => {
    return <Fragment>
    <div className={`${appStyles.mainContent}`}>
        <div className={`${otherStyles.errorForm}`}>
            <label>Page not found</label>
        </div>
    </div>
</Fragment>
})