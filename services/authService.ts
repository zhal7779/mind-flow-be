import userModel from '../models/userModel';

const getUser = async () => {
  return new Promise((resolve, reject) => {
    userModel.getUser((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const postUser = async (newUser: {
  id: string;
  password: string;
  name: string;
}) => {
  return new Promise((resolve, reject) => {
    userModel.postUser(newUser, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { getUser, postUser };
