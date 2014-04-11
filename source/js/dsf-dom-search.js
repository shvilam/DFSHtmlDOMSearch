/**
 * Created by Amit Shvil on 11/04/2014.
 */


$(function () {
    $("#dfsSearchBtn").click(function () {
        var url = "htmlDomTreeTest.html";
        if ($("#urlForSearch").val() != "")
            url = $("#urlForSearch").val();
        $("#testBody").load(url);

    });
    $("#testBody").click(function (event) {
        var startNode = $(event.target);
        startDomDsfTree($(this), startNode);
    });
    function startDomDsfTree(rootTree, startNode) {
        nextBorderDFS(rootTree, startNode);
        var tmpNode = $(startNode)//.parent());
        if (tmpNode.attr("id") == rootTree.attr("id")) {
            return;
        }
        while (tmpNode.attr("id") != rootTree.attr("id")) { // has parent
            tmpNode = $(tmpNode.parent());
            if (tmpNode.next().length > 0) {
                nextBorderDFS(rootTree, $(tmpNode.next()));
            }

        }


    }
    // helper function for defending if node is red and
    // could be any function that rerun boolean value
    function isRedNode(node) {
        return (node.css("background-color") == "red")
    }

    // could be any function do the desire manipulation to the node
    function paintInBlue(node) {
    node.css("background-color", "blue")
    }

    function isPaintedInBlue(node) {
        return (node.css("background-color") == "blue")
    }

    /*
     * base on DFS search will work on any graf not just a tree because the nodes are been marked
     * below is the original dfs for reference
     1 procedure DFS(G,v):
     2      label v as discovered
     3      for all edges from v to w in G.adjacentEdges(v) do
     4          if vertex w is not labeled as discovered then
     5              recursively call DFS(G,w)
     */
    function nextBorderDFS(graf, v) {
        if (isRedNode(v)) {
            paintInBlue(v);
            return v;
        }
        paintInBlue(v);
        // loop throw all chaldean a bit of help from jquery
        v.children().each(function () {
            //console.log("loop throw children " + v.html())
            if (!isPaintedInBlue($(this))) {
                nextBorderDFS(graf, $(this));
            }
        });
        // if has next border
        if (v.next().length > 0) {
            nextBorderDFS(graf, $(v.next()));
        }


    }

});


