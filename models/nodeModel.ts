import db from '../utils/dbConnect';
import { IRequestTree } from '../types/nodeType';
const selectNode = (
  file_id: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const queryFile = 'SELECT * FROM files WHERE file_id = ? ';
  const queryNode = 'SELECT * FROM nodes WHERE file_id = ? ';

  // files 테이블에 데이터 호출
  db.query(queryFile, [file_id], (fileErr, fileResult) => {
    if (fileErr) {
      console.error('files 호출 오류:', fileErr);
      return callback(fileErr);
    }

    // nodes 테이블에 데이터 호출
    db.query(queryNode, [file_id], (nodeErr, nodeResult) => {
      if (nodeErr) {
        console.error('nodes 호출 오류:', nodeErr);
        return callback(nodeErr);
      }

      callback(null, { file: fileResult, node: nodeResult });
    });
  });
};

const updateNode = (
  newNodeData: IRequestTree,
  callback: (err: Error | null, result?: any) => void
) => {
  const queryFileUpdate = `
  UPDATE files
  SET 
    file_name = COALESCE(?, file_name),
    tag = ?,
    theme_color = COALESCE(?, theme_color),
    updated_at = NOW()
  WHERE file_id = ?
`;

  const queryNodeUpdate = `
UPDATE nodes
SET 
  value = COALESCE(?, value),
  node = COALESCE(?, node),
  level = COALESCE(?, level),
  position = COALESCE(?, position),
  parent_node = COALESCE(?, parent_node),
  left_child = COALESCE(?, left_child),
  right_child = COALESCE(?, right_child)
WHERE node_id = ? AND file_id = ?
`;

  const fileValues = [
    newNodeData.file_name,
    newNodeData.tag,
    newNodeData.theme_color,
    newNodeData.file_id,
  ];

  const nodeValues = [
    newNodeData.tree.value,
    newNodeData.tree.node,
    newNodeData.tree.level,
    newNodeData.tree.position,
    newNodeData.tree.parent_node,
    newNodeData.tree.left_child,
    newNodeData.tree.right_child,
    newNodeData.node_id,
    newNodeData.file_id,
  ];

  // files 테이블 업데이트
  db.query(queryFileUpdate, fileValues, (fileErr) => {
    if (fileErr) {
      console.error('files 업데이트 오류:', fileErr);
      return callback(fileErr);
    }

    // nodes 테이블 업데이트
    db.query(queryNodeUpdate, nodeValues, (nodeErr) => {
      if (nodeErr) {
        console.error('nodes 업데이트 오류:', nodeErr);
        return callback(nodeErr);
      }

      callback(null, {
        file_id: newNodeData.file_id,
        node_id: newNodeData.node_id,
      });
    });
  });
};

export default { selectNode, updateNode };
