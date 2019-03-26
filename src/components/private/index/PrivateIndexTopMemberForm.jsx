import React, { Fragment, PureComponent } from 'react'
import _ from 'lodash'
import topMemberStyles from '../../../Styles/TopMember.scss'
import { PrivateIndexTopMemberChildForm } from './PrivateIndexTopMemberChildForm.jsx'
//Todo: GraphQl
import {SET_USER_STATUS_SUB} from '../../../graphql/subscriptions/user_subcription'
export default class PrivateIndexTopMemberForm extends PureComponent {
    componentWillMount(){
        this.props.subscribeToMore({
            document: SET_USER_STATUS_SUB,
            updateQuery: (prev,result) => {
                let dataSub = result.subscriptionData.data.setUserStatusSub;
                let newListUser = [...prev.getListUser];
             let user = _.filter(newListUser,{userID:`${dataSub.userID}`});
             if(user[0].status != dataSub.status){
                user[0].status = dataSub.status;
                return {
                  getListUser: newListUser
                }
             }
            }
          });
    }
    render() {
        const { loading, listUser } = this.props;
        return <Fragment>
            <div className={topMemberStyles.mainDiv}>
                {loading ?
                    <div className={topMemberStyles.divLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={topMemberStyles.svgLoading}>
                            <path transform="translate(2)" d="M0 12 V20 H4 V12z">
                                <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                            </path>
                            <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                                <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.2" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                            </path>
                            <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                                <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.4" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                            </path>
                            <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                                <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                            </path>
                            <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                                <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.8" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    </div> :
                    <Fragment>
                        {listUser.map((user, key) => {
                            return <PrivateIndexTopMemberChildForm key={key} user={user} status={user.status}/>
                        })}
                    </Fragment>
                }
            </div>
        </Fragment>
    }
}