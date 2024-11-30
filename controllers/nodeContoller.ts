import nodeService from '../services/nodeService';
import { Request, Response } from 'express';

const getNode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.query;

    if (!file_id || typeof file_id !== 'string') {
      res.status(400).json({
        success: false,
        code: 400,
        data: req.query,
        msg: '유효한 file_id 쿼리 파라미터를 제공해주세요.',
      });
      return;
    }

    const result = await nodeService.getNode(file_id);
    const file = result.file[0];
    const node = result.node[0];
    const resposeData = {
      file_id: file.file_id,
      node_id: node.node_id,
      file_name: file.file_name,
      tag: file.tag,
      theme_color: file.theme_color,
      updated_at: file.updated_at,
      tree: {
        value: node.value,
        node: node.node,
        level: node.level,
        position: node.position,
        parent_node: node.parent_node,
        left_child: node.left_child,
        right_child: node.right_child,
      },
    };

    res.status(200).json({
      success: true,
      code: 200,
      data: resposeData,
      msg: 'success',
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      code: 500,
      data: undefined,
      msg: 'faild',
    });
  }
};

export default { getNode };
