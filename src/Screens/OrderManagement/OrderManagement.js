import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { OrderManagementCard } from '../../Components/CardLayout'
import { wp, hp } from '../../Components/Config'
import BackComponent from '../../Components/BackComponent'
import { vs } from 'react-native-size-matters'
import StepIndicator from 'react-native-step-indicator';
import { IMAGE } from '../../Constant/Images/index'
import { getOrderDetail } from '../../../Shared/settingAction'
import { useDispatch, useSelector } from 'react-redux'
// shop_vehicle: require('./shop_vehicle.png'),
// delivery: require('./delivery.png'),
// calendar: require('./calendar.png'),
// home_delivery: require('./home_delivery.png'),

const labels = [
    {
        name: "Order Placed",
        label: 'We have received your order',
        date: '02/04/2023',
        img: IMAGE.delivery
    },
    {
        name: "Order Packed",
        label: 'Your Product packed & ready to shipped',
        date: '02/04/2023',
        img: IMAGE.calendar
    },
    {
        name: "On the way",

        date: '',
        img: IMAGE.shop_vehicle
    },
    {
        name: "Product deliverd",

        date: '',
        img: IMAGE.home_delivery
    }
];

const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 1.5,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: '#56AB2F',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: '#56AB2F',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#56AB2F',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#56AB2F',
    stepIndicatorUnFinishedColor: '#ECECF2',
    stepIndicatorCurrentColor: '#56AB2F',
    stepIndicatorLabelCurrentColor: '#56AB2F',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    currentStepLabelColor: '#56AB2F'
}

const Label = (props) => {

    const { date, label, name } = props.label

    return (
        <View Style={{}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(70), alignItems: 'center' }} >
                <Text style={{ color: props?.stepStatus == 'unfinished' ? "#606060" : '#56AB2F', fontSize: vs(13), fontWeight: '500' }}>{"  " + name}</Text>
                <Text style={{ color: "#555555", fontSize: vs(10) }} >{date}</Text>
            </View>
            {label && <Text style={{ color: '#555555', fontSize: vs(10) }}>{"   " + label}</Text>}
        </View>
    )
}

const RenderStepIndicator = (props) => {

    const finished = props.stepStatus == 'finished' ? { tintColor: 'white' } : {}

    return (
        <Image style={{ height: '50%', width: '50%', resizeMode: 'contain', ...finished }} source={labels[props.position].img} />
    )
}

export default function OrderManagement({ route }) {
    const { orderDetaingLoading, orderDetailData } = useSelector(state => state.actionSlice)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);

    const getPageDetail = () => {
        dispatch(getOrderDetail({
            "order_id": "644612f5339a8119cf1980b3"
        }))
    }
    useEffect(() => {
        getPageDetail()
    }, [])

    const activeStatus = 'orderPlaced'

    const calculation = useMemo(() => {
        switch (activeStatus) {
            case 'orderPlaced':
                return 0
            case 'orderPacked':
                return 1
            case 'onTheWay':
                return 2
            case 'productDeliverd':
                return 3
            default:
                return -1
        }
    }, [activeStatus]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getPageDetail()
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }, []);




    
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <BackComponent text={' Order Management'} />
            {orderDetaingLoading ? <ActivityIndicator size={30} style={{ marginTop: hp(5) }} /> : <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: wp(6), marginTop: hp(4) }}
            >
                <OrderManagementCard orderDetailData={orderDetailData} />
                <View style={{ borderRadius: 8, backgroundColor: '#F8F8FB', padding: 14, }}>
                    <Text style={{ color: '#56AB2F', fontSize: vs(14) }}>Track Order </Text>
                    <Text style={{ color: 'black' }}>Order id : {orderDetailData?.orderId}</Text>
                    <View style={{ height: 280 }} >
                        <StepIndicator
                            renderStepIndicator={RenderStepIndicator}
                            stepCount={4}
                            renderLabel={Label}
                            direction={'vertical'}
                            customStyles={customStyles}
                            currentPosition={calculation}
                            labels={labels}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: '#F8F8FB', marginTop: vs(11), borderRadius: 8, padding: 18 }}>
                    <PriceLabel value={orderDetailData?.amount} label='Amount' />
                    <PriceLabel value={1} label='Discount' />
                    <PriceLabel value={1} label='Service Tax' />
                    <View style={{ height: 1, backgroundColor: '#CFCFCF', marginBottom: 15, marginTop: 5, marginHorizontal: wp(2) }} />
                    <PriceLabel value={orderDetailData?.amount} label='Total' />
                </View>
                <View style={{ height: 45, flexDirection: 'row', marginBottom: hp(6), marginTop: vs(20) }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#56AB2F', borderRadius: 30 }} >
                        <Text style={{ color: 'white' }} >Invoice</Text>
                    </View>
                    <View style={{ width: wp(5) }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderWidth: 1, borderColor: '#56AB2F', borderRadius: 30 }} >
                        <Text style={{ color: 'black' }} >Dispute</Text>
                    </View>
                </View>
            </ScrollView>}

        </View>
    )
}


const PriceLabel = ({ label, value }) => {
    return (
        <View style={{ marginBottom: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text style={{ color: '#424347', fontSize: vs(13), fontWeight: '500' }} >{label}</Text>
            <Text style={{ color: '#56AB2F', fontSize: vs(13), fontWeight: '500' }} >$ {value}</Text>
        </View>
    )
}

