import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../Constant';
import useAddItemImage from './useAddItemImage';
import useStyle from './styles';

const ImagePickerComponent = props => {
  const styles = useStyle();
  const {images, setImages} = props;
  const {onPicker} = useAddItemImage({images, setImages});

  const renderItems = ({item}) => {
    return (
      <Image
        source={{
          uri: typeof item === 'string' ? decodeURIComponent(item) : item?.path,
        }}
        style={styles.itemImage}
      />
    );
  };

  return (
    <View>
      <Text style={styles.heading}>{'Upload Image'}</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={item => renderItems(item)}
          data={images}
        />
        <TouchableOpacity onPress={onPicker} style={styles.button}>
          <Image source={Images.addGreenCircle} style={styles.addGreenCircle} />
          <Text style={styles.imageTitle}>{'Add Photos'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ImagePickerComponent;
