import React from 'react';
import ReactDOM from 'react-dom';
import { createElement } from 'glamor/react';
/* @jsx createElement */
import { withCache } from './withCache';
import { createResource } from 'simple-cache-provider';
import { Route, Link, Router } from './MiniRouter';

// This is a little news app that reads stock market news. It leverages
// React suspense.

// this resource lazy loads the news component
const getNewsComponent = createResource(() =>
  import('./News').then(module => module.default)
);

// this just gets the component or reads it from the cache
const NewsLoader = withCache(props => {
  const News = getNewsComponent(props.cache);
  return <News {...props} />;
});

function App() {
  return (
    <div
      css={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "San Francisco", "SF UI", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <Router>
        <Route path="/" render={() => <NewsLoader ticker={'FB'} />} />
        <Route
          path="/:ticker"
          render={props => <NewsLoader ticker={props.match.params.ticker} />}
        />
      </Router>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.unstable_AsyncMode>
    <App />
  </React.unstable_AsyncMode>
);
