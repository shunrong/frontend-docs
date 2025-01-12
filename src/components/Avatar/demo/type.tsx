import React from 'react';
import { default as Avatar } from '../index';
import { UserOutlined } from '@ant-design/icons';

export default () => (
  <div>
    <Avatar icon={<UserOutlined />} />
    <Avatar>U</Avatar>
    <Avatar src="https://joeschmoe.io/api/v1/random" />
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  </div>
); 