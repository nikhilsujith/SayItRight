// API
// get user by poolid
export const getUserByPoolId = async (id) => {
  //setTimeout(async() => {
  const response = await fetch(
    "https://say-it-right.herokuapp.com/api/v1/user/" + id
  );
  const body = await response.json();
  const status = await response.status;
  return { status: status, body: body };
  //}, 5000);
};

// fetch enrolled groups
export const fetchEnrolledGroups = (id) => {
  const poolId = id;
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/user/enrolled?id=${poolId}`;
    return fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
};

// Fetch created groups
export const fetchCreatedGroups = (id) => {
  const poolId = id;
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/user/created?id=${poolId}`;
    return fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Created Groups Error");
    console.log(error);
  }
};

export const enrollGroup = (groupId, poolId) => {
  pId = poolId;
  gId = groupId;
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/group/enroll?group=${gId}&&pool=${pId}`;
    return fetch(url,{
      method: 'POST'
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
};