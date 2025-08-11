import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import BackComponent from '../../Components/BackComponent'
import { wp, hp } from '../../Components/Config'
import { getFollowers, followUnfollow } from '../../../Shared/settingAction'
import { useDispatch, useSelector } from 'react-redux'
import { Image_URL } from '../../Providers'

class Card extends React.PureComponent {

  render() {

    return (
      <View style={{ marginTop: 33, flexDirection: 'row' }}>
        <Image source={{ uri: Image_URL + this.props?.item?.followerDetail?.image }} style={{ resizeMode: 'contain', height: 65, width: 65, borderRadius: 10, backgroundColor: '#e6e6e6' }} />
        <View style={{ paddingLeft: 17, flex: 1, justifyContent: 'space-between', paddingTop: '2%', paddingBottom: '3.5%' }} >
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }} >{this.props?.item?.followerDetail?.userName}</Text>
          <Text>Lorem Ipsum is simply</Text>
        </View>
        <TouchableOpacity onPress={this.props.onUnfollow} style={{ width: 80, marginTop: '4%', backgroundColor: '#AEAEB2', height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 18 }}>
          {this.props.followLoader ? <ActivityIndicator size={13} color={'white'} /> : <Text style={{ fontSize: 10, color: 'white' }} >Unfollow</Text>}
        </TouchableOpacity>
      </View>
    )
  }
}


export default function Followers() {
  const { followers, followersLoading, followLoader, noFollower } = useSelector(state => state.actionSlice)
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (followers?.length === 0) dispatch(getFollowers())
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const data = {
      onSuccess: () => {
        setRefreshing(false);
      }
    }
    dispatch(getFollowers(data))
  }, []);


  console.log(followers, 'followersfollowersfollowers', noFollower)
  return (
    <View style={{ flex: 1 }} >
      <BackComponent text={'Followers'} />
      {followersLoading ?
        <ActivityIndicator
          style={{ marginTop: hp(10) }}
          size={30}
          color="#56AB2F" /> :
        <>
          {noFollower && <Text style={{ textAlign: 'center', fontSize: 15, marginTop: hp(15) }} >You don't have any follower now</Text>}
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              console.log('reach on end')
            }}
            showsVerticalScrollIndicator={false}
            data={followers}
            style={{ paddingHorizontal: wp(6) }}
            renderItem={(props) => <Card
              followLoader={followLoader}
              onUnfollow={() => {

                let data = {
                  "type": "unfollow",
                  "unfollow_id": props.item?._id,
                }

                dispatch(followUnfollow(data))
              }}
              {...props}
            />}
          />
        </>}
    </View>
  )
}

const styles = StyleSheet.create({})