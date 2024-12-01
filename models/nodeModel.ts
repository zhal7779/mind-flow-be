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
    newNodeData.file_name || null, // 파일 이름 (nullable)
    newNodeData.tag || null, // 태그 (nullable)
    newNodeData.theme_color || null, // 테마 색상 (nullable)
    newNodeData.file_id, // 파일 ID
  ];

  const nodeValues = [
    newNodeData.tree.value || null, // 값
    newNodeData.tree.node || null, // 노드 ID
    newNodeData.tree.level || null, // 레벨
    JSON.stringify(newNodeData.tree.position || null), // 위치
    JSON.stringify(newNodeData.tree.parent_node || null), // 부모 노드
    JSON.stringify(newNodeData.tree.left_child || []), // 왼쪽 자식 노드 (기본값 빈 배열)
    JSON.stringify(newNodeData.tree.right_child || []), // 오른쪽 자식 노드 (기본값 빈 배열)
    newNodeData.node_id, // 노드 ID
    newNodeData.file_id, // 파일 ID
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
