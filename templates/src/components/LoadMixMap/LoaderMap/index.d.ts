import * as React from 'react';

export interface LoaderMapProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

declare const LoaderMap: React.StatelessComponent<LoaderMapProps>;

export default LoaderMap;
