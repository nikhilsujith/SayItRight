// API

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
