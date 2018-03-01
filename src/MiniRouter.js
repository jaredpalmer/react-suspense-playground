import React from 'react';
import { createBrowserHistory } from 'history';
import { matchPath } from './matchPath';
const RouterContext = React.createContext(null);

export const withRouter = Comp => props => (
  <RouterContext.Consumer>
    {routeProps => <Comp {...props} {...routeProps} />}
  </RouterContext.Consumer>
);

export class Router extends React.Component {
  history = createBrowserHistory();

  state = {
    location: this.history.location,
  };

  componentDidMount() {
    this.history.listen(() => {
      this.setState({
        location: this.history.location,
      });
    });
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location,
          history: this.history,
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

class RouteImpl extends React.Component {
  state = {
    match: matchPath(this.props.location.pathname, this.props.path),
  };

  static getDerivedStateFromProps(props) {
    return { match: matchPath(props.location.pathname, props.path) };
  }

  render() {
    const { path, location, history, render, component: Component, exact } = this.props;
    const { match } = this.state;
    const props = { location, history, match };
    if (match && match.isExact) {
      if (render) {
        return render(props);
      } else if (Component) {
        return <Component {...props} />;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export const Route = withRouter(RouteImpl);

class LinkImpl extends React.Component {
  handleClick = e => {
    e.preventDefault();
    this.props.history.push(this.props.to);
  };

  render() {
    return (
      <a {...this.props} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export const Link = withRouter(LinkImpl);
