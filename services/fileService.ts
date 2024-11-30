import fileModel from '../models/fileModel';

const getFiles = async (userId: string, url: string) => {
  return new Promise((resolve, reject) => {
    fileModel.selectFiles(userId, url, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const getFileTag = async (userId: string, tag: string) => {
  return new Promise((resolve, reject) => {
    fileModel.selectFileTag(userId, tag, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

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
  newTagData: { tag: string; file_id: string }
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

const patchFileThemeColor = (
  userId: string,
  updateThemeData: { file_id: string; theme_color: string }
) => {
  return new Promise((resolve, reject) => {
    fileModel.updateFileThemeColor(userId, updateThemeData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const patchFileName = (
  userId: string,
  updateFileNameData: { file_id: string; file_name: string }
) => {
  return new Promise((resolve, reject) => {
    fileModel.updateFileName(userId, updateFileNameData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const patchFileStorage = (userId: string, file_list: string[]) => {
  return new Promise((resolve, reject) => {
    fileModel.updateFileStorage(userId, file_list, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteFile = (userId: string, file_list: string[]) => {
  return new Promise((resolve, reject) => {
    fileModel.deleteFile(userId, file_list, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  getFiles,
  getFileTag,
  postFile,
  patchFileTag,
  patchFileThemeColor,
  patchFileName,
  patchFileStorage,
  deleteFile,
};
