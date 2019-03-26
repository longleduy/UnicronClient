import gql from 'graphql-tag'
export const NOTIFICATION_SUBSCRIPTION = gql`
	subscription NotificationPostSub($userID: String!){
		notificationPostSub(userID:$userID){
            formUserName
            formUserAvatar
            action
            postID
            content
            actionTime
    }
}
`;
export const SET_USER_STATUS_SUB = gql`
	subscription SetUserStatusSub{
		setUserStatusSub{
            userID
            profileName
            avatar
            status
            point
    }
}
`;
