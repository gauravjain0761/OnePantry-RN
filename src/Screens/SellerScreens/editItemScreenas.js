import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackComponent from '../../Components/BackComponent';
import {IMAGE, COLORS} from '../../Constant/Images';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import {useForm} from 'react-hook-form';
import {hp, wp} from '../../Components/Config';
import DropDown from '../../Components/DropDown';
import {ScrollView} from 'react-native-gesture-handler';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesMutation,
} from '../../Services';

const EditItemScreen = item => {
  const editData = item?.route?.params;
  const editQuantity = String(item?.route?.params?.quantity);
  const editPrice = String(item?.route?.params?.selling_price);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();
  const [images, setImages] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [quantity, setQuantity] = useState(editQuantity);
  const [price, setPrice] = useState(editPrice);
  const [loader, setLoader] = useState(false);
  const [draftLoader, setDraftLoader] = useState(false);
  const [valueCategory, setValueCategory] = useState(null);
  const [valueAddress, setValueAddress] = useState();
  const [valueSubCategory, setvalueSubCategory] = useState(null);

  const {data: categoryData} = useGetCategoriesQuery();
  const categories = categoryData?.data?.data ?? [];
  const [subCategories] = useGetSubCategoriesMutation();
  const getSubCategories = async categoryId => {
    const response = await subCategories({category_id: categoryId});
    setSubCategoriesData(response?.data?.data?.data);
  };
  useEffect(() => {
    let arr = [];
    editData?.product_images.map(e => {
      const imageUrl = e ? decodeURIComponent(e.image) : null;

      arr.push({
        path: imageUrl, // Use the decoded image URL
        realPath: imageUrl, // Set realPath as the same decoded URL
        mime: 'image/jpeg', // Assume the image is JPEG
        name: e.image + '', // Use the image name
      });
    });

    setImages(arr);
  }, []);

  useEffect(() => {
    if (categories?.length && editData?.category?.id) {
      const foundCategory = categories.find(
        category => category.id === editData.category?.id,
      );
      if (foundCategory) {
        setValueCategory(foundCategory.id); // Set the category name in the dropdown
      }
    }

    if (subCategoriesData?.length && editData?.subcategory_id) {
      console.log('FINDING SUB CATEGORY');
      subCategoriesData.forEach(category =>
        console.log('SubCategory ID:', category.id),
      );
      const foundSubCategory = subCategoriesData.find(
        category => category.id === editData?.subcategory_id,
      );
      if (foundSubCategory) {
        console.log('FOUND THE SUB CATEGORY');
        setvalueSubCategory(foundSubCategory.id); // Set the category name in the dropdown
      }
    }
  }, [categories, subCategoriesData, editData]);

  const data = [{label: 'Item 1', value: '1'}];

  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(12),
          width: wp(26),
          borderWidth: 1,
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 11.5,
          borderColor: '#E5E5E5',
          backgroundColor: '#FAFAFA',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
        }}>
        {/* <TouchableOpacity 
                    onPress={() => {
                        let img = [...images]
                        img.splice(index, 1)
                        setImages(img)
                    }}
                    style={{position:"absolute" , zIndex:1 , right:0 ,top : 0 , height:20 , width:20 , backgroundColor:"black"}}
                    ></TouchableOpacity> */}
        {/* Image_URL + */}
        <Image
          source={{uri: item?.path}}
          style={{height: '100%', width: '100%'}}
        />
        {/* <Text style={{fontSize:12,color:'#242424',marginVertical:8}}>{'Add Photos'}</Text> */}
      </TouchableOpacity>
    );
  };

  const onPicker = async () => {
    try {
      const multiSelectedMode = true;

      const response = await openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        isPreview: true,
        maxVideo: 5,
        doneTitle: 'Done',
        multiSelectedMode,
        isCrop: true,
      });

      const crop = response.crop;

      if (crop) {
        response.path = crop.path;
        response.width = crop.width;
        response.height = crop.height;
      }
      console.log(response, 'kkkkkkk');
      // Save the image file path as a URI with the `file://` protocol
      const imageUri =
        Platform.OS === 'android' ? 'file://' + response.path : response.path;

      // Update the images state with the new image URI
      // setImages([...images, { path: imageUri }]);
      //setImages(response);
      setImages(response);
      // console.log(response,'responseresponseresponse---------------------->')
    } catch (e) {}
  };

  const onSubmit = async data => {
    console.log('ON SUBMIT BUTTON PRESSED IN EDIT ITEM SCREEN NEW');
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', await AsyncStorage.getItem('idToken'));
    console.log('MY HEADERS', myHeaders);
    var formdata = new FormData();
    // formdata.append("image", fileInput.files[0], "1666941657863--demo.jpg");
    formdata.append('product_id', data?.id);
    formdata.append('name', data?.name);
    formdata.append('selling_price', price);
    formdata.append('expire_date', data?.expire_date);
    // // formdata.append("actual_price", "220");
    formdata.append('category_id', valueCategory);
    formdata.append('sub_category_id', valueSubCategory);
    formdata.append('quantity', quantity);
    formdata.append('upc_code', data?.upc_code);

    // images.map((e) => {
    //     formdata.append("image", {
    //         uri: e.path,
    //         type: e.mime,
    //         name: e.realPath,
    //     }, e.name);
    // })
    formdata.append('description', data?.description);
    formdata.append('status', 'published');

    // formdata.append("size", data?.size);

    console.log('FORM DATA IN EDIT ITEM SCREEN NEWWW', formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    axios
      .post(
        'https://us-central1-onepantry-us.cloudfunctions.net/backend/api/v1/seller/productupdate',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Should not be needed if using FormData
          },
        },
      )
      .then(response => {
        // Handle the response
        console.log('RESULT', response.data);

        ProductListSeller({
          params: {list_type: 'publish', filter_type: 'Dsc', limit: 20000},
          onSuccess: () => {
            navigation.navigate('SellerStack', {screen: 'SaleItem'});
            setLoader(false);
          },
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const onDraftSave = async data => {
    setDraftLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', await AsyncStorage.getItem('token'));
    var formdata = new FormData();
    // formdata.append("image", fileInput.files[0], "1666941657863--demo.jpg");
    formdata.append('product_id', data?._id);
    formdata.append('name', data?.name);
    formdata.append('selling_price', price);
    // formdata.append("actual_price", "220");
    formdata.append('category_id', valueCategory);
    formdata.append('sub_category_id', valueSubCategory);
    formdata.append('quantity', quantity);
    formdata.append('upc_code', data?.upc_code);

    images.map(e => {
      formdata.append(
        'image',
        {
          uri: e.path,
          type: e.mime,
          name: e.realPath,
        },
        e.name,
      );
    });
    formdata.append('description', data?.description);
    formdata.append('is_publish', false);

    formdata.append('size', data?.size);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'http://54.201.160.69:3282/api/v1/seller/productupdate',
      requestOptions,
    )
      .then(response => response.text())
      .then(
        result => console.log(result),
        setDraftLoader(false),
        navigation.navigate('SellerStack', {screen: 'SaleItem'}),
      )
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    if (valueCategory) {
      getSubCategories(valueCategory);
    }
  }, [valueCategory]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BackComponent text={'Edit Item'} edit />
      <ScrollView style={{flex: 1, padding: 20}}>
        {/* //onChange={sellerProductList */}
        <InputText
          label={editData?.name}
          inputstyle={{padding: 10, color: '#242424', fontSize: 14}}
          placeholderTextColor
          style={{
            borderRadius: 35,
            borderColor: '#E9ECEF',
            borderWidth: 0.9,
            height: hp(7),
          }}
          textInputProps={{placeholder: editData?.name, autoCapitalize: 'none'}}
          controllerProps={{
            name: 'name',
            control,
            errors,
            rules: {required: true},
          }}
        />
        <DropDown
          placeholder={'Select Category'}
          value={valueCategory}
          setValue={setValueCategory}
          data={categories}
          isData // Assuming DropDown uses Catdata for options
        />
        <DropDown
          placeholder={'Select Sub Category'}
          value={valueSubCategory}
          setValue={setvalueSubCategory}
          data={subCategoriesData}
          isData
        />
        <InputText
          label={'Item Size'}
          inputstyle={{padding: 10, color: '#242424', fontSize: 14}}
          placeholderTextColor
          style={{
            borderRadius: 35,
            borderColor: '#E9ECEF',
            borderWidth: 0.9,
            height: hp(7),
          }}
          textInputProps={{
            placeholder: 'Add Item Size',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'size',
            control,
            errors,
            rules: {required: true},
          }}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.MainContainer}
            label={'Quantity'}
            type="number"
            placeholder="Quantity"
            placeholderTextColor="#242424"
            onChangeText={setQuantity}
            value={quantity}
            numberOfLines={3}
            autoCorrect={false}
            keyboardType="default"
          />
        </View>
        <InputText
          label={' Expiry Date'}
          inputstyle={{padding: 10, color: '#242424', fontSize: 14}}
          placeholderTextColor
          style={{
            borderRadius: 35,
            borderColor: '#E9ECEF',
            borderWidth: 0.9,
            height: hp(7),
          }}
          textInputProps={{placeholder: 'Expiry Date', autoCapitalize: 'none'}}
          controllerProps={{
            name: 'expire_date',
            control,
            errors,
            rules: {required: true},
          }}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.MainContainer}
            label={'Price'}
            type="number"
            placeholder="Price"
            placeholderTextColor="#242424"
            onChangeText={setPrice}
            value={price}
            numberOfLines={3}
            autoCorrect={false}
            keyboardType="default"
          />
        </View>
        <InputText
          label={' UPC Number'}
          inputstyle={{padding: 10, color: '#242424', fontSize: 14}}
          placeholderTextColor
          style={{
            borderRadius: 35,
            borderColor: '#E9ECEF',
            borderWidth: 0.9,
            height: hp(7),
          }}
          textInputProps={{placeholder: 'UPC Number', autoCapitalize: 'none'}}
          controllerProps={{
            name: 'upc_code',
            control,
            errors,
            rules: {required: true},
          }}
        />

        <DropDown
          placeholder={'Select Shipping'}
          value={valueAddress}
          setValue={setValueAddress}
          data={data}
        />
        <Text style={{fontSize: 14, color: '#242424', marginBottom: 11.5}}>
          {'Upload Image'}
        </Text>
        <View style={{}}>
          <FlatList
            style={{marginBottom: 15}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={editData?.product_images} // Use product_images directly from the item
            renderItem={({item: imageUrl}) => {
              // Destructure the image URL directly
              // Log the decoded image URL
              const decodedImageUrl = decodeURIComponent(imageUrl);

              return (
                <Image
                  source={{uri: decodedImageUrl}} // Decode the image URL
                  style={{height: hp(12), width: wp(26), marginRight: 10}}
                  resizeMode="cover"
                />
              ); // Print the image URL
            }}
            keyExtractor={imageUrl => imageUrl}
          />

          <TouchableOpacity
            onPress={onPicker}
            style={{
              height: hp(12),
              width: wp(26),
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 11.5,
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAFA',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGE.AddGreenCircle}
              style={{height: hp(2.3), width: wp(5), resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 12, color: '#242424', marginVertical: 8}}>
              {'Add Photos'}
            </Text>
          </TouchableOpacity>
        </View>
        <InputText
          label={' Description '}
          numberofline
          inputstyle={{
            padding: 10,
            height: hp(7),
            width: wp(83),
            color: '#242424',
            fontSize: 14,
          }}
          placeholderTextColor
          style={{
            borderRadius: 35,
            borderColor: '#E9ECEF',
            borderWidth: 0.9,
            height: hp(7),
          }}
          textInputProps={{placeholder: 'Description ', autoCapitalize: 'none'}}
          controllerProps={{
            name: 'description',
            control,
            errors,
            rules: {required: true},
          }}
        />

        <Button
          title={
            draftLoader ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              'Save item as draft'
            )
          }
          style={{
            marginTop: 10,
            marginBottom: 50,
            borderColor: COLORS.Green,
            borderWidth: 2,
            backgroundColor: '#fff',
            borderRadius: 35,
            width: '100%',
          }}
          color={{color: 'green'}}
          onPress={handleSubmit(onDraftSave)}
        />
        <Button
          title={
            loader ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              'Save item & publish '
            )
          }
          style={{
            marginTop: -30,
            marginBottom: 50,
            backgroundColor: COLORS.Green,
            borderRadius: 35,
            width: '100%',
          }}
          color={{color: '#fff'}}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  );
};

export default EditItemScreen;
const styles = StyleSheet.create({
  ActivButton: {
    width: 165,
    height: 45,

    borderRadius: 4,
    justifyContent: 'center',
    // marginRight: 8,
    borderColor: COLORS.Green,
    //borderWidth: 1
  },
  MainContainer: {
    width: wp(60),
    height: hp(6),
    color: '#242424',
    marginLeft: 10,
    marginRight: 18,
  },
  inputView: {
    alignItems: 'center',
    marginBottom: 11.5,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },
  ButtonSecurity: {
    width: 165,
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    borderColor: COLORS.Green,
    // borderWidth: 1
  },
  mainView: {
    width: 341,
    backgroundColor: '#fff',
    height: 66,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 19,
    justifyContent: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#808080',
  },
  customRatingBarStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textrating: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.Green,
    marginTop: 7,
  },
  BankViewBlock: {
    width: wp(90),
    backgroundColor: '#fff',
    height: hp(5.5),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
    elevation: 2,
  },
});
