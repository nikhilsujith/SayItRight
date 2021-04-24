// Fetch created groups
export async function fetchUsersInGroup(id) {
  // const id = '602e183e8bb978df6a913a1d';
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/users?groupId=${id}`;
    return (await fetch(url)
      .then(data => data.json()))
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
}

// Fetch All groups
export async function fetchAllGroups() {
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/all`;
    return (await fetch(url)
      .then(data => data.json()))
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
}