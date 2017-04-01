/*
 * KeyboardShortcutHUD
 */
import React, { Component } from 'react';
import Combokeys from 'combokeys'

class KeyboardShortcutHUD extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.bind('?', () => { this.setState({ show: !this.state.show }); });
  }

  componentWillUnmount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.unbind('?');
  }

  render() {
    let className = this.state.show ? 'keyboard-hud' : 'keyboard-hud hidden';
    return (
      <div className={ className }>
        <ul>
          <li><span className="key">?</span> Toggle HUD</li>
          <li><span className="key">&larr;</span> Previous Passage</li>
          <li><span className="key">&rarr;</span> Next Passage</li>
          <li><span className="key">1</span> Read state (LIVE)</li>
          <li><span className="key">2</span> Recall Words state (L_V_)</li>
          <li><span className="key">3</span> Recall First state (L___)</li>
          <li><span className="key">4</span> Recall None state (___)</li>
          <li><span className="key">p</span> Toggle Audio</li>
          <li><span className="key">v</span> Verse Mode</li>
          <li><span className="key">s</span> Segment Mode</li>
          <li><span className="key">c</span> Chapter Mode</li>
        </ul>
      </div>
    );
  }
}

export default KeyboardShortcutHUD
