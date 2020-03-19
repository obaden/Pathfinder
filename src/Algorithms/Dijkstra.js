//Implementation of Dijkstras shortest path algorithm.
export default class Dijkstra {
  constructor(grid, startLocation) {
    this.grid = grid;
    this.startRow = startLocation[0];
    this.startCol = startLocation[1];
  }

  // method to call when solving. Will return an object containing
  // a list of nodes in the order they were visited as well as a list
  // of nodes in the order of the path if a path exists
  solve = () => {
    let NodesVisitedInOrder = []; // list of nodes in the order they are visited while solving
    let UnvisitedNodes = []; // list of all nodes that have not yet been visited
    let Finish; // end node if found to get path

    // reset nodes and add them to list of univisited nodes.
    for (let row = 0; row < this.grid.length; row++) {
      for (let column = 0; column < this.grid[0].length; column++) {
        this.grid[row][column].previous = null;
        this.grid[row][column].visited = false;
        this.grid[row][column].distance = Infinity;
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

      // set node to visited and add it to list of visited nodes. Then sort the list by distance again.
      currentNode.visited = true;
      NodesVisitedInOrder.push(currentNode);
      UnvisitedNodes.sort(compareNodes);
    }

    let pathInOrder = [];

    // add nodes of the path by continously looking at previous node from the finish.
    while (Finish.previous) {
      Finish = Finish.previous;
      pathInOrder.unshift(Finish);
    }

    // returns object containing list of visited nodes in order and path nodes in order form start to finish
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

// used for sorting. comparse nodes based on distance
const compareNodes = (x, y) => {
  if (x.distance < y.distance) {
    return -1;
  }
  if (x.distance > y.distance) {
    return 1;
  }
  return 0;
};
