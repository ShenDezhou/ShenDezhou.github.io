var CollapsibleTree = function(elt) {

  var m = [100, 100, 100, -100],
      w = 1700 ,
      h = 1700 ,
      i = 0,
      root,
      root2;

  var tree = d3.layout.tree()
         .size([h, w]);
//    .size([w-1500, h-1500]);

  // var diagonal = d3.svg.diagonal()
  //     .projection(function(d) { return [d.y, d.x]; });

  var parentdiagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, -d.y]; });

  var childdiagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });

  var vis = d3.select(elt).append("svg:svg")
      .attr("width", w )
      .attr("height", h)
//    .attr("transform","rotate(-90deg)")
      .append("svg:g")
//    .attr("transform","rotate(-45)")
      // .attr("transform", "translate(" + m[3] + "," + m[0] + ")"); // left-right
      // .attr("transform", "translate(" + m[0] + "," + m[3] + ")"); // top-bottom
      .attr("transform", "translate("+ w * 0 + "," + h*0.3 +")"); // bidirectional-tree


  var that = {
    init: function(url) {
      var that = this;
      d3.json(url, function(json) {
        root = json;
				var nodesAll = tree.nodes(root);
        // root.x0 = h / 2;
        // root.y0 = 0;
        root.x0 = w / 2;
        root.y0 = h / 2;

        // Initialize the display to show a few nodes.
//      root.children.forEach(that.toggleAll);
        // that.toggle(root.children[1]);
        // that.toggle(root.children[1].children[2]);
        // that.toggle(root.children[9]);
        // that.toggle(root.children[9].children[0]);

        // that.updateParents(root);
        // that.updateChildren(root);
        var node = tree.nodes(root);
				that.updateBoth(root);
      });
    },
    updateBoth: function(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 120; });

      // Update the nodes…
      var node = vis.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
          .on("click", function(d) { 
          	that.toggle(d); 
//        	that.updateBoth(d);
          });

//    nodeEnter.append("svg:circle")
//        .attr("r", 1e-6)
//        .style("fill", function(d) { return d._children ? "blue" : "#fff"; });

      nodeEnter.append("svg:text")
          // .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("class","randomColor")
          .attr("x", function(d) {
            if( that.isParent(d) ) {
              return -10;
            } else {
              return d.children || d._children ? -10 : 10;
            }
          })
          .attr("dy", ".35em")
          // .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .attr("text-anchor", function(d) {
//          if( that.isParent(d) ) {
              return "middle";
//          } else {
//            return d.children || d._children ? "end" : "start";
//          }
          })
//        .attr("transform",function(d) {
////          if( d != root ) {
////            if( that.isParent(d) ) {
////              return "rotate(90)";
////            } else {
//              return "rotate(90)";
////            }            
////          }
//        })
//					.attr("transform","rotate(90)")
          .text(function(d) { return d.name; })
          .style({
          	"fill-opacity":1e-6,
          	"font-size":"20px",
          	"font-weight":900,
          	"font-family":"SimHei"
          });
			
			var arrCount = [];
			$(".randomColor").each(function(i,v){
//				console.log(node)
				arrCount.push(node[0][i].__data__.count);
				var r=Math.floor(Math.random()*255);
				var g=Math.floor(Math.random()*255);
				var b=Math.floor(Math.random()*255);
				$(".randomColor").eq(i)[0].style.fill="rgb("+r+","+g+","+b+")";				
			})
			
			var minCount = d3.min(arrCount);
			$.each(arrCount,function(i,v){
				if(v == minCount){
					$(".randomColor").eq(i)[0].style.fontSize="12px";
				}else if(v == undefined){
					console.log(v)
				}else{
					var value = v - minCount;
					$(".randomColor").eq(i)[0].style.fontSize=12+value*2+"px";
				}
			})

			
			
      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) {
            if( that.isParent(d) ) {
              return "translate(" + d.x + "," + -d.y + ")";
            } else {
              return "translate(" + d.x + "," + d.y + ")";
            }
          });

//    nodeUpdate.select("circle")
//        .attr("r", 4.5)
//        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
          .remove();

//    nodeExit.select("circle")
//        .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = vis.selectAll("path.link")
          .data(tree.links_parents(nodes).concat(tree.links(nodes)), function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            if( that.isParent(d.target) ) {
              return parentdiagonal({source: o, target: o});
            } else {
              // return parentdiagonal({source: o, target: o});
              return childdiagonal({source: o, target: o});
            }
          })
        .transition()
          .duration(duration)
          // .attr("d", parentdiagonal);
          .attr("d", function(d) {
            if( that.isParent(d.target) ) {
              return parentdiagonal(d);
            } else {
              // return parentdiagonal(d);
              return childdiagonal(d);
            }
          })

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          // .attr("d", parentdiagonal);
          .attr("d", function(d) {
            if( that.isParent(d.target) ) {
              return parentdiagonal(d);
            } else {
              return childdiagonal(d);
            }
          })

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            // return parentdiagonal({source: o, target: o});
            if( that.isParent(d.target) ) {
              return parentdiagonal({source: o, target: o});
            } else {
              return childdiagonal({source: o, target: o});
            }
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },
    updateParents: function(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();
      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = vis.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
          .attr("class", "node")
          // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
          .on("click", function(d) { 
          	that.toggle(d); 
//        	that.updateParents(d); 
          });

//    nodeEnter.append("svg:circle")
//        .attr("r", 1e-6)
//        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("svg:text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.x + "," + -d.y + ")"; });

//    nodeUpdate.select("circle")
//        .attr("r", 4.5)
//        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
          .remove();

//    nodeExit.select("circle")
//        .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = vis.selectAll("path.link")
          .data(tree.links(nodes), function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return parentdiagonal({source: o, target: o});
          })
        .transition()
          .duration(duration)
          .attr("d", parentdiagonal);

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", parentdiagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return parentdiagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },    
    updateChildren: function(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      var nodes = tree.nodes(root2).reverse();

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = vis.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
          .attr("class", "node")
          // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
          .on("click", function(d) { 
          	that.toggle(d);
//        	that.updateChildren(d);
          });

//    nodeEnter.append("svg:circle")
//        .attr("r", 1e-6)
//        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("svg:text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

//    nodeUpdate.select("circle")
//        .attr("r", 4.5)
//        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
          .remove();

//    nodeExit.select("circle")
//        .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = vis.selectAll("path.link")
          .data(tree.links(nodes), function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "link")
          .attr("d", function(d) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            var o = {x: source.x0, y: source.y0};
            return childdiagonal({source: o, target: o});
          })
        .transition()
          .duration(duration)
          .attr("d", childdiagonal);

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", childdiagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return childdiagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },

    isParent: function(node) {
      if( node.parent && node.parent != root ) {
        return this.isParent(node.parent);
      } else
      // if ( node.name == 'data' || node.name == 'scale' || node.name == 'util' ) {
      if( node.parents ) {
        return true;
      } else {
        return false;
      }
    },

    // Toggle children.
    toggle: function(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      if (d.parents) {
        d._parents = d.parents;
        d.parents = null;
      } else {
        d.parents = d._parents;
        d._parents = null;
      }
    },
    toggleAll: function(d) {
      if (d.children) {
        d.children.forEach(that.toggleAll);
        that.toggle(d);
      }
      if (d.parents) {
        d.parents.forEach(that.toggleAll);
        that.toggle(d);
      }
    }

  }

  return that;
}
