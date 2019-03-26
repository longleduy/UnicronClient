import gql from 'graphql-tag'
export const CHECK_EMAIL_QUERY = gql`
                query CheckEmail($email: String!) {
                            checkEmail(email: $email) {
                            status
                        }
                    }
                `;
export const GET_AUTHE = gql`
query GetAuthen{
	getAuthen @client {
		isAuthen,
		jwt,
		profile_name
	}
	}
`;
export const GET_NOTIFICATION_INFO = gql`
query GetNotificationInfo{
	getNotificationInfo{
        newNotifications{
            messages
            likeAndComments
            }
        newestNotificationInfo{
            formUserName
            formUserAvatar
            action
            content
            postID
            actionTime
            }
        }
	}
`;
export const GET_SIGNIN_BLOCK_TIME = gql`
    query GetSignInBlockTime{
        getSignInBlockTime{
            count,
            status
              }
            }
        `;
export const GET_LIST_USER = gql`
query GetListUser($limitNumber:Int!,$skipNumber:Int!){
    getListUser(limitNumber:$limitNumber,skipNumber:$skipNumber){
      userID
      profileName
      avatar
      status
      point
    }
        }
    `;
