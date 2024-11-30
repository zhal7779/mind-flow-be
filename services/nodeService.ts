import nodeModel from '../models/nodeModel';
interface FileData {
  file_id: string;
  file_name: string;
  tag: string;
  theme_color: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  storage: boolean;
  deleted_at: string;
  scheduled_deletion_at: string;
}
interface Position {
  r: number;
  t: number;
  x: number;
  y: number;
}

interface ParentNode {
  node: number;
  position: Position;
}

interface ChildNode {
  position: Position;
  level: number;
  side: string;
}
interface NodeData {
  node_id: number;
  file_id: string;
  value: string;
  node: number;
  level: number;
  position: Position;
  parent_node: ParentNode;
  left_child: ChildNode[];
  right_child: ChildNode[];
}

interface NodeResult {
  file: FileData[];
  node: NodeData[];
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

export default { getNode };
