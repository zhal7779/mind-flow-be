import { IResponseNode, IRequestTree } from './../types/nodeType';
import { IFile } from './../types/fileType';
import nodeModel from '../models/nodeModel';

interface NodeResult {
  file: IFile[];
  node: IResponseNode[];
}

const getNode = async (file_id: string): Promise<NodeResult> => {
  return new Promise((resolve, reject) => {
    nodeModel.selectNode(file_id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const putNode = async (
  newNodeData: IRequestTree
): Promise<{ file_id: string; node_id: number }> => {
  return new Promise((resolve, reject) => {
    nodeModel.updateNode(newNodeData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default { getNode, putNode };
