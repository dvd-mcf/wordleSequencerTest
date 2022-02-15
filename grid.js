window.getGrid = function(shouldUseUbergrid) {

    // Grid
    var grid = [];

    // Template
    grid = [
        ["b", "b", "b", "b", "b"],
        ["g", "g", "g", "g", "g"]
    ];

    // Examples
    // 197
    // grid = [
    //     ["b", "b", "g", "b", "y"],
    //     ["y", "y", "g", "b", "b"],
    //     ["b", "b", "g", "g", "g"],
    //     ["g", "g", "g", "g", "g"]
    // ];

    // 200
    // grid = [
    //     ["b", "b", "b", "y", "y"],
    //     ["g", "g", "y", "g", "b"],
    //     ["g", "g", "b", "g", "g"],
    //     ["g", "g", "g", "g", "g"]
    // ];

    // Ubergrid 
    var ubergrid = [[], [], [], [], [], []];

    function concatUbergrid(ubergrid, grid) {
        
        var gridIdxOffset = ubergrid.length - grid.length;

        for (var i=0; i<ubergrid.length; i++) {
            var ubergridRow = ubergrid[i];
            // var gridRow = grid[i + gridIdxOffset];

            if (i < grid.length) {
                var gridRow = grid[i];
                ubergridRow = ubergridRow.concat(gridRow);
                ubergrid[i] = ubergridRow;
            } else {
                ubergrid[i] = ubergrid[i].concat(["b","b","b","b","b"]);
            }
        }
    }

    // --------------------------------

    // 202
    
    grid = [
        ["g", "b", "b", "b", "y"],
        ["g", "b", "b", "g", "b"],
        ["g", "g", "g", "g", "b"],
        ["g", "g", "g", "g", "b"],
        ["g", "g", "g", "g", "g"]
    ];
    concatUbergrid(ubergrid, grid);

    // --------------------------------

    if (shouldUseUbergrid) {
        grid = ubergrid;
    }

    return grid;
}