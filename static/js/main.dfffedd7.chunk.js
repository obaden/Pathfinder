(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],[,,,,,,,,function(t,e,i){t.exports=i(16)},,,,,function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e,i){"use strict";i.r(e);var n=i(0),a=i.n(n),s=i(7),r=i.n(s),o=(i(13),i(1)),l=i(2),c=i(4),d=i(3),u=i(5),h=(i(14),function(t){function e(){return Object(o.a)(this,e),Object(c.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(u.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props,e=t.onMouseDown,i=t.onMouseEnter,n=t.onMouseUp,s=t.node,r=s.isWall?"Wall":s.isStart?"Start":s.isFinish?"Finish":"";return a.a.createElement("th",{id:"node ".concat(s.row," ").concat(s.col),onMouseEnter:function(){i(s.row,s.col)},onMouseDown:function(){e(s.row,s.col)},onMouseUp:n,className:r})}}]),e}(a.a.Component)),g=function t(e,i){var n=this;Object(o.a)(this,t),this.solve=function(){for(var t,e=[],i=[],a=0;a<n.grid.length;a++)for(var s=0;s<n.grid[0].length;s++)n.grid[a][s].previous=null,n.grid[a][s].visited=!1,n.grid[a][s].distance=1/0,i.push(n.grid[a][s]);n.grid[n.startRow][n.startCol].distance=0,i.sort(v);for(var r=function(){var a=i.shift();return a.isFinish||a.distance===1/0?(t=a,"break"):(n.getNeighbours(a).forEach((function(t){if(!t.isWall){var e=a.distance+1;e<t.distance&&(t.distance=e,t.previous=a)}})),a.visited=!0,e.push(a),void i.sort(v))};i.length>0;){if("break"===r())break}for(var o=[];t.previous;)t=t.previous,o.unshift(t);return{VisitedInOrder:e,pathInOrder:o}},this.getNeighbours=function(t){var e=[];return t.row>0&&e.push(n.grid[t.row-1][t.col]),t.row<n.grid.length-1&&e.push(n.grid[t.row+1][t.col]),t.col>0&&e.push(n.grid[t.row][t.col-1]),t.col<n.grid[0].length-1&&e.push(n.grid[t.row][t.col+1]),e},this.grid=e,this.startRow=i[0],this.startCol=i[1]},v=function(t,e){return t.distance<e.distance?-1:t.distance>e.distance?1:0},f=function t(e,i,n){var a=this;Object(o.a)(this,t),this.solve=function(){for(var t=[],e=[],i=[],n=[],s=[],r=0;r<a.grid.length;r++)for(var o=0;o<a.grid[0].length;o++)a.grid[r][o].previous=null,a.grid[r][o].previousEnd=null,a.grid[r][o].visited=!1,a.grid[r][o].distance=1/0,a.grid[r][o].endDistance=1/0,e.push(a.grid[r][o]),i.push(a.grid[r][o]);a.grid[a.startRow][a.startCol].distance=0,a.grid[a.finishRow][a.finishCol].endDistance=0,e.sort(m),i.sort(p);for(var l=function(){var r=e.shift();if(r.isFinish)return n=r,"break";if(r.visited)return n=r,s=r.previousEnd,"break";if(r.distance===1/0)return"break";var o=a.getNeighbours(r);return o.forEach((function(t){if(!t.isWall){var e=r.distance+1;e<t.distance&&(t.distance=e,t.previous=r)}})),r.visited=!0,t.push(r),e.sort(m),(r=i.shift()).isStart?(s=r,"break"):r.visited?(n=r,s=r.previousEnd,"break"):r.endDistance===1/0?(console.log("end3"),"break"):((o=a.getNeighbours(r)).forEach((function(t){if(!t.isWall){var e=r.endDistance+1;e<t.endDistance&&(t.endDistance=e,t.previousEnd=r)}})),r.visited=!0,t.push(r),void i.sort(p))};e.length>0&&i.length>0;){if("break"===l())break}for(var c=[];n;)c.unshift(n),n=n.previous;for(;s;)c.push(s),s=s.previousEnd;return{VisitedInOrder:t,pathInOrder:c}},this.getNeighbours=function(t){var e=[];return t.row>0&&e.push(a.grid[t.row-1][t.col]),t.row<a.grid.length-1&&e.push(a.grid[t.row+1][t.col]),t.col>0&&e.push(a.grid[t.row][t.col-1]),t.col<a.grid[0].length-1&&e.push(a.grid[t.row][t.col+1]),e},this.grid=e,this.startRow=i[0],this.startCol=i[1],this.finishRow=n[0],this.finishCol=n[1]},m=function(t,e){return t.distance<e.distance?-1:t.distance>e.distance?1:0},p=function(t,e){return t.endDistance<e.endDistance?-1:t.endDistance>e.endDistance?1:0},b=function t(e,i,n){var a=this;Object(o.a)(this,t),this.solve=function(){for(var t=[],e=[],i=[],n=0;n<a.grid.length;n++)for(var s=0;s<a.grid[0].length;s++)a.grid[n][s].previous=null,a.grid[n][s].visited=!1,a.grid[n][s].distance=1/0,a.grid[n][s].h=Math.abs(a.finishRow-n)+Math.abs(a.finishCol-s),e.push(a.grid[n][s]);a.grid[a.startRow][a.startCol].distance=0,e.sort(w);for(var r=function(){var n=e.shift();return n.isFinish||n.distance===1/0?(i=n,"break"):(a.getNeighbours(n).forEach((function(t){if(!t.isWall){var e=n.distance+1;e<t.distance&&(t.distance=e,t.previous=n)}})),n.visited=!0,t.push(n),void e.sort(w))};e.length>0;){if("break"===r())break}console.log(t);for(var o=[];i.previous;)i=i.previous,o.unshift(i);return{VisitedInOrder:t,pathInOrder:o}},this.getNeighbours=function(t){var e=[];return t.row>0&&e.push(a.grid[t.row-1][t.col]),t.row<a.grid.length-1&&e.push(a.grid[t.row+1][t.col]),t.col>0&&e.push(a.grid[t.row][t.col-1]),t.col<a.grid[0].length-1&&e.push(a.grid[t.row][t.col+1]),e},this.grid=e,this.startRow=i[0],this.startCol=i[1],this.finishRow=n[0],this.finishCol=n[1]},w=function(t,e){return t.distance+t.h<e.distance+e.h?-1:t.distance+t.h>e.distance+e.h?1:t.h-e.h},E=(i(15),[12,7]),S=[12,43],k=0,W=1,y=2,O=function(t){function e(t){var i;return Object(o.a)(this,e),(i=Object(c.a)(this,Object(d.a)(e).call(this,t))).handleMouseDown=function(t,e){i.state.solving||(i.state.grid[t][e].isFinish?i.setState({movingFinish:!0}):i.state.grid[t][e].isStart?i.setState({movingStart:!0}):(i.state.grid[t][e].isWall?i.setState({removingWall:!0}):i.setState({placingWall:!0}),i.toggleWall(t,e)))},i.handleMouseUp=function(){i.setState({movingFinish:!1,movingStart:!1,placingWall:!1,removingWall:!1})},i.handleMouseEnter=function(t,e){if(!i.state.solving)if(i.state.placingWall&&!i.state.grid[t][e].isWall)i.toggleWall(t,e);else if(i.state.removingWall&&i.state.grid[t][e].isWall)i.toggleWall(t,e);else if(i.state.movingFinish&&!i.state.grid[t][e].isWall){var n=i.state.grid.slice();n[t][e].isFinish=!0,n[i.state.finish[0]][i.state.finish[1]].isFinish=!1,i.setState({grid:n,finish:[t,e]},(function(){i.state.solved&&i.startSolving(0)}))}else if(i.state.movingStart&&!i.state.grid[t][e].isWall){var a=i.state.grid.slice();a[t][e].isStart=!0,a[i.state.start[0]][i.state.start[1]].isStart=!1,i.setState({grid:a,start:[t,e]},(function(){i.state.solved&&i.startSolving(0)}))}},i.toggleWall=function(t,e){var n=i.state.grid[t][e];if(!n.isStart&&!n.isFinish){var a=i.state.grid.slice();a[t][e].isWall=!a[t][e].isWall,i.setState({grid:a})}},i.startSolving=function(t){var e;switch(0!==t&&i.setState({solving:!0}),i.clearPath(),i.state.solveMethod){case y:e=new b(i.state.grid,i.state.start,i.state.finish);break;case k:e=new g(i.state.grid,i.state.start);break;case W:e=new f(i.state.grid,i.state.start,i.state.finish)}var n=e.solve(),a=n.VisitedInOrder;0===t?(a.forEach((function(t){document.getElementById("node ".concat(t.row," ").concat(t.col)).classList.add("Visited")})),n.pathInOrder.forEach((function(t){document.getElementById("node ".concat(t.row," ").concat(t.col)).classList.add("Path")})),i.setState({solved:!0})):(i.animateNodes(n.VisitedInOrder,t,"Visited","currentVisit"),setTimeout((function(){i.animateNodes(n.pathInOrder,40,"Path"),i.setState({solved:!0,solving:!1})}),t*a.length))},i.clearPath=function(){i.state.grid.forEach((function(t){t.forEach((function(t){var e=document.getElementById("node ".concat(t.row," ").concat(t.col));e.classList.remove("Visited"),e.classList.remove("Path")}))}))},i.CreateEmptyBoard=function(t,e){for(var i=[],n=0;n<t;n++){for(var a=[],s=0;s<e;s++)a.push(M(n,s));i.push(a)}return i[E[0]][E[1]].isStart=!0,i[S[0]][S[1]].isFinish=!0,i},i.resetBoard=function(){i.setState({grid:i.CreateEmptyBoard(25,50),solved:!1,solving:!1,start:E.slice(),finish:S.slice()}),i.clearPath()},i.state={placingWall:!1,removingWall:!1,movingStart:!1,movingFinish:!1,solveSpeed:20,solveMethod:k,solved:!1,solving:!1,start:E.slice(),finish:S.slice(),grid:i.CreateEmptyBoard(25,50)},i}return Object(u.a)(e,t),Object(l.a)(e,[{key:"animateNodes",value:function(t,e,i,n){for(var a=function(a){setTimeout((function(){var e=document.getElementById("node ".concat(t[a].row," ").concat(t[a].col));e.classList.add(n),setTimeout((function(){e.classList.remove(n),e.classList.add(i)}),400)}),e*a)},s=0;s<t.length;s++)a(s)}},{key:"render",value:function(){var t=this,e=this.state,i=e.grid,n=e.solveSpeed;return a.a.createElement("div",{className:"Visualizer"},a.a.createElement("div",{className:"Menu"},a.a.createElement("label",{htmlFor:"algorithm"},"Select Algorithm"),a.a.createElement("select",{id:"algorithm",disabled:this.state.solving,onChange:function(e){t.setState({solveMethod:Number(e.target.value)})}},a.a.createElement("option",{default:!0,value:k},"Dijkstra"),a.a.createElement("option",{value:W},"Bidirectional Dijkstra"),a.a.createElement("option",{value:y},"A*")),a.a.createElement("label",{htmlFor:"speed"},"Solve speed"),a.a.createElement("select",{id:"speed",disabled:this.state.solving,onChange:function(e){t.setState({solveSpeed:Number(e.target.value)})}},a.a.createElement("option",{value:50},"Slow"),a.a.createElement("option",{value:10},"Medium"),a.a.createElement("option",{value:3},"Fast"),a.a.createElement("option",{value:0},"Instant")),a.a.createElement("button",{className:"control solve",disabled:this.state.solving,onClick:function(){t.startSolving(n)}},"Start Solving"),a.a.createElement("button",{className:"control reset",disabled:this.state.solving,onClick:this.resetBoard},"Reset Board")),a.a.createElement("table",null,a.a.createElement("tbody",null,i.map((function(e,i){return a.a.createElement("tr",{className:"Row",key:i},e.map((function(e,i){return a.a.createElement(h,{onMouseEnter:t.handleMouseEnter,onMouseDown:t.handleMouseDown,onMouseUp:t.handleMouseUp,key:i,node:e})})))})))),a.a.createElement("div",{className:"Instructions"},a.a.createElement("h1",null,"Controls"),a.a.createElement("p",null,"The green and red nodes are the start and end nodes respectively.",a.a.createElement("br",null),"These can be moved around freely by pressing on one with the mouse button, holding it down and dragging the node to another position."),a.a.createElement("img",{src:"./images/moveStart.gif",alt:"animation of moving start around"}),a.a.createElement("p",null,"We can also create walls by clicking and dragging from any node that isn't the start or finish node.",a.a.createElement("br",null),"Walls can be removed in the same way, by clicking and dragging from a wall node instead"),a.a.createElement("img",{src:"./images/walls.gif",alt:"placing and removing walls"}),a.a.createElement("p",null,"After you are happy with how the grid is set up, select an algorithm and a solve speed from the dropdown menus at the top and then hit"," ",a.a.createElement("b",null,"Start Solving")),a.a.createElement("p",null,"After solving, moving the start and end nodes will cause the new path to be recalculated in real time"),a.a.createElement("img",{src:"./images/movePath.gif",alt:"recalculating path"}),a.a.createElement("p",null)))}}]),e}(a.a.Component),M=function(t,e){return{row:t,col:e,isWall:!1,isStart:!1,isFinish:!1,visited:!1,previous:null,distance:null,previousEnd:null,endDistance:null,h:null}};r.a.render(a.a.createElement(O,null),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.dfffedd7.chunk.js.map