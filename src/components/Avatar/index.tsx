import React from 'react';
import classNames from 'classnames';
import './index.less';

export type AvatarSize = 'large' | 'default' | 'small';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  /** 头像的形状 */
  shape?: AvatarShape;
  /** 头像的大小 */
  size?: AvatarSize | number;
  /** 图片类头像的资源地址 */
  src?: string;
  /** 设置头像的图标类型 */
  icon?: React.ReactNode;
  /** 文本类头像 */
  children?: React.ReactNode;
  /** 额外的 class */
  className?: string;
  /** 图片无法显示时的替代文本 */
  alt?: string;
  /** 图片加载失败的事件 */
  onError?: () => boolean;
  /** 额外的样式 */
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  shape = 'circle',
  size = 'default',
  src,
  icon,
  className,
  alt,
  children,
  onError,
  style,
  ...restProps
}) => {
  const [isImgExist, setIsImgExist] = React.useState(true);

  const handleImgLoadError = () => {
    const errorFlag = onError?.();
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: size / 2,
        }
      : {};

  const classString = classNames(
    'lime-avatar',
    {
      [`lime-avatar-${shape}`]: shape,
      [`lime-avatar-${size}`]: typeof size === 'string',
      'lime-avatar-image': src && isImgExist,
      'lime-avatar-icon': icon,
    },
    className,
  );

  let children_: React.ReactNode = null;

  if (src && isImgExist) {
    children_ = <img src={src} alt={alt} onError={handleImgLoadError} />;
  } else if (icon) {
    children_ = icon;
  } else if (children) {
    children_ = children;
  }

  return (
    <span className={classString} style={{ ...sizeStyle, ...style }} {...restProps}>
      {children_}
    </span>
  );
};

export default Avatar; 