import React from 'react';
import { SimpleCache } from 'simple-cache-provider';

export function withCache(Component) {
  return props => (
    <SimpleCache.Consumer>
      {cache => <Component cache={cache} {...props} />}
    </SimpleCache.Consumer>
  );
}
