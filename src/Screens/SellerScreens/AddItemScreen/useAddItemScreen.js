import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesMutation,
  useAddProductMutation,
} from '../../../Services';
import {selectUser} from '../../../Store';
import {addProductFormValidation} from '../../../Validations';

export default () => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector(selectUser);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [images, setImages] = useState([]);
  const {id = ''} = user || {};

  //hook form
  const {
    control,
    formState: {errors},
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(addProductFormValidation),
  });
  const category = watch('category_id');
  const subCategory = watch('subcategory_id');
  // rtk queries
  const {data} = useGetCategoriesQuery();
  const categories = data?.data?.data ?? [];
  const [subCategories] = useGetSubCategoriesMutation();
  const getSubCategories = async categoryId => {
    const response = await subCategories({category_id: categoryId});
    setSubCategoriesData(response?.data?.data?.data);
  };
  const [addProduct, {isLoading}] = useAddProductMutation();
  // callback handlers
  const addProductHandler = async data => {
    const formData = new FormData();
    formData.append('category_id', data?.category_id);
    formData.append('description', data?.description);
    formData.append('name', data?.name);
    formData.append('sub_category_id', data?.subcategory_id);
    formData.append('expire_date', data?.expiry_date ?? '');
    formData.append('selling_price', data?.selling_price);
    formData.append('size', data?.size);
    formData.append('quantity', data?.quantity);
    formData.append('upc_code', data?.upc_code);
    formData.append('status', data?.status);
    formData.append('user_id', id);
    formData.append('shiping_charge', 0);
    images.map(e => {
      formData.append(
        'image', // API field key for the image
        {
          uri: Platform.OS === 'ios' ? e.path.replace('file://', '') : e.path,
          type: e.mime,
          name: e.fileName, // Use fileName from image object
        },
      );
    });
    const response = await addProduct({
      formData,
      status: data?.status,
    });
    if (response?.data?.message === 'Product Add Successfully') {
      goBack();
    }
  };

  const navigationHandler = useCallback(screenName => {
    navigate(screenName);
  }, []);
  const setCategory = useCallback(data => {
    setValue('category_id', data, {shouldDirty: true});
  }, []);
  const setSubCategory = useCallback(data => {
    setValue('subcategory_id', data, {shouldDirty: true});
  }, []);
  const onSubmitHandler = handleSubmit(data =>
    addProductHandler({...data, status: 'published'}),
  );
  const onDraftSubmitHandler = handleSubmit(data =>
    addProductHandler({...data, status: 'draft'}),
  );

  useEffect(() => {
    if (category) {
      getSubCategories(category);
    }
  }, [category]);

  return {
    categories,
    subCategoriesData,
    control,
    isLoading,
    category,
    subCategory,
    images,
    setImages,
    setSubCategory,
    setCategory,
    onSubmitHandler,
    onDraftSubmitHandler,
    navigationHandler,
  };
};
