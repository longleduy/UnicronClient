import React, { Fragment, PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import { Query } from "react-apollo"
import styles from '../../../../Styles/Post.scss'
import appStyles from '../../../../Styles/App.scss'
import {UPDATE_CHAT_BOX_MUTATION} from '../../../../graphql/mutations/user_mutation'
import {QUERY_USER_INFO} from '../../../../graphql/local/state_mutation'
import MutationPropRender from '../../../hocOrProprender/MutationPropRender.jsx'
class PostAuthorOption extends PureComponent {
    state = {
        showAuthorOption: false
    }
    handleAuthorOption = (status) => {
        this.setState({
            showAuthorOption: status
        })
    }
    openChatBox = async (action,userInfo) => {
        let to = {
            id:userInfo.userID,
            profileName:userInfo.profileName,
            avatar: userInfo.avatar
        }
        let result = await action({
            variables: { isOpen: true, to}
        });
      }
    render() {
        const { showAuthorOption } = this.state;
        const { userInfo } = this.props;
        if (showAuthorOption) {
            return <Query query={QUERY_USER_INFO}>
            {({ loading, error, data }) => { 
                if(loading) return null;
                return <div className={styles.authorOptionDiv} onMouseLeave={() => this.handleAuthorOption(false)}>
                <span className={styles.authorOptionInfo}>
                    {userInfo.avatar ? <img src={`${userInfo.avatar}`} className={styles.authorOptionavatar} /> :
                        <label className={styles.labelAvatar}>{userInfo.profileName.charAt(0)}</label>}
                    <label className={styles.authorOptionProfileName}>{userInfo.profileName}</label>
                </span>
                <span className={styles.authorOptionAction}>
                    <Button className={`${appStyles.buttonSvg} ${styles.postEditBtn}`}>
                        <svg viewBox="0 0 24 24">
                        <path fill="#000000" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                        </svg>
                    </Button>
                    {data.queryUserInfo.userID != userInfo.userID && <MutationPropRender mutation={UPDATE_CHAT_BOX_MUTATION}
                        mutationPropRender={(action) => (
                    <Button className={`${appStyles.buttonSvg} ${styles.postEditBtn}`} 
                    onClick={() => this.openChatBox(action,userInfo)}>
                        <svg viewBox="0 0 24 24">
                        
                        <path fill="#ccc" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"></path>
                        </svg>
                    </Button>
                        )}/>}
                </span>
            </div>
            }}</Query>
        }
        return null;
    }
}
export default PostAuthorOption
