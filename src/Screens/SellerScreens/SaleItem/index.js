import React from 'react';
import {View} from 'react-native';
import {Images} from '../../../Constant/Images';
import {ScreenNames} from '../../../Constant';
import {Header, AddItemTab, SaleList} from '../../../Components';
import useSaleItem from './useSaleItem';
import useStyle from './styles';

const SaleItem = () => {
  const styles = useStyle();
  const {
    toggle,
    publishedProducts,
    isPublishedLoading,
    draftLoading,
    draftProducts,
    isPublishedFooter,
    debouncedSearch,
    onEndReachedPublished,
    onEndReachedDraft,
    setToggle,
    navigationHandler,
  } = useSaleItem();

  return (
    <View style={styles.container}>
      <Header
        text="My Items"
        image={Images.addItem}
        onPress={() => navigationHandler(ScreenNames.AddItemScreen)}
      />
      <View style={styles.contentContainer}>
        <AddItemTab isSelected={toggle} onPress={setToggle} />
        <SaleList
          data={publishedProducts}
          loader={isPublishedLoading}
          isSelected={toggle === 1}
          isFetching={isPublishedFooter}
          onChangeText={debouncedSearch}
          onEndReached={onEndReachedPublished}
        />
        <SaleList
          data={draftProducts}
          loader={draftLoading}
          onChangeText={debouncedSearch}
          isSelected={toggle === 2}
          onEndReached={onEndReachedDraft}
        />
      </View>
    </View>
  );
};

export default SaleItem;
