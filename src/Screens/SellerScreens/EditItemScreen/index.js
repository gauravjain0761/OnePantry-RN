import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  TextInput,
  Button,
  Dropdown,
  AddItemImage,
  Loader,
} from '../../../Components';
import {shipData} from '../../../Constant';
import useEditItem from './useEditItem';
import useStyle from './styles';

const AddItemScreen = () => {
  const styles = useStyle();
  const {
    categories,
    subCategoriesData,
    control,
    isLoading,
    category,
    subCategory,
    images,
    setImageData,
    setSubCategory,
    setCategory,
    onSubmitHandler,
    onDraftSubmitHandler,
  } = useEditItem();

  const [valueAddress, setValueAddress] = useState(null);

  return (
    <View style={styles.container}>
      <Header text="Edit Item" isEdit />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <TextInput
          label="Product name"
          name="name"
          placeholder="Enter item name"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <View>
          <Text style={styles.textLabel}>{'Category'}</Text>
          <Dropdown
            placeholder={'Select Category'}
            value={category}
            isData
            data={categories}
            setValue={setCategory}
          />
        </View>
        <View>
          <Text style={styles.textLabel}>{'Sub category'}</Text>
          <Dropdown
            placeholder={'Select Sub Category'}
            value={subCategory}
            data={subCategoriesData}
            isData
            setValue={setSubCategory}
          />
        </View>
        <TextInput
          name="size"
          label="Size"
          placeholder="Enter item size"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <TextInput
          name="quantity"
          label="Quantity"
          placeholder="Enter Quantity"
          keyboardType="number-pad"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <TextInput
          name="selling_price"
          label="Price"
          placeholder="Enter Price"
          keyboardType="number-pad"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <TextInput
          label="Expiry"
          name="expiry_date"
          placeholder="Expiry Date (MM/DD/YYYY)"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <TextInput
          label="Upc code"
          name="upc_code"
          placeholder="UPC Number"
          control={control}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <View>
          <Text style={styles.textLabel}>{'Shipping'}</Text>
          <Dropdown
            placeholder={'Select Shipping'}
            value={valueAddress}
            setValue={value => {
              setValueAddress(value);
            }}
            data={shipData}
          />
        </View>
        <AddItemImage images={images} setImages={setImageData} />
        <TextInput
          label="Description"
          name="description"
          placeholder="Enter description"
          control={control}
          multiline={true}
          containerStyle={styles.inputContainer}
          labelStyles={styles.textLabel}
        />
        <Button
          title="Save item as draft"
          style={styles.draftButton}
          color={styles.draftButtonText}
          loader={false}
          onPress={onDraftSubmitHandler}
        />
        <Button
          title="Save item & publish"
          style={styles.button}
          loader={false}
          onPress={onSubmitHandler}
        />
        <Loader isVisible={isLoading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItemScreen;
