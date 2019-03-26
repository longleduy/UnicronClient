import React, { Fragment, Component } from 'react'
//Todo: Component
import PrivateIndexTopMemberForm from '../../../components/private/index/PrivateIndexTopMemberForm.jsx'
//Todo: PropRender
import QueryPropRender from '../../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: GraphQl
import {GET_LIST_USER} from '../../../graphql/querys/user_query'
export const PrivateIndexTopMember = React.memo((props) => {
  return <QueryPropRender
    query={GET_LIST_USER} variables={{ limitNumber: 8,skipNumber:0 }}
    queryPropRender={({ loading, data,fetchMore,subscribeToMore }) => {
      return <PrivateIndexTopMemberForm loading={loading} listUser={data.getListUser} subscribeToMore={subscribeToMore}/>
    }} />
})