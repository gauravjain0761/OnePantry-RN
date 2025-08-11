import { View, Text,Image,TouchableOpacity,StyleSheet,ScrollView, Pressable } from 'react-native'
import React,{useState,useContext} from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
import { hp, wp } from './Config'
import { ShopContext } from '../Providers/ShopProvidre'
import { HomeContext } from '../Providers/HomeProvider'
const CounterSmall = ({style,styleCount,count,setcount,styleimg,amount,item}) => {
  const { ProductDtl, API_HOME, FavoriteData } = useContext(HomeContext);
  const { increase, setincrease, decrease, setdecrease,loadercount, setloadercount } = useContext(ShopContext);
  const AddToCart = useLoadingFn(API_HOME.AddToCart);
  console.log(item,'itemitemitem')
  const increaseFn = (item)=>{
    setloadercount(true)
    setincrease({amount:amount ,state:true,count:count+1}),setdecrease({state:false}), 
    AddToCart({ params: { product_id: item?.product_id, quantity: (count)}, onSuccess: () => { setloadercount(false),setcount(count+1) } })

  }
  const decreaseFn = (item)=>{
    console.log(item?.product_id,'item?.product_iditem?.product_id')
    setloadercount(true)
    setdecrease({amount:amount ,state:true,count : count-1}),setincrease({state:false}),
    AddToCart({ params: { product_id: item?.product_id, quantity: (count)}, onSuccess: () => { setloadercount(false),setcount(count-1) } })

  }
  return (
    <View style={[styles.mainView,style]}>
        <Pressable style={{height:35,width:30,justifyContent:'center',styleimg}} onPress={()=> count == 1 ? (setcount(1)) : decreaseFn(item)}>
        <Image style={{width:11,height:3,marginRight:8}} source={IMAGE.Remove} />
        </Pressable>

        <View style={[styles.countView,styleCount]}>
        <Text style={{fontWeight:'600',fontSize:11,color:'#000'}}>{count}</Text>
       </View>

    <Pressable onPress={()=>{increaseFn(item)}} style={{width:30,height:30,justifyContent:'center',alignItems:'center'}} >
    <Image style={{width:11,height:11,marginLeft:10}} source={IMAGE.Add} />
    </Pressable>

    </View>
  )
}

export default CounterSmall
const styles= StyleSheet.create({
    mainView:{
        flexDirection:'row',
        alignItems:'center',
        width:wp(23),
        justifyContent:'center',
        height:hp(4.3),
        backgroundColor:'#fff',
        borderRadius:6,
        
        
    },
    countView:{
        height:hp(9),
        width:20,
        justifyContent:'center',
        alignItems:'center'
    }
})