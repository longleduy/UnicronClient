import React, { Fragment, PureComponent } from 'react'
import { withApollo } from "react-apollo"
import Grid from '@material-ui/core/Grid'
import {PostAuthorOption} from '../../index/Post/PostAuthorOption.jsx'
//Todo: Propsrender
import QueryPropRender from '../../../hocOrProprender/QueryPropRender.jsx'
//Todo: Styles
import postStyles from '../../../../Styles/Post.scss'
//Todo: GraphQl
import { LOAD_MORE_CMT_QUERY,GET_LIMITED_POSTS } from '../../../../graphql/querys/post_query'
import { POST_COMMENT_SUBSCRIPTION } from '../../../../graphql/subscriptions/post_subscription'

class PrivatePostChildCommentBoxForm extends PureComponent {
    componentWillMount() {
        const { postID, index } = this.props;
        this.props.subscribeToMore({
            document: POST_COMMENT_SUBSCRIPTION,
            variables: { postID },
            updateQuery: (prev, result) => {
                let comment = result.subscriptionData.data.commentPostSub;
                let newList = [...prev.loadMoreComment];
                newList.push(comment);
                return {
                    loadMoreComment: newList
                }
            }
        });
    }
    fetchMoreCmt = (fetchMore, skipNumber) => {
        const { postID } = this.props;
        fetchMore({
            variables: { postID, limitNumber: 3, skipNumber },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const prevPost = previousResult.loadMoreComment;
                const newPost = fetchMoreResult.loadMoreComment;
                return {
                    loadMoreComment: [...newPost, ...prevPost]
                }
            }
        })
    }
    render() {
        const { listCmt, fetchMore, countCount } = this.props;
        const count = countCount.comments;
        return <Fragment >
            {listCmt.map((cmt, key) => {
                return <Grid key={key} item xs={12} className={postStyles.firstCommentBox}>
                    <div className={postStyles.commentAvatar}>
                        {cmt.userInfoComment.avatar ? <img  src={`${cmt.userInfoComment.avatar}`} className={postStyles.imgAvatarComment} /> :
                            <label className={`${postStyles.labelAvatarCmt} ${postStyles.labelAvatar}`}>{cmt.userInfoComment.profileName.charAt(0)}</label>}
                    </div>
                    <div className={postStyles.commentContent}>
                        <span className={postStyles.postInfo}>
                            <label className={postStyles.postProfileName}>{cmt.userInfoComment.profileName}</label>
                            <label className={postStyles.postDate} name="postDate">{cmt.commentDate}</label>
                        </span>
                        <div>
                            <label className={postStyles.comment}>{cmt.commentContent}</label>
                        </div>
                    </div>
                </Grid>
            })}
            {
                count > listCmt.length && <svg className={postStyles.loadMore} viewBox="0 0 24 24" onClick={() => { fetchMoreCmt(fetchMore, count - listCmt.length) }} >
                    <path fill="#ffe000" d="M7,10L12,15L17,10H7Z" />
                </svg>
            }
        </Fragment>
    }
}
export default withApollo(PrivatePostChildCommentBoxForm);