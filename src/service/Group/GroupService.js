// Fetch created groups
import mime from 'mime';

export async function fetchUsersInGroup(id) {
  const groupId = id;
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/users?groupId=${groupId}`;
    return await fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
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
    alert("Fetch Group Error");
    console.log(error);
  }
}

// Delete Group
export async function deleteGroup(id) {
  const groupId = id;
  // console.log(groupId);
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/delete/${groupId}`;
    return (
      await fetch(url, {
        method: "DELETE",
      }).then((data) => data.json())
    ).then(alert("Group Successfully Deleted"));
    // .then(data => //console.log(data))
  } catch (error) {
    alert("Delete Group Error");
    console.log(error);
  }
}

// Create Group
export const createGroup = async (groupName, groupDesc, poolId, creatorName, creatorObjId) => {
  try {
    const res= await fetch('https://say-it-right.herokuapp.com/api/v1/group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupName: groupName,
        groupDesc: groupDesc,
        groupImage:"",
        creatorId:creatorObjId,
        creatorName: creatorName,
        createrPoolId: poolId,
        users: [],
        createdOn:Date().toLocaleString(),
        updatedOn:""
      }),
    })
    if (res.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let grpId = await res.text();
      return { status: res.status, body: grpId };
    }
        //const body = await response;
        //console.log(response)
       // return { status: status, body: body };
    //alert('Group Created');
  } catch (error) {
    console.log(error);
    return { status: '500', body: error };
  }
};

export const imageUploadGroup = async (uri, image, groupId, poolId) => {
    const newImageUri = 'file:///' + uri.split('file:/').join('');
    try {
      let formData = new FormData();
      formData.append('file', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });

      //console.log(formData)
      return await fetch(
        'https://say-it-right.herokuapp.com/api/v1/group/image/upload/?groupId='+groupId+'&poolId='+poolId,
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

// Exit Group
export const exitGroup = async (groupId, poolId) => {
  try {
    return await fetch(
      `https://say-it-right.herokuapp.com/api/v1/group/exitGroup?group=${groupId}&pool=${poolId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    // .then((response) => JSON.stringify(response))
    .then((response) => data = response)
    // .then((data) =>  {
    //   if (data.status == 200){
    //     alert("You have successfully exited the group");
    //   }
    //   else {
    //     alert("Oops, something went wrong, Please try again later");
    //   }
    // })
  } catch (error) {
    console.log(error);
    alert("Exit Group Service Error");
  }
};
