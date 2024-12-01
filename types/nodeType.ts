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
export interface IResponseNode {
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

export interface IRequestTree {
  file_id: string;
  file_name: string;
  node_id: number;
  tag: string;
  theme_color: string;
  updated_at: string;
  tree: {
    value: string;
    level: number;
    node: number;
    position: Position;
    right_child: any[];
    left_child: any[];
    parent_node: {
      node: number;
      position: Position;
    };
  };
}
