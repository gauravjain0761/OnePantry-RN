import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesMutation,
  useEditProductMutation,
} from '../../../Services';
import {selectUser} from '../../../Store';
import {addProductFormValidation} from '../../../Validations';

export default () => {
  const {goBack, navigate} = useNavigation();
  const route = useRoute();
  const editData = route?.params ?? {};

  const user = useSelector(selectUser);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [images, setImages] = useState(editData?.product_images);
  const {id = ''} = user || {};

  //hook form
  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
      name: editData?.name,
      size: editData?.size,
      quantity: editData.quantity.toString(),
      selling_price: editData?.selling_price.toString(),
      expiry_date: editData?.expire_date,
      description: editData?.description,
      upc_code: editData?.upc_code,
      category_id: editData?.category_id,
      subcategory_id: editData?.subcategory_id,
    },
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
  const [editProduct, {isLoading}] = useEditProductMutation();
  // callback handlers
  const editProductHandler = async data => {
    const formData = new FormData();
    formData.append('category_id', data?.category_id);
    formData.append('description', data?.description);
    formData.append('name', data?.name);
    formData.append('sub_category_id', data?.subcategory_id);
    formData.append('expire_date', data?.expiry_date ?? '');
    formData.append('selling_price', Number(data?.selling_price));
    formData.append('size', Number(data?.size));
    formData.append('quantity', Number(data?.quantity));
    formData.append('upc_code', data?.upc_code);
    formData.append('status', data?.status);
    formData.append('user_id', id);
    formData.append('product_id', editData?.id);
    formData.append('shiping_charge', 0);
    const imagesData = images.filter(item => typeof item !== 'string');
    if (imagesData.length > 0) {
      imagesData.map(e => {
        formData.append(
          'image', // API field key for the image
          {
            uri: Platform.OS === 'ios' ? e.path.replace('file://', '') : e.path,
            type: e.mime,
            name: e.fileName, // Use fileName from image object
          },
        );
      });
    }
    const response = await editProduct({
      formData,
      status: data?.status,
      currentStatus: editData?.status,
    });
    if (response?.data?.message === 'Product Updated Successfully') {
      goBack();
    }
  };
  const setImageData = useCallback(
    imagesData => {
      setImages([...editData?.product_images, ...imagesData]);
    },
    [editData?.product_images],
  );
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
    editProductHandler({...data, status: 'published'}),
  );
  const onDraftSubmitHandler = handleSubmit(data =>
    editProductHandler({...data, status: 'draft'}),
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
    setImageData,
    setImages,
    setSubCategory,
    setCategory,
    onSubmitHandler,
    onDraftSubmitHandler,
    navigationHandler,
  };
};
