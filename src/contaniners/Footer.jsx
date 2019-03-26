import React, { PureComponent } from 'react'
import { withApollo } from "react-apollo"
import FooterForm from '../components/FooterForm.jsx'
//Todo: GraphQL
import { SET_USER_STATUS_MUTATION } from '../graphql/mutations/user_mutation'
class Footer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClose;
    }
    componentDidMount = async () => {
        await this.props.client.mutate({
            variables: { status: "ON" },
            mutation: SET_USER_STATUS_MUTATION
        })
        window.addEventListener("beforeunload", this.handleClose = async (ev) =>{
            ev.preventDefault();
           let a = this.props.client.mutate({
                variables: { status: "OFF" },
                mutation: SET_USER_STATUS_MUTATION
            })
        });
    }
    componentWillUnmount = async () => {
        window.removeEventListener("beforeunload", this.handleClose);
        await this.props.client.mutate({
            variables: { status: "OFF" },
            mutation: SET_USER_STATUS_MUTATION
        })
    }
    render() {
        return <FooterForm />
    }
}
export default withApollo(Footer)