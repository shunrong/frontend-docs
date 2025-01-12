import React from 'react';
import { Button, Space } from 'antd';
import useBoolean from '..';

const Demo: React.FC = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <p>当前状态: {JSON.stringify(state)}</p>
      <Space>
        <Button onClick={toggle}>切换</Button>
        <Button type="primary" onClick={setTrue}>
          设置为 True
        </Button>
        <Button danger onClick={setFalse}>
          设置为 False
        </Button>
      </Space>
    </>
  );
};

export default Demo; 