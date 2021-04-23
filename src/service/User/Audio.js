import mime from 'mime';
export const uploadAuido = async (uri) => {
  const url = 'https://say-it-right.herokuapp.com/api/v1/user/created';
  const newAuidoUri = 'file:///' + uri.split('file:/').join('');

  try {
    let formData = new FormData();
    formData.append('file', {
      uri: newAuidoUri,
      type: mime.getType(newAudioUri),
      name: newAudioUri.split('/').pop(),
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
