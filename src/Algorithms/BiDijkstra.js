// Search method which uses Dijkstra from both beginning and endpoints.
// When searches meet each other we find the shortest path
export default class BiDijkstra {
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
    let BeginningNodes = []; // List of all nodes that have not been visited from start
    let EndNodes = []; // list of nodes that have not been visited from end
    let FirstHalf = []; // nodes from start to where it meets search from end
    let SecondHalf = []; //nodes from end to where it meets search from start

    // initialize all nodes and add them to both start and end list.
    for (let row = 0; row < this.grid.length; row++) {
      for (let column = 0; column < this.grid[0].length; column++) {
        this.grid[row][column].previous = null;
        this.grid[row][column].previousEnd = null;
        this.grid[row][column].visited = false;
        this.grid[row][column].distance = Infinity;
        this.grid[row][column].endDistance = Infinity;
        BeginningNodes.push(this.grid[row][column]);
        EndNodes.push(this.grid[row][column]);
      }
    }

    // set distances for start and end to 0 and sort based on distance
    this.grid[this.startRow][this.startCol].distance = 0;
    this.grid[this.finishRow][this.finishCol].endDistance = 0;
    BeginningNodes.sort(compareNodes);
    EndNodes.sort(compareNodesEnd);

    // continuously look take closest node from beginning then from end while there are nodes left in both.
    while (BeginningNodes.length > 0 && EndNodes.length > 0) {
      // gets closest node from beginning and removes it from the list.
      let currentNode = BeginningNodes.shift();

      // if we are at the end, return the node and stop search.
      if (currentNode.isFinish) {
        FirstHalf = currentNode;
        break;
      }

      // if a node is visited it must have been visited by search from other side since
      // we remove nodes from list right after visiting them.
      if (currentNode.visited) {
        FirstHalf = currentNode;
        SecondHalf = currentNode.previousEnd;
        break;
      }

      // if the closest next node has distance infinity without finding a path, we must
      // be unable to reach it so terminate.
      if (currentNode.distance === Infinity) {
        break;
      }

      // for each of the neighbours of a node update the distance if the distance through current node
      // is smaller and if that's the case update the previous node to be this node.
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

      // set node to visited and add it to list of visited nodes. Then sort the list again.
      currentNode.visited = true;
      NodesVisitedInOrder.push(currentNode);
      BeginningNodes.sort(compareNodes);

      // Same process as before but this time we start from the finish.
      currentNode = EndNodes.shift();
      if (currentNode.isStart) {
        SecondHalf = currentNode;
        break;
      }

      if (currentNode.visited) {
        FirstHalf = currentNode;
        SecondHalf = currentNode.previousEnd;
        break;
      }

      if (currentNode.endDistance === Infinity) {
        console.log("end3");
        break;
      }
      neighbours = this.getNeighbours(currentNode);

      neighbours.forEach(neighbour => {
        if (!neighbour.isWall) {
          let altDistance = currentNode.endDistance + 1;
          if (altDistance < neighbour.endDistance) {
            neighbour.endDistance = altDistance;
            neighbour.previousEnd = currentNode;
          }
        }
      });

      currentNode.visited = true;
      NodesVisitedInOrder.push(currentNode);
      EndNodes.sort(compareNodesEnd);
    }

    let pathInOrder = [];

    // add nodes from first half to the path.
    while (FirstHalf) {
      pathInOrder.unshift(FirstHalf);
      FirstHalf = FirstHalf.previous;
    }

    // add nodes from second hald to the path.
    while (SecondHalf) {
      pathInOrder.push(SecondHalf);
      SecondHalf = SecondHalf.previousEnd;
    }

    // returns object containing list of visited nodes in order and path nodes in order form start to finish.
    return {
      VisitedInOrder: NodesVisitedInOrder,
      pathInOrder: pathInOrder
    };
  };

  // given a node, return all the nodes around it. Checks if location is within grid.
  getNeighbours = node => {
    let nodes = [];

    // checks node above
    if (node.row > 0) nodes.push(this.grid[node.row - 1][node.col]);

    //checks node below
    if (node.row < this.grid.length - 1) {
      nodes.push(this.grid[node.row + 1][node.col]);
    }
    //checks node to left
    if (node.col > 0) nodes.push(this.grid[node.row][node.col - 1]);

    //checks node to right
    if (node.col < this.grid[0].length - 1)
      nodes.push(this.grid[node.row][node.col + 1]);

    return nodes;
  };
}

// used for sorting. Compares nodes based on distance.
const compareNodes = (x, y) => {
  if (x.distance < y.distance) {
    return -1;
  }
  if (x.distance > y.distance) {
    return 1;
  }
  return 0;
};

// Used to sort based on distance from the end rather than the beginning.
const compareNodesEnd = (x, y) => {
  if (x.endDistance < y.endDistance) {
    return -1;
  }
  if (x.endDistance > y.endDistance) {
    return 1;
  }
  return 0;
};
