import {openPicker} from '@baronha/react-native-multiple-image-picker';

export default ({images, setImages}) => {
  const onPicker = async () => {
    try {
      const multiSelectedMode = true;

      const response = await openPicker({
        selectedAssets: images.filter(item => typeof item !== 'string'),
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
      setImages(response);
      onImageSet(response);
    } catch (e) {}
  };

  return {onPicker};
};
