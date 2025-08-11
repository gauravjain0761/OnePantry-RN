import { createSlice } from '@reduxjs/toolkit'
import { getFollowers, followUnfollow, getOrders, getOrderDetail, addFaviourite, productList ,productDetail } from './settingAction'
import { Alert } from 'react-native'


const AlerError = (err) => {
    if (true) {
        Alert.alert('Error', err?.error?.message)
    }
}

const initialState = {
    value: 0,
    followers: [],
    followersLoading: false,
    followLoader: false,
    noFollower: false,
    orderList: [],
    sellerOrderList: [],
    sellerOrderlimit: 6,
    orderLoading: false,
    orderlimit: 6,
    orderDetaingLoading:false,
    orderDetailData:{},
    favoriteLoading:false,
    productListData:[],
    productLimit:10,
    productListLoading:false,
    productDetailData:[],
    productDetailLoading:false,
   
}

export const actionSlice = createSlice({
    name: 'actionSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getFollowers.fulfilled, (state, action) => {
            state.followersLoading = false
            if (action?.payload?.status) {
                state.followers = action.payload?.data?.search_data
                if (action.payload?.data?.search_data?.length == 0) {
                    state.noFollower = true
                }
            }
        })

        builder.addCase(getFollowers.pending, (state, action) => {
            state.followersLoading = true
        })

        builder.addCase(getFollowers.rejected, (state, action) => {
            state.followersLoading = false
            AlerError(action)
        })


        builder.addCase(followUnfollow.fulfilled, (state, action) => {

            state.followLoader = false
            const { follow_response, response } = action?.payload

            if (follow_response?.status) {
                state.followers = follow_response?.data?.search_data
                if (follow_response?.data?.search_data?.length == 0) {
                    state.noFollower = true
                }
            }

            if (response?.status) Alert.alert('Success', response?.message)
        })

        builder.addCase(followUnfollow.pending, (state, action) => {
            state.followLoader = true
        })

        builder.addCase(followUnfollow.rejected, (state, action) => {
            state.followLoader = false
            AlerError(action)
        })

        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orderLoading = false
            const { response, payload: { limit, type } } = action.payload

            if (response?.status) {
                if (type == 'seller') {
                    state.sellerOrderList = response?.data?.search_data
                    if (response?.data?.total >= limit) {
                        state.sellerOrderlimit = limit
                    }
                } else {
                    state.orderList = response?.data?.search_data
                    if (response?.data?.total >= limit) {
                        state.orderlimit = limit
                    }
                }
            }
        })

        builder.addCase(getOrders.pending, (state, action) => {
            state.orderLoading = true
        })

        builder.addCase(getOrders.rejected, (state, action) => {
            state.orderLoading = false
        })
        
        builder.addCase(getOrderDetail.pending, (state, action) => {
         
            state.orderDetaingLoading = true
        })

        builder.addCase(getOrderDetail.rejected, (state, action) => {
            state.orderDetaingLoading = false
        })

        builder.addCase(getOrderDetail.fulfilled, (state, action) => {
            state.orderDetailData = action.payload.data
            state.orderDetaingLoading = false
        })

        // HOME LISTING ADD TO FAVIOURITE LIST..........

        builder.addCase(addFaviourite.pending, (state, action) => {
            console.log('the card is liked --------------------------> ',action.payload)
            state.favoriteLoading = true
        })

        builder.addCase(addFaviourite.rejected, (state, action) => {
            state.favoriteLoading = false
        })

        builder.addCase(addFaviourite.fulfilled, (state, action) => {
            state.favoriteLoading = false
        })
        builder.addCase(productList.pending, (state, action) => {
            console.log('the  --------------------------> ',action.payload)
            state.favoriteLoading = true
        })

        builder.addCase(productList.rejected, (state, action) => {
            state.favoriteLoading = false
        })

        builder.addCase(productList.fulfilled, (state, action) => {
            state.productListData = action.payload?.data?.search_data
            state.productListLoading = false
        })
        builder.addCase(productDetail.pending, (state, action) => {
            console.log('the  --------------------------> ',action.payload)
            state.productDetailLoading = true
        })

        builder.addCase(productDetail.rejected, (state, action) => {
            state.productDetailLoading = false
        })

        builder.addCase(productDetail.fulfilled, (state, action) => {
            state.productDetailData = action.payload?.data
            state.productDetailLoading = false
        })


    }
})


export const { increment, decrement, incrementByAmount } = actionSlice.actions

export default actionSlice.reducer