/**
 * Merge `new object` to `old object`
 * @param {T} oldObject
 * @param {T} newObject
 * @returns {T}
 */
export const updateObject = <T, N extends T = T>(oldObject: T, newObject: Partial<N>): Partial<N> & T => {
  return {
    ...oldObject,
    ...newObject,
  };
};
