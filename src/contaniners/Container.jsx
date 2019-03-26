import React, { Fragment, Component } from 'react'
import ContainerForm from '../components/ContainerForm.jsx'
export const Container = props => {
    return <Fragment>
        <ContainerForm isShowHeader={props.isShowHeader}/>
    </Fragment>
}
