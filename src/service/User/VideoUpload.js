import mime from 'mime';
export const uploadVideoAsync = async (uri, poolId) => {
  const url = 'https://say-it-right.herokuapp.com/api/v1/user/file/upload/'+poolId;
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
    })
    .then((data) => JSON.stringify(data));
    
  } catch (error) {
    alert("User Video Upload Error")
    console.log('error', error);
  }
};
