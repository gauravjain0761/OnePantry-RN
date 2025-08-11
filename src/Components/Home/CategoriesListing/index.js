import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import useStyle from './styles';
import {useNavigation} from '@react-navigation/native';

const EmptyList = props => {
  const styles = useStyle();
  const {categories = [], onPress = () => {}} = props;
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item);
        }}
        style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={styles.itemImage}
        />
        <Text style={styles.itemText}>
          {item.category_name === 'undefined' ? null : item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.listingHeader}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowAllCategory', categories)}>
          <Text style={styles.titleSee}>Show All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        data={categories}
      />
    </View>
  );
};

export default EmptyList;
