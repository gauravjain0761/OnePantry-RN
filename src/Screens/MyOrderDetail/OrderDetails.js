import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DetailCardLayout } from '../../Components/CardLayout'
import { wp, hp } from '../../Components/Config'
import BackComponent from '../../Components/BackComponent'
import { vs } from 'react-native-size-matters'


export default function OrderDetails({ route }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <BackComponent text={'My Order Details'} />
      <View style={{ paddingHorizontal: wp(6), marginTop: hp(4) }} >
        <DetailCardLayout />
        <Text style={{ fontSize: vs(13), color: '#949494' }} >Change Order Status</Text>
        <View style={{ marginTop: vs(11), height: 50, backgroundColor: '#E9ECEF', borderRadius: 4, justifyContent: 'center', paddingHorizontal: wp(6) }}>
          <Text style={{ fontWeight: '400', fontSize: vs(11), color: '#242424' }} >In Progress</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})