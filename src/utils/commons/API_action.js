import {SIGN_OUT_MUTATION} from './contant/graphql_contants'
    const signOut =  async (client,history) => {
    localStorage.removeItem('token');
    history.push('/');
    client.resetStore();
    await client.mutate({
        mutation: SIGN_OUT_MUTATION
    })
}