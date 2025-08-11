import {useCallback, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useUpdateUserMutation, useUpdateFileMutation} from '../../Services';
import {selectUser} from '../../Store';
import {EditFormValidation} from '../../Validations';
import {ScreenNames} from '../../Constant';
import {showPopup} from '../../Utils';

export default () => {
  const user = useSelector(selectUser);
  const isFocused = useIsFocused();
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const {firstName, lastName, image: userImage = '', id = ''} = user ?? {};
  const {navigate} = useNavigation();

  // hook form
  const {
    control,
    formState: {isDirty, errors},
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(EditFormValidation),
    defaultValues: {
      firstName,
      lastName,
      image: userImage,
    },
  });
  const image = getValues('image');
  // rtk query
  const [updateUser, {isLoading}] = useUpdateUserMutation();
  const [uploadImage, {isLoading: uploadFileLoading}] = useUpdateFileMutation();
  // callback hooks
  const navigationHandler = useCallback((screen, params = {}) => {
    navigate(ScreenNames.SettingStack, {
      screen: screen,
      params: params,
    });
  }, []);
  const saveHandler = useCallback(
    async data => {
      let payload = {
        firstName: data?.firstName,
        lastName: data?.lastName,
      };
      if (imageRef.current) {
        const fileUploadResponse = await uploadImage({
          image: imageRef?.current,
          path: `user-images/${id}`,
        });
        if (fileUploadResponse?.data) {
          payload = {
            ...payload,
            image: fileUploadResponse?.data,
          };
          imageRef.current = null;
        }
      }
      const response = await updateUser(payload);
      if (response?.data) {
        reset(payload);
        showPopup('User updated Successfully');
      }
    },
    [reset],
  );
  const onSubmitHandler = handleSubmit(saveHandler);
  const setImage = useCallback(img => {
    setValue('image', img?.uri, {shouldDirty: true});
    imageRef.current = img;
  }, []);

  useEffect(() => {
    if (!isFocused) {
      reset({
        image: userImage,
        firstName,
        lastName,
      });
      imageRef.current = null;
    }
  }, [isFocused]);

  // conditional variables
  const loading = uploadFileLoading || isLoading;
  return {
    user,
    modalRef,
    control,
    isDirty,
    loading,
    image,
    setImage,
    navigationHandler,
    onSubmitHandler,
  };
};
