export default defaultOrImage = (image) => {
  const defaultImage = {
    uri:
      "https://nik-dev-personal-bucket.s3.amazonaws.com/say-it-right-icon.png",
  };

  if (image) {
    return { uri: image };
  } else {
    return defaultImage;
  }
};
