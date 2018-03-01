import React from 'react';
import { createElement } from 'glamor/react';
/* @jsx createElement */
import { withCache } from './withCache';
import { createResource } from 'simple-cache-provider';
import { Link } from './MiniRouter';

const readNews = createResource(async function fetchNews(ticker) {
  const res = await fetch(`https://api.iextrading.com/1.0/stock/${ticker}/news`);
  return await res.json();
});

class News extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ticker !== this.props.ticker) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const { cache, ticker = 'aapl' } = this.props;
    const results = readNews(cache, ticker);
    return (
      <React.Fragment>
        <h1>{ticker} news</h1>
        <div>
          {results &&
            results.length > 0 &&
            results.map(r => (
              <div key={r.url} css={{ marginBottom: 16 }}>
                <h4 css={{ margin: 0 }}>{r.headline}</h4>
                <div
                  css={{ marginTop: 4, fontSize: 14, color: '#444' }}
                  dangerouslySetInnerHTML={{ __html: r.summary }}
                />
                <div css={{ marginTop: 8, fontSize: 12 }}>
                  Related:{' '}
                  {r.related
                    .split(',')
                    .filter(z => z.length === 4)
                    .map(co => (
                      <Link
                        style={{
                          fontSize: 12,
                          textDecoration: 'none',
                          color: '#05e',
                          marginRight: 4,
                          cursor: 'pointer',
                        }}
                        key={co}
                        to={`/${co}`}
                      >
                        {co}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default News;
