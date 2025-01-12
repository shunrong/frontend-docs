import React from 'react';
import { default as Avatar } from '../index';
import { UserOutlined } from '@ant-design/icons';

export default () => (
  <div>
    <Avatar size={64} icon={<UserOutlined />} />
    <Avatar size={48} icon={<UserOutlined />} />
    <Avatar size={32} icon={<UserOutlined />} />
    <Avatar size={24} icon={<UserOutlined />} />
  </div>
); 