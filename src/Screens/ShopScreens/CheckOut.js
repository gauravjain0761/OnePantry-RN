import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import BackComponent from '../../Components/BackComponent';
import CheckoutCard from '../../Components/CheckoutCard';
import {IMAGE, COLORS, TEXT} from '../../Constant/Images';
import CheckBox from '../../Components/CheckBox';
import ItemInRowComponent from '../../Components/ItemInRowComponent';
import Button from '../../Components/Button';
import InputText from '../../Components/InputText';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {hp, wp} from '../../Components/Config';
import useLoadingFn from '../../Hook/useLoadingFn';
import {HomeContext} from '../../Providers/HomeProvider';
import {ShopContext} from '../../Providers/ShopProvidre';
import {useIsFocused} from '@react-navigation/native';
// import { Alert } from 'react-native/Libraries/Alert/Alert'
import {SellerContext} from '../../Providers/SellerProvider';
const {width, height} = Dimensions.get('window');
const CheckOut = item => {
  console.log('data recieved through address screen ', item);
  const ShippingID = item?.route?.params?._id;
  const state = JSON.stringify(item?.route?.params?.state?.name);
  const country = JSON.stringify(item?.route?.params?.country?.name);
  const addressName =
    item?.route?.params?.name + '   ' + item?.route?.params?.street;
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [check, setcheck] = useState(null);
  const [active, setactive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [card, setcard] = useState('');
  const [numCVV, setnumCVV] = useState('');
  const [date, setdate] = useState('');
  const {API_HOME} = useContext(HomeContext);
  const {API_Shop, CheckoutDetail, ConfirmOrderData} = useContext(ShopContext);
  const {API_SELLER, countryData, addressList} = useContext(SellerContext);
  // const AddressSearching = useLoadingFn(API_HOME.AddressSearching)
  const AddressSearching = useLoadingFn(API_HOME.AddressSearching);
  const ShippingAddressDetail = useLoadingFn(API_Shop.ShippingAddressDetail);
  const OrderConfirm = useLoadingFn(API_Shop.ConfirmOrder);
  const CountryDetail = useLoadingFn(API_Shop.CountryDetail);
  const CartDelete = useLoadingFn(API_Shop.DeleteItemCart);
  const Addresslist = useLoadingFn(API_SELLER.Addaddresslist);
  const CheckOutDetail = useLoadingFn(API_Shop.CheckOutDetail);

  const ShippingAddress =
    CheckoutDetail?.data?.shippingDetail?.apt_suite +
    ' , ' +
    CheckoutDetail?.data?.shippingDetail?.city +
    ' , ' +
    CheckoutDetail?.data?.shippingDetail?.state?.name +
    '  ,' +
    CheckoutDetail?.data?.shippingDetail?.country?.name;
  const BillingAddress =
    CheckoutDetail?.data?.billingDetail?.apt_suite +
    ' , ' +
    CheckoutDetail?.data?.billingDetail?.city +
    ' , ' +
    CheckoutDetail?.data?.billingDetail?.state?.name +
    '  ,' +
    CheckoutDetail?.data?.billingDetail?.country?.name;

  const handleCheckbox = value => {
    value == 1 && setactive(true);
    setcheck(value);
  };
  // const { API_Shop, YourCartListData } = useContext(ShopContext);
  // const YourCartList = useLoadingFn(API_Shop.YourCartList);
  const onSearch = () => {
    AddressSearching({params: {}, onSuccess: () => {}});
  };
  console.log('shipping address recieved', CheckoutDetail.data.billingDetail);

  const showDetail = () => {
    ShippingAddressDetail({params: {}, onSuccess: () => {}});
  };
  useEffect(() => {
    CountryDetail({params: {}, onSuccess: () => {}});
    Addresslist({params: {}, onSuccess: () => {}});
    CheckOutDetail({params: {}, onSuccess: () => {}});
  }, []);

  const Yourcartdelete = item => {
    console.log(item, 'product_cart_idproduct_cart_id');
    CartDelete({params: {product_cart_id: item}, onSuccess: () => {}});

    // CartDelete({ params: {product_cart_id:item}, onSuccess: () => {},screenName:'delete'})
  };

  const confirmOrder = () => {
    setLoader(true);
    console.log('data is con=jkffgdkjkgfdjs', addressList);
    if (ShippingID === undefined) {
      Alert.alert('No Shipping Address Selected');
    } else if (check === null) {
      Alert.alert('Please Select A payment Method');
    } else {
      let data = {
        shipping_id: ShippingID,
        shiping_charge: 20,
        payment_mode: 'cash',
        product: confirmData,
      };
      OrderConfirm({
        params: data,
        onSuccess: () => {
          setLoader(false), navigation.navigate('OrderConfirm');
        },
      });
    }
  };

  const data = CheckoutDetail?.data || [];
  const newData = CheckoutDetail?.data?.result;

  const confirmData = newData.map(item => ({
    price: item?.productDetail?.selling_price,
    quantity: item.quantity,
    commission: 50,
    product_id: item?.product_id,
    seller_id: item?.productDetail?.createdBy,
  }));

  console.log(
    'data recieved here-------------->>>>>>>>>>>>>>>>>>(((())))))))======>',
    data?.result,
  );
  //
  return (
    <View style={styles.container}>
      <BackComponent text={'Checkout'} />
      <ScrollView>
        <View style={{padding: 20}}>
          <Text style={styles.itemsText}>
            {data?.result?.length} {'Items'}
          </Text>
          {data?.result?.map((item, index) => {
            // console.log("item recieved" , item)
            if (index == data?.length - 1) return null;

            return (
              <CheckoutCard
                delete_id={item?._id}
                onpress={() => Yourcartdelete(item?._id)}
                textone={item?.productDetail?.name}
                texttwo={item?.productDetail?.category_id?.category_name}
                textthree={item?.productDetail?.selling_price}
                image={item?.productDetail?.product_img[0]?.image}
                instock={item?.productDetail?.in_stock}
              />
            );
          })}

          <View elevation={1} style={styles.addressView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SettingStack', {
                  screen: 'AddAddress',
                  params: {type: 'shipping'},
                });
              }}
              style={styles.changeView}>
              <Text style={{fontSize: 12, fontWeight: '400', color: '#56AB2F'}}>
                {item?.route?.params == undefined ? 'Select' : 'Change'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.titleLightGrey}>{'Shipping Address'}</Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#242424'}}>
              {CheckoutDetail?.data?.shippingDetail == undefined || ''
                ? 'Select Shipping Address'
                : ShippingAddress}
            </Text>
          </View>
          <View elevation={1} style={styles.addressView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SettingStack', {
                  screen: 'AddAddress',
                  params: {type: 'billing'},
                });
              }}
              style={styles.changeView}>
              <Text style={{fontSize: 12, fontWeight: '400', color: '#56AB2F'}}>
                {item?.route?.params == undefined ? 'Select' : 'Change'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.titleLightGrey}>{'Billing Address'}</Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#242424'}}>
              {CheckoutDetail?.data?.billingDetail == undefined || ''
                ? 'Select Billing Address'
                : BillingAddress}
            </Text>
          </View>
          <View elevation={1} style={styles.addressView}>
            <Text style={styles.titleLightGrey}>{'Payment Method'}</Text>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                check={check == 1}
                setcheck={() => handleCheckbox(1)}
                title={'Credit Card'}
              />
              <CheckBox
                check={check == 2}
                setcheck={() => handleCheckbox(2)}
                title={'Cash on Delivery'}
                style={{marginLeft: 25}}
              />
            </View>
          </View>
          <View style={[styles.outline, {height: 10, marginBottom: 7}]}></View>
          <Text
            style={{
              color: '#424347',
              fontWeight: '500',
              fontSize: 18,
              marginLeft: -2,
            }}>
            {'Order Summary'}
          </Text>
          <ItemInRowComponent
            title={'Order'}
            styleTitle={{fontWeight: '400', fontSize: 15, color: '#3E3E3E'}}
            titletwo={'$ ' + data?.orderSummary?.finalPrice}
            styleView={{alignItem: 'center'}}
            styleTitletwo={{color: '#3E3E3E', fontWeight: '400', fontSize: 15}}
          />
          <ItemInRowComponent
            title={'Delivery Charges'}
            styleTitle={{fontWeight: '400', fontSize: 15, color: '#3E3E3E'}}
            titletwo={'$ ' + data?.orderSummary?.deliveryPrice}
            styleView={{alignItem: 'center'}}
            styleTitletwo={{color: '#3E3E3E', fontWeight: '400', fontSize: 15}}
          />
          <ItemInRowComponent
            title={'Total Amount:'}
            styleTitle={{fontWeight: '500', fontSize: 18, color: '#424347'}}
            titletwo={
              '$ ' +
              (data?.orderSummary?.deliveryPrice +
                data?.orderSummary?.finalPrice)
            }
            styleView={{alignItem: 'center'}}
            styleTitletwo={{color: '#56AB2F', fontWeight: '500', fontSize: 18}}
          />
          <Button
            title={loader ? <ActivityIndicator></ActivityIndicator> : 'Confirm'}
            style={{
              marginTop: 30,
              backgroundColor: COLORS.Green,
              borderRadius: 15,
              alignSelf: 'center',
              marginBottom: 10,
              width: wp(45),
            }}
            color={{color: '#fff'}}
            onPress={confirmOrder}
          />
        </View>
        <ModaFn
          modal={active}
          setmodal={setactive}
          card={card}
          setcard={setcard}
          date={date}
          setdate={setdate}
          numCVV={numCVV}
          setnumCVV={setnumCVV}
        />
      </ScrollView>
    </View>
  );
};

export default CheckOut;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffBfB',
  },
  itemsText: {
    fontWeight: '600',
    fontSize: 19,
    color: '#000000CC',
    marginLeft: 15,
  },
  changeView: {
    height: 30,
    width: 60,
    position: 'absolute',
    right: 5,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressView: {
    height: hp(10),
    width: wp(90),
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 13,
    marginBottom: 20,
  },
  titleLightGrey: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 8,
  },
  outline: {
    borderBottomWidth: 1,
    borderColor: '#535763',
    height: hp(10),
    width: wp(90),
    alignSelf: 'center',
    marginTop: 20,
    opacity: 0.1,
  },
  darkgrey: {
    fontWeight: '500',
    fontSize: 16,
    color: '#3A3C3F',
    marginVertical: 4,
    marginLeft: 10,
  },
});
const ModaFn = ({
  modal,
  setmodal,
  card,
  setcard,
  date,
  setdate,
  numCVV,
  setnumCVV,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();

  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setmodal(false)}
      animationType="slid">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000010',
        }}>
        <View
          elevation={2}
          style={{
            width: wp(90),
            height: hp(55),
            backgroundColor: '#ffffff',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: wp(90),
              height: hp(6),
              backgroundColor: COLORS.Green,
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '600', fontSize: 20, color: '#fff'}}>
              {'Credit Card'}
            </Text>
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.darkgrey}>Card number</Text>
            <InputText
              label={' card '}
              textInputProps={{
                placeholder: '5261   4141   0151   8472',
                keyboardType: 'numeric',
                autoCapitalize: 'none',
              }}
              controllerProps={{
                name: 'card',
                control,
                errors,
                rules: {required: true},
              }}
              style={{borderWidth: 0}}
              inputstyle={{width: wp(60), marginLeft: 10, width: wp(50)}}
              circle
              card
            />
            <Text style={[styles.darkgrey, {marginTop: -5}]}>
              Cardholder name
            </Text>
            <InputText
              label={' Name '}
              textInputProps={{
                placeholder: 'Alex Hales',
                keyboardType: 'default',
                autoCapitalize: 'none',
              }}
              controllerProps={{
                name: 'name',
                control,
                errors,
                rules: {required: true},
              }}
              style={{borderWidth: 0}}
              inputstyle={{marginLeft: 13, width: wp(35)}}
            />
            <View
              style={{
                flexDirection: 'row',
                width: wp(85),
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.darkgrey}>Expiry date</Text>
                <InputText
                  label={'  Expiry Date '}
                  textInputProps={{
                    placeholder: '06 / 2024',
                    keyboardType: 'numeric',
                    autoCapitalize: 'none',
                  }}
                  controllerProps={{
                    name: 'date',
                    control,
                    errors,
                    rules: {required: true},
                  }}
                  style={{borderWidth: 0}}
                  inputstyle={{
                    marginLeft: 13,
                    width: Platform.OS === 'ios' ? wp(32) : wp(35),
                  }}
                />
              </View>
              <View>
                <Text style={styles.darkgrey}>CVV / CVC</Text>
                <View
                  style={{
                    height: hp(2.5),
                    width: wp(5.5),
                    backgroundColor: '#d3f6e6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    position: 'absolute',
                    right: 10,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{fontSize: 13, fontWeight: '500', color: '#25D485'}}>
                    ?
                  </Text>
                </View>
                <InputText
                  label={' Cvv/Cvc '}
                  textInputProps={{
                    placeholder: '915',
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    maximum: 3,
                  }}
                  controllerProps={{
                    name: 'cvv',
                    control,
                    errors,
                    rules: {required: true},
                  }}
                  style={{borderWidth: 0}}
                  inputstyle={{
                    marginLeft: 13,
                    width: Platform.OS === 'ios' ? wp(32) : wp(35),
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 10,
                textAlign: 'center',
                marginLeft: 50,
                marginRight: 50,
              }}>
              {TEXT.creditCardText}
            </Text>
            <Button
              title={'Done'}
              style={{
                marginTop: 15,
                backgroundColor: COLORS.Green,
                borderRadius: 15,
                alignSelf: 'center',
                marginBottom: 10,
                width: 170,
              }}
              color={{color: '#fff'}}
              onPress={() => setmodal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
