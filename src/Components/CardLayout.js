import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { wp } from './Config';
import { Image_URL } from '../Providers';
import moment from 'moment';
import { vs } from 'react-native-size-matters';


class CardLayout extends React.PureComponent {

    render() {

        // ['pending','accepted','inProgress','shipped','delivered','cancelled','return','refund','release']
        return (
            <View key={this.props.index} style={{ marginBottom: 20, flexDirection: 'row', overflow: 'hidden', backgroundColor: '#E9ECEF', borderRadius: 8 }}>
                <View style={{ height: 140, width: 120 }}>
                    <Image source={{ uri: Image_URL + this.props.item?.productImg[0]?.image || 'https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043' }} style={{ resizeMode: 'contain', height: '100%', width: '100%' }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: wp(3), paddingVertical: '3%', paddingTop: '4%' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black' }} >{moment(this.props.item?.createdAt).format('DD-MM-YYYY')}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderManagement')} style={{ backgroundColor: '#56AB2F', height: 24, width: 100, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                            {/* OrderManagement */}
                            {/* OrderDetails */}
                            <Text style={{ fontSize: vs(9), color: 'white' }} >Add Tracking</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'black', fontSize: vs(10) }} >{"#" + this.props.item?.orderId}</Text>
                    <Text style={{ color: '#56AB2F', fontSize: vs(13), marginTop: '3%' }} >{this.props.item?.buyer?.userName}</Text>
                    <Text style={{ color: 'black', marginTop: '2%', fontSize: vs(10), fontWeight: '500' }} >{this.props.type ? 'Buyer' : "Seller"}<Text style={{ color: '#555555' }} >{'  '}{!this.props.type ? this.props.item?.buyer?.userName : this.props.item?.productDetail?.seller?.userName}</Text></Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: vs(13), color: '#56AB2F', marginTop: '4%' }} >{`${this.props.item?.amount}$`}</Text>
                        {this.props.type && <View style={{ backgroundColor: '#AEAEB2', height: 24, width: 100, borderRadius: 18, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: vs(10), color: 'white' }} >Order cancel</Text>
                        </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}



class DetailCardLayout extends React.PureComponent {

    render() {

        // OrderDetails
        // ['pending','accepted','inProgress','shipped','delivered','cancelled','return','refund','release']
        return (
            <View key={this.props.index} style={{ marginBottom: 20, flexDirection: 'row', overflow: 'hidden', backgroundColor: '#F8F8FB', borderRadius: 8 }}>
                <View style={{ height: 140, width: 120 }}>
                    {/* Image_URL + this.props.item?.productImg[0]?.image || */}
                    <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043' }} style={{ resizeMode: 'contain', height: '100%', width: '100%' }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: wp(3), paddingVertical: '3%', paddingTop: '4%' }} >

                    <Text style={{ color: 'black', fontSize: vs(10) }} ></Text>
                    <Text style={{ color: '#56AB2F', fontSize: vs(13), marginTop: '3%' }} >{'amessdfsfd'}</Text>
                    <Text style={{ color: 'black', marginTop: '2%', fontSize: vs(10), fontWeight: '500' }} >{this.props.type ? 'Buyer' : "Seller"}<Text style={{ color: '#555555' }} >{'  '}{!this.props.type ? this.props.item?.buyer?.userName : this.props.item?.productDetail?.seller?.userName}</Text></Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: vs(13), color: '#56AB2F', marginTop: '4%' }} >{`${13}$`}</Text>

                    </View>
                </View>
            </View>
        )
    }
}


class OrderManagementCard extends React.PureComponent {

    checkLenght = (val) => {
        if (val?.length > 0)  return val[0]
        return ''
    }

    render() {
        // orderDetailData?.subOrders[0]?.seller?.userName
        return (
            <View key={this.props.index} style={{ marginBottom: 20, flexDirection: 'row', overflow: 'hidden', backgroundColor: '#F8F8FB', borderRadius: 8 }}>
                <View style={{ height: 140, width: 120 }}>

                    <Image source={{ uri: Image_URL + this.checkLenght(this.checkLenght(this.props?.orderDetailData?.subOrders)?.productImg)?.image }} style={{ resizeMode: 'contain', height: '100%', width: '100%' }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: wp(3), paddingVertical: '3%', paddingTop: '4%' }} >
                    <Text style={{ color: 'black', fontSize: vs(10) }} ></Text>
                    <Text style={{ fontSize: vs(13), color: '#56AB2F', marginTop: '4%', fontWeight: '500' }} >{`${this.checkLenght(this.props.orderDetailData?.subOrders)?.total_amount}$`}</Text>
                    <Text style={{ color: '#5B5B5B', fontSize: vs(13), marginTop: '3%' }} >{this.checkLenght(this.props.orderDetailData?.subOrders)?.productDetail?.name}</Text>
                    <Text style={{ color: '#56AB2F', marginTop: '2%', fontSize: vs(10), fontWeight: '500' }} >{'Sold by'}<Text style={{ color: '#555555' }} >{'  '}{this.checkLenght(this.props.orderDetailData?.subOrders)?.seller?.userName}</Text></Text>
                </View>
            </View>
        )
    }
}

export { DetailCardLayout, OrderManagementCard }

export default CardLayout