import testModel from '../models/testModel';

const getTest = async () => {
  return new Promise((resolve, reject) => {
    testModel.getTest((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const addTest = async (newTest: { name: string }) => {
  return new Promise((resolve, reject) => {
    testModel.addTest(newTest, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { getTest, addTest };
