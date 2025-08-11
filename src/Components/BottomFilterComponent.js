


import { Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react';
import { IMAGE } from '../Constant/Images';
import BottomSheet from '@gorhom/bottom-sheet';
import { vs } from 'react-native-size-matters';
import { wp } from './Config';

const BottomFilterComponent = ({ bottomSheetRef, sheetIndex, snapPoints, setSheetIndex, onFilterSelect,onlySort }) => {

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={sheetIndex}
            snapPoints={snapPoints}
            onChange={setSheetIndex}
        >
            <View style={{
                flex: 1
            }}>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ marginLeft: '5%', color: '#363636', fontSize: vs(14), fontWeight: '500' }} >Sort & Filter</Text>
                </View>
                <View style={{ height: 1, backgroundColor: '#363636', marginTop: 15, marginBottom: 15 }} />
               { onlySort ? (
                <RowLayout value={'Dsc'} onPress={onFilterSelect} img={IMAGE.atoz} title='A-Z to Z-A' />)
               :(
               <>
               <RowLayout value={'Dsc'} onPress={onFilterSelect} img={IMAGE.atoz} title='A-Z to Z-A' />
                <RowLayout value={'Low-to-High'} onPress={onFilterSelect} img={IMAGE.arrow_up} title='Low to High Prices' />
                <RowLayout value={'High-to-Low'} onPress={onFilterSelect} img={IMAGE.arrow_down} title='High to Low Prices' />
                 </>)}
            </View>
        </BottomSheet>
    )
}


const RowLayout = ({ title, img, onPress, value }) => {

    const [type, setType] = useState(false)

    return (
        <TouchableOpacity onPress={() => {

            if (value == 'Dsc') {
                onPress(type ? 'Asc' : 'Dsc')
                setType(!type)
            } else {
                onPress(value)
            }


        }} style={{ flexDirection: 'row', alignItems: 'center', height: vs(50) }}>
            <Image source={img} style={{marginLeft:wp(4), resizeMode: 'contain', height: 20, width: 20 }} />
            <Text style={{ marginLeft: '6%', fontSize: vs(13), fontWeight: '500', color: '#363636' }} >{title}</Text>
        </TouchableOpacity>
    )
}


export default BottomFilterComponent