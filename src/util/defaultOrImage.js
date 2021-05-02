export default defaultOrImage = (image) => {
  const defaultImage = {
    uri:
      "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
  };

  if (image) {
    return { uri: image };
  } else {
    return defaultImage;
  }
};
