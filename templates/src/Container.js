import React, { useMemo } from 'react';

export default function Container({ children }) {
  const style = useMemo(() => ({ height: !window._IS_RUN_MICRO_BASIC ? '100vh' : '100%' }), []);
  return (
    <div className="micro-demo-map-layout" style={style}>
      {children}
    </div>
  );
}
