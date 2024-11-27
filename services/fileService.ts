import fileModel from '../models/fileModel';

const postFile = async (userId: string) => {
  return new Promise((resolve, reject) => {
    fileModel.insertFile(userId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { postFile };
