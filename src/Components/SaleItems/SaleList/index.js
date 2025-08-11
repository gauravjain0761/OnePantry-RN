import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {AddItemFooter} from '..';
import {ProductItem} from '../../ListItems';
import {colors} from '../../../Constant';
import BottomFilterComponent from '../../BottomFilterComponent';
import {SearchInput} from '../../Inputs';
import useSaleList from './useSaleList';
import useStyle from './styles';

const SaleList = props => {
  const styles = useStyle();
  const {sheetIndex, snapPoints, bottomSheetRef, setSheetIndex} = useSaleList();
  const {
    loader,
    isFetching = false,
    data = [],
    onEndReached = () => undefined,
    onFilterSelect,
    isSelected = false,
    onChangeText,
  } = props;
  const renderItem = ({item}) => {
    return <ProductItem item={item} />;
  };
  if (!isSelected) return null;
  return (
    <View style={styles.container}>
      <SearchInput
        isSeller
        onChangeText={onChangeText}
        onPress={() => setSheetIndex(1)}
      />
      {loader && <ActivityIndicator color={colors.primary} />}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<AddItemFooter isLoading={loader} />}
        ListFooterComponent={
          isFetching && <ActivityIndicator color={colors.primary} />
        }
      />
      <BottomFilterComponent
        onFilterSelect={onFilterSelect}
        bottomSheetRef={bottomSheetRef}
        sheetIndex={sheetIndex}
        snapPoints={snapPoints}
        setSheetIndex={setSheetIndex}
      />
    </View>
  );
};

export default SaleList;
