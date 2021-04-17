// API

// get user by poolid
export const getUserByPoolId = (id) => {
  const tempId = "p1";
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/user/${tempId}`;
    return fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
};

//(id) => {
//  const tempId = "p1";
//  console.log(id)
//  try {
//    const url = 'https://say-it-right.herokuapp.com/api/v1/user/p1';
//    return fetch('https://say-it-right.herokuapp.com/api/v1/user/p1')
//               .then((response) => response.json())
//               .then((json) => {
//                 return json.status;
//               })
//               .catch((error) => {
//                 console.error(error);
//               });
//  } catch (error) {
//    alert("Get user by poolid Error");
//    console.log(error);
//  }
//};

// fetch enrolled groups
export const fetchEnrolledGroups = (id) => {
  const tempId = "p1";
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/user/enrolled?id=${tempId}`;
    return fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
};

// Fetch created groups
export const fetchCreatedGroups = (id) => {
    const tempId = "p1";
    try {
      const url = `https://say-it-right.herokuapp.com/api/v1/user/created?id=${tempId}`;
      return fetch(url).then((data) => data.json());
      // .then(data => console.log(data))
    } catch (error) {
      alert("Fetch Group Error");
      console.log(error);
    }
  };

  export const enrollGroup = (groupId, poolId) => {
    groupIdTemp = "602e1d5e8bb978df6a913a29";
    poolIdTemp = "p1";
    try {
      const url = `https://say-it-right.herokuapp.com/api/v1/user/enroll?group=${groupId}&&pool=${poolId}`;
      return fetch(url).then((data) => data.json())
      .then(data => console.log(data))
    } catch (error) {
      alert("Fetch Group Error");
      console.log(error);
    }
  };
