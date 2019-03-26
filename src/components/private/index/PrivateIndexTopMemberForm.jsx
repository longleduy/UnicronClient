import React, { Fragment } from 'react'
import topMemberStyles from '../../../Styles/TopMember.scss'
import {PrivateIndexTopMemberChildForm} from './PrivateIndexTopMemberChildForm.jsx'
export const PrivateIndexTopMemberForm = React.memo((props) => {
    const { loading, listUser } = props;
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
                        return <PrivateIndexTopMemberChildForm key={key} user={user} />
                    })}
                </Fragment>
            }
        </div>
    </Fragment>
})