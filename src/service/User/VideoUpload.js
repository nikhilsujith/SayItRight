import mime from 'mime';
export const uploadVideoAsync = async (uri,video,poolId) => {
  const url = 'https://say-it-right.herokuapp.com/api/v1/user/video/upload/'+poolId;
  console.log(url)
  const newVideoUri = 'file:///' + uri.split('file:/').join('');
  try {
    let formData = new FormData();
    formData.append('file', {
      uri: newVideoUri,
      type: mime.getType(newVideoUri),
      name: newVideoUri.split('/').pop(),
    });
//    return await fetch(url, {
//      method: 'POST',
//      Accept: 'application/json',
//      'Content-Type': 'multipart/form-data',
//      body: formData,
//    })
//    .then((data) => JSON.stringify(data));

    const response = await fetch(url, {
                                 method: 'POST',
                                 Accept: 'application/json',
                                 'Content-Type': 'multipart/form-data',
                                 body: formData,
                               });
      const body = await response.text();
      const status = await response.status;
      return { status: status, body: body };
  } catch (error) {
    alert("User Video Upload Error")
    console.log('error', error);
  }
};
