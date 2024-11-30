import nodeModel from '../models/nodeModel';

const getNode = async (userId: string, file_id: string) => {
  return new Promise((resolve, reject) => {
    nodeModel.selectNode(userId, file_id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { getNode };
