import React, { Fragment,useState } from 'react'
import Button from '@material-ui/core/Button'
import topMemberStyles from '../../../Styles/TopMember.scss'
import appStyles from '../../../Styles/App.scss'
import {UPDATE_CHAT_BOX_MUTATION} from '../../../graphql/mutations/user_mutation'
import MutationPropRender from '../../hocOrProprender/MutationPropRender.jsx'
export const PrivateIndexTopMemberChildForm = React.memo((props) => {
    const { user } = props;
    const [isShowOption, setShowOption] = useState(false);
    const openChatBox = async (action,userInfo) => {
        let to = {
            id:userInfo.userID,
            profileName:userInfo.profileName,
            avatar: userInfo.avatar
        }
        let result = await action({
            variables: { isOpen: true, to}
        });
      }
    return <Fragment>
        <div className={topMemberStyles.userInfoDiv} onMouseOver ={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>
            {user.avatar ? <img src={`${user.avatar}`} className={topMemberStyles.avatar} /> :
                <label className={topMemberStyles.avatarLabel}>{user.profileName.charAt(0)}</label>}
            <label className={topMemberStyles.profileName}>{user.profileName}</label>
            <div className={topMemberStyles.btnOption}>
                {isShowOption?<Fragment>
                    <Button className={`${appStyles.buttonSvg}`}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#000000" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                        </svg>
                    </Button>
                    <MutationPropRender mutation={UPDATE_CHAT_BOX_MUTATION}
                        mutationPropRender={(action) => (
                    <Button className={`${appStyles.buttonSvg}`} onClick={() => openChatBox(action,user)}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#ccc" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"></path>
                        </svg>
                    </Button>
                    )}/>
                </Fragment>:
                <Fragment>
                    <svg className={topMemberStyles.postSvg} viewBox="0 0 24 24"><path fill="#000000" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path></svg>
                    <label className={topMemberStyles.postLabel}>{user.point}</label>
                </Fragment>
                }
            </div>
        </div>
    </Fragment>

})