// Fetch created groups
export async function fetchUsersInGroup(id) {
  const groupId = id;
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/users?groupId=${groupId}`;
    return await fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert('Fetch Group Error');
    //console.log(error);
  }
}

// Fetch All groups
export async function fetchAllGroups() {
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/all`;
    return await fetch(url).then((data) => data.json());
    // .then(data => //console.log(data))
  } catch (error) {
    alert('Fetch Group Error');
    console.log(error);
  }
}

// Delete Group
export async function deleteGroup(id) {
  const groupId = id;
  console.log(groupId);
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/delete/${groupId}`;
    return (
      await fetch(url, {
        method: 'DELETE',
      }).then((data) => data.json())
    ).then(alert('Group Successfully Deleted'));
    // .then(data => //console.log(data))
  } catch (error) {
    alert('Delete Group Error');
    console.log(error);
  }
}

// Create Group
export const createGroup = async (groupName, groupDesc, currentUser) => {
  try {
    await fetch('https://say-it-right.herokuapp.com/api/v1/group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupName: groupName,
        groupDesc: groupDesc,
        creatorName: currentUser,
        createrPoolId: currentUser,
        // groupImage: imageUri,
      }),
    });
    alert('Group Created');
  } catch (error) {
    console.log(error);
    alert('POST has an error');
  }
  const imageUploadGroup = async (uri, image, poolId) => {
    const newImageUri = 'file:///' + uri.split('file:/').join('');
    try {
      let formData = new FormData();
      formData.append('file', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });

      return await fetch(
        'https://say-it-right.herokuapp.com/api/v1/group' + poolId,
        {
          method: 'POST',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          body: formData,
        }
      );
    } catch (error) {
      console.log('error', error);
    }
  };
};
