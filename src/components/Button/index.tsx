import React from 'react';
import classNames from 'classnames';
import './index.less';

export type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

const LoadingIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    className="lime-btn-loading-icon"
    data-icon="loading"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
  </svg>
);

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮大小 */
  size?: ButtonSize;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮的 html type */
  htmlType?: ButtonHTMLType;
  /** 按钮图标 */
  icon?: React.ReactNode;
  /** 按钮内容 */
  children?: React.ReactNode;
  /** 点击回调 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 额外的类名 */
  className?: string;
  /** 额外的样式 */
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  shape = 'default',
  disabled = false,
  loading = false,
  icon,
  children,
  onClick,
  className,
  style,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const prefixCls = 'lime-btn';
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape !== 'default',
      [`${prefixCls}-${size}`]: size !== 'middle',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-icon-only`]: !children && icon,
    },
    className,
  );

  const iconNode = loading ? <LoadingIcon /> : icon;

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      {...rest}
    >
      {iconNode}
      {children && <span>{children}</span>}
    </button>
  );
};


export default Button;
