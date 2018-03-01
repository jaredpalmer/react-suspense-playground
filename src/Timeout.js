import React, { Fragment } from 'react';

export function Timeout({ ms, fallback, children }) {
  return (
    <React.Timeout ms={ms}>
      {didTimeout => (
        <Fragment>
          <span hidden={didTimeout}>{children}</span>
          {didTimeout ? fallback : null}
        </Fragment>
      )}
    </React.Timeout>
  );
}
