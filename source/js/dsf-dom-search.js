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
    var globalIndex = 0;
    $("#next").click(function (event) {
        hightLightNode(nodesList[globalIndex]);
        if (globalIndex >= nodesList.length) {
            $("#next").hide();
        }
        globalIndex++;

    });
    function hightLightNode(node) {
        //node.fadeOut();
        node.animate({borderWidth: 10}, 100, null, function () {
            node.animate({borderWidth: 4});
        });
    }

    function startDomDsfTree(rootTree, startNode) {
        globalIndex = 0;
        nodesList = [];
        var redNode = nextBrotherDFS(rootTree, startNode);
        if (redNode != null)
            return redNode
        var tmpNode = $(startNode)//.parent());
        if (tmpNode.attr("id") == rootTree.attr("id")) {
            return;
        }
        while (tmpNode.attr("id") != rootTree.attr("id")) { // has parent
            tmpNode = $(tmpNode.parent());
            console.log("asdfasdf");
            if (tmpNode.next().length > 0) {
                var redNode = nextBrotherDFS(rootTree, $(tmpNode.next()));
                if (redNode != null)
                    return redNode
            }
        }
        console.log("nodesList.length",nodesList.length);
    }

    /*
     * base on DFS search will work on any graf not just a tree because the nodes are been marked
     * below is the original dfs for reference
     1 procedure DFS(G,v):
     2      label v as discovered
     3      for all edges from v to w in G.adjacentEdges(v) do
     4          if vertex w is not labeled as discovered then
     5              recursively call DFS(G,w)
     * @graf this is the full dom it has not been use in that implication
     * @v the node for iteration
     */
    function nextBrotherDFS(graf, v) {
        if (isRedNode(v)) {
            //paintInBlue(v);
            return v;
        }
        paintInBlue(v);
        //loop throw all chaldean a bit of help from jquery
        v.children().each(function () {
            //console.log("loop throw children " + v.html())
            //if (!isPaintedInBlue($(this))) {
                nextBrotherDFS(graf, $(this));
            //}
        });
        // if has next border
        //if (v.next().length > 0) {
        //    nextBrotherDFS(graf, $(v.next()));
        //}
    }

    var nodesList = [];
    // helper function for defending if node is red and
    // could be any function that rerun boolean value
    function isRedNode(node) {
        console.log("node.css(background-color)",node.css("background-color"));
        if((node.css("background-color") == "rgb(255, 0, 0)"))
        {
            console.log("this is red red");
        }

        return (node.css("background-color") == "rgb(255, 0, 0)")
    }

    // could be any function do the desire manipulation to the node
    function paintInBlue(node) {
        node.css("background-color", "blue");
        nodesList.push(node);

    }

    function isPaintedInBlue(node) {
        return (node.css("background-color") == "blue");
    }

});


