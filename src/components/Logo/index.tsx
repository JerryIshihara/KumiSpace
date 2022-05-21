import React from 'react';
import './style.less';

import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  style?: React.CSSProperties;
  href?: string;
}

const Logo: React.FC<Props> = props => (
  <div className="logo" style={props.style} onClick={() => { if (props.href) {props.history.push(props.href)}}}>
      <span><span style={{color: "#039dfc"}}>Kumi</span>Space</span>
  </div>
);

export default withRouter(Logo);