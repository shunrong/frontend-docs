import React from 'react';
import { default as Button } from '../index';
import { SearchOutlined } from '@ant-design/icons';

export default () => (
  <>
    <Button icon={<SearchOutlined />}>Default</Button>
    <Button icon={<SearchOutlined />} shape="circle" />
    <Button icon={<SearchOutlined />} shape="round">Round</Button>
  </>
); 