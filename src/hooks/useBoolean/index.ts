import { useCallback, useState } from 'react';

export interface UseBooleanActions {
  /** 设置为 true */
  setTrue: () => void;
  /** 设置为 false */
  setFalse: () => void;
  /** 切换值 */
  toggle: () => void;
  /** 设置任意值 */
  set: (value: boolean) => void;
}

/**
 * 管理 boolean 值的 Hook
 * @param defaultValue - 可选的默认值
 * @returns [boolean, UseBooleanActions]
 * @example
 * ```ts
 * const [visible, { toggle, setTrue, setFalse }] = useBoolean(false);
 * ```
 */
export default function useBoolean(defaultValue = false): [boolean, UseBooleanActions] {
  const [state, setState] = useState(defaultValue);

  const actions: UseBooleanActions = {
    setTrue: useCallback(() => setState(true), []),
    setFalse: useCallback(() => setState(false), []),
    toggle: useCallback(() => setState(v => !v), []),
    set: useCallback((value: boolean) => setState(value), []),
  };

  return [state, actions];
}
