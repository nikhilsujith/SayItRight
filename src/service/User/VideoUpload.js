import mime from 'mime';
export const uploadVideoAsync = async (uri, video) => {
  const url = 'https://say-it-right.herokuapp.com/api/v1/user/file/upload/p1';
  const newVideoUri = 'file:///' + uri.split('file:/').join('');

  try {
    let formData = new FormData();
    formData.append('file', {
      uri: newVideoUri,
      type: mime.getType(newVideoUri),
      name: newVideoUri.split('/').pop(),
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
