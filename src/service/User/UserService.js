// API

// fetch enrolled groups
export const fetchEnrolledGroups = (id) => {
  const tempId = "e5b1e37e-a5d3-458d-9efa-7b0e17e56c5a";
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

export const fetchUser = (id) => {
  const tempId = "e5b1e37e-a5d3-458d-9efa-7b0e17e56c5a";
  try {
    const url = `https://say-it-right.herokuapp.com/api/v1/user/${tempId}`;
    return fetch(url).then((data) => data.json());
    // .then(data => console.log(data))
  } catch (error) {
    alert("Fetch Group Error");
    console.log(error);
  }
};