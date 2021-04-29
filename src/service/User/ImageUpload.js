import mime from 'mime';
export const imageUpload = async (uri, image,poolId) => {
  const url = 'https://say-it-right.herokuapp.com/api/v1/user/image/upload/'+poolId;
  const newImageUri = 'file:///' + uri.split('file:/').join('');

  try {
    let formData = new FormData();
    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });

    return await fetch(url, {
      method: 'POST',
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      body: formData,
    });
  } catch (error) {
    console.log('error', error);
  }
};
