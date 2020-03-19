// Implementation of A* search using Manhattan Heuristic
export default class Astar {
  constructor(grid, startLocation, finishLocation) {
    this.grid = grid;
    this.startRow = startLocation[0];
    this.startCol = startLocation[1];
    this.finishRow = finishLocation[0];
    this.finishCol = finishLocation[1];
  }

  // method to call when solving. Will return an object containing
  // a list of nodes in the order they were visited as well as a list
  // of nodes in the order of the path if a path exists
  solve = () => {
    let NodesVisitedInOrder = []; // list of nodes in the order they are visited while solving
    let UnvisitedNodes = []; // list of all nodes that have not yet been visited
    let Finish = []; // end node if found to get path

    // reset nodes and calculate the H value for each node based on Manhattan heuristic
    for (let row = 0; row < this.grid.length; row++) {
      for (let column = 0; column < this.grid[0].length; column++) {
        this.grid[row][column].previous = null;
        this.grid[row][column].visited = false;
        this.grid[row][column].distance = Infinity;
        this.grid[row][column].h =
          Math.abs(this.finishRow - row) + Math.abs(this.finishCol - column);
        UnvisitedNodes.push(this.grid[row][column]);
      }
    }

    // set distance of start node to 0 and then sort nodes by distance
    this.grid[this.startRow][this.startCol].distance = 0;
    UnvisitedNodes.sort(compareNodes);

    while (UnvisitedNodes.length > 0) {
      // continuously remove closest node from the list
      let currentNode = UnvisitedNodes.shift();

      // if we are at the end, set Finish to the node and stop search
      if (currentNode.isFinish) {
        Finish = currentNode;
        break;
      }

      // if the closest next node has distance infinity without finding a path, we must
      // be unable to reach it so terminate
      if (currentNode.distance === Infinity) {
        Finish = currentNode;
        break;
      }

      // for each of the neighbours of a node update the distance if the distance through the current node
      // is shorter. if that's the case set that nodes previous node to be this node.
      let neighbours = this.getNeighbours(currentNode);
      neighbours.forEach(neighbour => {
        if (!neighbour.isWall) {
          let altDistance = currentNode.distance + 1;
          if (altDistance < neighbour.distance) {
            neighbour.distance = altDistance;
            neighbour.previous = currentNode;
          }
        }
      });

      // set node to visited and add it to list of visited nodes. Then sort based on distance from start
      // plus h which is the estimated distance to the finish.
      currentNode.visited = true;
      NodesVisitedInOrder.push(currentNode);
      UnvisitedNodes.sort(compareNodes);
    }
    console.log(NodesVisitedInOrder);

    let pathInOrder = [];

    while (Finish.previous) {
      Finish = Finish.previous;
      pathInOrder.unshift(Finish);
    }

    return {
      VisitedInOrder: NodesVisitedInOrder,
      pathInOrder: pathInOrder
    };
  };

  // given a node, return all the nodes around it. Checks if location is within grid.
  getNeighbours = node => {
    let nodes = [];

    if (node.row > 0) nodes.push(this.grid[node.row - 1][node.col]);
    if (node.row < this.grid.length - 1) {
      nodes.push(this.grid[node.row + 1][node.col]);
    }
    if (node.col > 0) nodes.push(this.grid[node.row][node.col - 1]);
    if (node.col < this.grid[0].length - 1)
      nodes.push(this.grid[node.row][node.col + 1]);

    return nodes;
  };
}

// compare function used for sorting. compares based on h value plus distance of a node.
// if they are the same it will prefer nodes with a lower h which are presumably closer to the finish.
const compareNodes = (x, y) => {
  if (x.distance + x.h < y.distance + y.h) {
    return -1;
  }
  if (x.distance + x.h > y.distance + y.h) {
    return 1;
  }
  return x.h - y.h;
};
