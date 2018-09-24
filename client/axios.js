import axios from "axios";
let headers = {
  "Content-Type": "application/json",
  app_id: "SECRET",
  app_key: "SECRET"
};

export const recognize = async function(img) {
  try {
    let res = await axios.post(
      "https://api.kairos.com/recognize",
      {
        "image": `${img}`,
        "gallery_name": "MyGallery"
      },
      { headers: headers }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const enroll = async function(img, email) {
  try {
    let res = await axios.post(
      "https://api.kairos.com/enroll",
      {
        "image": `${img}`,
        "subject_id": `${email}`,
        "gallery_name": "MyGallery"
      },
      { headers: headers }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const postUser = async function(name, email, password) {
  await axios.post("/api/user", { name, email, password });
};

export const getUser = async function(email){
 let res = await axios.get(`/api/users/${email}`);
  return res.data
}
