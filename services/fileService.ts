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

const patchFileTag = (
  userId: string,
  newTagData: { tag: string; fileId: string }
) => {
  return new Promise((resolve, reject) => {
    fileModel.updateFileTag(userId, newTagData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { postFile, patchFileTag };
