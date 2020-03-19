import React from "react";
import Node from "./Node";
import Dijkstra from "./Algorithms/Dijkstra";
import BiDijkstra from "./Algorithms/BiDijkstra";
import Astar from "./Algorithms/Astar";
import "./App.css";

// Default start and Finish locations for initiating and resetting board.
const DEFAULT_START = [12, 7];
const DEFAULT_FINISH = [12, 43];

// an enum for algorithms
const ALGORITHMS = { DIJKSTRA: 0, BIDIJKSTRA: 1, ASTAR: 2 };

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // initializes the state with default start and finish.
    this.state = {
      placingWall: false,
      removingWall: false,
      movingStart: false,
      movingFinish: false,
      solveSpeed: 20,
      solveMethod: ALGORITHMS.DIJKSTRA,
      solved: false,
      solving: false,
      start: DEFAULT_START.slice(),
      finish: DEFAULT_FINISH.slice(),
      grid: this.CreateEmptyBoard(25, 50)
    };
  }

  // Handles mouse Click event for a node. Will update state to show what is being moved or
  // if a wall is being placed or removed.
  handleMouseDown = (row, col) => {
    //only lets you edit grid when it's not currently being solved.
    if (!this.state.solving) {
      // Depending on contents of node decide what to do
      if (this.state.grid[row][col].isFinish) {
        this.setState({ movingFinish: true });
      } else if (this.state.grid[row][col].isStart) {
        this.setState({ movingStart: true });
      } else {
        if (this.state.grid[row][col].isWall) {
          this.setState({ removingWall: true });
        } else {
          this.setState({ placingWall: true });
        }
        this.toggleWall(row, col);
      }
      // this.setState({ placingWall: true });
    }
  };

  // disables editing on node entry when mouse released.
  handleMouseUp = () => {
    this.setState({
      movingFinish: false,
      movingStart: false,
      placingWall: false,
      removingWall: false
    });
  };

  // updates node based on any action being performed based on where user first clicked.
  handleMouseEnter = (row, col) => {
    if (!this.state.solving) {
      if (this.state.placingWall && !this.state.grid[row][col].isWall) {
        this.toggleWall(row, col);
      } else if (this.state.removingWall && this.state.grid[row][col].isWall) {
        this.toggleWall(row, col);
      } else if (this.state.movingFinish && !this.state.grid[row][col].isWall) {
        const newGrid = this.state.grid.slice();
        newGrid[row][col].isFinish = true;
        newGrid[this.state.finish[0]][this.state.finish[1]].isFinish = false;

        // after board is solved, automatically recalculate path when finish is moved
        this.setState({ grid: newGrid, finish: [row, col] }, () => {
          if (this.state.solved) {
            this.startSolving(0);
          }
        });
      } else if (this.state.movingStart && !this.state.grid[row][col].isWall) {
        const newGrid = this.state.grid.slice();
        newGrid[row][col].isStart = true;
        newGrid[this.state.start[0]][this.state.start[1]].isStart = false;

        // after board is solved, automatically recalculate path when start is moved
        this.setState({ grid: newGrid, start: [row, col] }, () => {
          if (this.state.solved) {
            this.startSolving(0);
          }
        });
      }
    }
  };

  // toggles wall at given location on grid
  toggleWall = (row, col) => {
    let node = this.state.grid[row][col];

    if (!node.isStart && !node.isFinish) {
      const newGrid = this.state.grid.slice();
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
      this.setState({ grid: newGrid });
    }
  };

  // Solve Board based on method in state.
  startSolving = solveSpeed => {
    // remove previous visited nodes

    // if solve speed is not zero, set solving to true which disables input.
    if (solveSpeed !== 0) {
      this.setState({ solving: true });
    }

    // clear any previous path that was calculated.
    this.clearPath();

    // set solver based on solveMethod in state.
    var solver;
    let method = this.state.solveMethod;
    switch (method) {
      case ALGORITHMS.ASTAR:
        solver = new Astar(
          this.state.grid,
          this.state.start,
          this.state.finish
        );
        break;
      case ALGORITHMS.DIJKSTRA:
        solver = new Dijkstra(this.state.grid, this.state.start);
        break;
      case ALGORITHMS.BIDIJKSTRA:
        solver = new BiDijkstra(
          this.state.grid,
          this.state.start,
          this.state.finish
        );
        break;
      default:
        break;
    }

    // solve board using solver object
    let solved = solver.solve();

    let Visited = solved.VisitedInOrder;

    // if solve speed is 0, solve without delay by just setting all nodes to the correct class
    if (solveSpeed === 0) {
      Visited.forEach(node => {
        document
          .getElementById(`node ${node.row} ${node.col}`)
          .classList.add("Visited");
      });
      solved.pathInOrder.forEach(node => {
        document
          .getElementById(`node ${node.row} ${node.col}`)
          .classList.add("Path");
      });
      this.setState({ solved: true });
    } else {
      // if solve speed not 0 animate the nodes one by one.
      this.animateNodes(
        solved.VisitedInOrder,
        solveSpeed,
        "Visited",
        "currentVisit"
      );

      // after animating visited nodes, animate path
      setTimeout(() => {
        this.animateNodes(solved.pathInOrder, 40, "Path");
        this.setState({ solved: true, solving: false });
      }, solveSpeed * Visited.length);
    }
  };

  // Goes over every node and removes classes that represent solving process.
  clearPath = () => {
    this.state.grid.forEach(row => {
      row.forEach(node => {
        let div = document.getElementById(`node ${node.row} ${node.col}`);
        div.classList.remove("Visited");
        div.classList.remove("Path");
      });
    });
  };

  // sets a given class to nodes in the list in order at a rate given.
  // headClass is assigned to nodes for 400 ms before the nodeClass is assigned.
  animateNodes(nodes, speed, nodeClass, headClass) {
    for (let i = 0; i < nodes.length; i++) {
      setTimeout(() => {
        let div = document.getElementById(
          `node ${nodes[i].row} ${nodes[i].col}`
        );
        div.classList.add(headClass);
        setTimeout(() => {
          div.classList.remove(headClass);
          div.classList.add(nodeClass);
        }, 400);
      }, speed * i);
    }
  }

  // creates new grid initializing all nodes to be empty then sets start and finish nodes.
  CreateEmptyBoard = (rows, cols) => {
    let board = [];

    for (let row = 0; row < rows; row++) {
      let activeRow = [];
      for (let col = 0; col < cols; col++) {
        activeRow.push(createNode(row, col));
      }
      board.push(activeRow);
    }
    board[DEFAULT_START[0]][DEFAULT_START[1]].isStart = true;
    board[DEFAULT_FINISH[0]][DEFAULT_FINISH[1]].isFinish = true;
    return board;
  };

  // resets the board and state to initial state.
  resetBoard = () => {
    this.setState({
      grid: this.CreateEmptyBoard(25, 50),
      solved: false,
      solving: false,
      start: DEFAULT_START.slice(),
      finish: DEFAULT_FINISH.slice()
    });
    this.clearPath();
  };

  render() {
    const { grid, solveSpeed: speed } = this.state;
    return (
      <div className="Visualizer">
        <div className="Menu">
          <label htmlFor="algorithm">Select Algorithm</label>
          <select
            id="algorithm"
            disabled={this.state.solving}
            onChange={e => {
              this.setState({ solveMethod: Number(e.target.value) });
            }}>
            <option default value={ALGORITHMS.DIJKSTRA}>
              Dijkstra
            </option>
            <option value={ALGORITHMS.BIDIJKSTRA}>
              Bidirectional Dijkstra
            </option>
            <option value={ALGORITHMS.ASTAR}>A*</option>
          </select>
          <label htmlFor="speed">Solve speed</label>
          <select
            id="speed"
            disabled={this.state.solving}
            onChange={e => {
              this.setState({ solveSpeed: Number(e.target.value) });
            }}>
            <option value={50}>Slow</option>
            <option value={10}>Medium</option>
            <option value={3}>Fast</option>
            <option value={0}>Instant</option>
          </select>

          <button
            className="control solve"
            disabled={this.state.solving}
            onClick={() => {
              this.startSolving(speed);
            }}>
            Start Solving
          </button>
          <button
            className="control reset"
            disabled={this.state.solving}
            onClick={this.resetBoard}>
            Reset Board
          </button>
        </div>
        <table>
          <tbody>
            {grid.map((row, rowIndex) => {
              return (
                <tr className="Row" key={rowIndex}>
                  {row.map((node, nodeIndex) => {
                    return (
                      <Node
                        onMouseEnter={this.handleMouseEnter}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        key={nodeIndex}
                        node={node}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// Creates a node with given row and column values but otherwise default values.
const createNode = (row, col) => {
  return {
    row,
    col,
    isWall: false,
    isStart: false,
    isFinish: false,
    visited: false,
    previous: null,
    distance: null,
    previousEnd: null,
    endDistance: null,
    h: null
  };
};
