import React from "react";
import "./Node.css";

export default class Node extends React.Component {
  render() {
    const { onMouseDown, onMouseEnter, onMouseUp, node } = this.props;
    let className = node.isWall
      ? "Wall"
      : node.isStart
      ? "Start"
      : node.isFinish
      ? "Finish"
      : "";

    return (
      <th
        id={`node ${node.row} ${node.col}`}
        onMouseEnter={() => {
          onMouseEnter(node.row, node.col);
        }}
        onMouseDown={() => {
          onMouseDown(node.row, node.col);
        }}
        onMouseUp={onMouseUp}
        className={className}></th>
    );
  }
}
