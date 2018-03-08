import React from 'react';
import ReactDOM from 'react-dom';

export default class Component extends React.Component {
    deferSetState(state, sideEffects) {
        ReactDOM.unstable_deferredUpdates(() => this.setState(state, sideEffects));
    }
}