window.onload = function() {

    // Play modes
    var pendulumForward = false;
    var shouldUseUbergrid = true;
	var newGrid =  [];            
    var bpm = 120;
	
  
	
		var toneUrls = new Tone.Players({
		            urls: {
				        "5g": "assets/Organ6.wav",
						"5y":  "assets/Organ12.wav",
						
						"4g": "assets/Organ5.wav",
						"4y": "assets/Organ11.wav",
						
						"3g": "assets/Organ4.wav",
						"3y": "assets/Organ10.wav",
						
						"2g": "assets/Organ3.wav",
						"2y": "assets/Organ9.wav",
						
						"1g": "assets/Organ2.wav",
						"1y": "assets/Organ8.wav",
						
						"0g": "assets/Organ1.wav",
						"0y": "assets/Organ7.wav",
				       
		            },
		            fadeOut: "64n",
				        }).toDestination();
						
						
		var drumUrls = new Tone.Players({
		            urls: {
				        "5g": "assets/808_Cowbell.wav",
						"5y": "assets/808_Cymbal.wav",

						"4g": "assets/808_TomHi.wav",
						"4y": "assets/808_TomMid.wav",

						"3g": "assets/808_Clave.wav",
						"3y": "assets/808_Clap.wav",

						"2g": "assets/808_HHClosed.wav",
						"2y": "assets/808_HHOpen.wav",

						"1g": "assets/808_Rim.wav",
						"1y": "assets/808_Snare.wav",

						"0g": "assets/808_TomLo.wav",
						"0y": "assets/808_Kick.wav",

		            },
		            fadeOut: "64n",
				        }).toDestination();
						
						
	
	
	var playerUrls = toneUrls;
	
	var drums = document.querySelector('#drumsCheck');
	
	
	
	
	
	drums.addEventListener('input', function()
	{		
		console.log("Just measured:" + drums)
		
		if (drums == true) {
			
	    console.log("Drums")
		    playerUrls = drumUrls 
		} else if (drums == false) {
			
	    console.log("Tones")
				
				playerUrls = toneUrls
		    }
			
		console.log(drums.value)
			drums = !drums;
		
		setupPlayers();
		
		
	});
	
	
	
    var wrapAround = document.querySelector('#wrapAroundCheck');
	wrapAround.addEventListener('input', function()
	{		
		wrapAround = !wrapAround;
		
	});

	var input = document.getElementById('wordleInput');
	
	
	
	//BPM changes
	var newBPM = document.querySelector('#bpmInput');

	newBPM.addEventListener('input', function()
	{
		newBpmDouble = newBPM.value * 2
		bpm = newBpmDouble
        Tone.Transport.bpm.value = newBpmDouble;
		
		
		console.log(newPlayers.player(1))
		
	//	 newPlayers.player(Math.floor(Math.random()*5)).start(0, 0)
		
		
	});
	

	
	
	
	

	input.addEventListener('input', function()
	{		



		inputValue = input.value.split('\n');		
		inputValue = inputValue.splice(2, 6);
		newGrid = [];

		
        for (var i=0; i<inputValue.length; i++) {

			word = inputValue[i];
			
			var newGridLine = []
			
						
			for (var w=0; w< word.length; w++) {
							letter = word.charAt(w);


							codePoint = letter.codePointAt(0)
							if (codePoint == 11035 || codePoint == 11036) {
								newGridLine.push("b")
								
								
							} else if (codePoint == 57320){
								newGridLine.push("y")
								
							} else if (codePoint == 57321){
								newGridLine.push("g")
							} 
							
							//console.log(p.replace('dog', 'monkey'));
							
			}
			newGrid.push(newGridLine);
			console.log(newGridLine);
			

        }
		
		populateGrid();
	});



    // Grid
    var grid =     ["b", "b", "b", "y", "y"];;

    if (typeof(window.getGrid) === "function") {
        grid = window.getGrid(shouldUseUbergrid); // Defined in grid.js
    }

    // Audio



		
    

    var players = [];

    var currGridIdx = 0;

    var hasStarted = false;

    var bpmIncrementStep = 0;

    // ================================================================

    // Setup players based on asset URLs
    function setupPlayers() {
        for (var i=0; i<playerUrls.length; i++) {
            var urls = playerUrls[i];
			
            var rowPlayers = {
                "y": new Tone.Player(urls["y"]).toDestination(),
                "g": new Tone.Player(urls["g"]).toDestination()
            };
			
			var newPlayers = {
				"y": new Tone.Player
			}
			
			
            players[i] = rowPlayers;
        }

        console.log(players);
    }

    // Populate the grid display
    function populateGrid() {
        var gridDisp = $("#grid");

        if (shouldUseUbergrid) {
            gridDisp.addClass("ubergrid");
        }

		grid = newGrid
		
        for (var i=0; i<grid.length; i++) {
            var row = grid[i];
            var rowDisp = $("<div></div>").addClass("row");

            for (var j=0; j<row.length; j++) {
                var cell = $("<div></div>").addClass("sq inactive").attr("id", "sq-"+i+"-"+j); // sq
                var color = row[j];

                if (color == "b") {
                    cell.addClass("black");
                } else if (color == "y") {
                    cell.addClass("yellow");
                } else if (color == "g") {
                    cell.addClass("green");
                }

                rowDisp.append(cell);
            }

            gridDisp.append(rowDisp);
        }
    }

    // Start the step sequencer (and setup step function)
    function startSequencer() {

        // Step
        var loopStep = new Tone.Loop(time => {

            // Increment BPM every bar
            if (currGridIdx == 0) {
                Tone.Transport.bpm.value += bpmIncrementStep;
            }

//            console.log(currGridIdx);
            
            // Play the current cell samples
            var playersIdxOffset = players.length - grid.length; // To account for grids being shorter
            for (var i=0; i<grid.length; i++) {
                var row = grid[i];
                var cell = row[currGridIdx];

                for (var j=0; j<row.length; j++) {
                    var cellId = "#sq-" + i + "-" + j;
                    var cellSound = (grid.length - i - 2) + cell;

                    if (j == currGridIdx) {
                        if (cell != "b") {
							if (cell == "y"){
//								playersIdx = playersIdx + 6
							}
                     //       console.log("Playing " + i + "," + j);
                            playersIdx = i + playersIdxOffset;
							console.log(cellSound);
//                            players[playersIdx][cell].start(time, 0);
		 playerUrls.player(cellSound).start(0, 0)
							 // Pass time in for better accuracy
                        }
                        $(cellId).addClass("active");
                        $(cellId).removeClass("inactive");
                    } else {
                        $(cellId).removeClass("active");
                        $(cellId).addClass("inactive");
                    }
                }             

            }

            // Grid index updating:

            if (wrapAround) {   
                 currGridIdx = (currGridIdx + 1) % grid[0].length;

            } else {
                if (pendulumForward) {
                    currGridIdx++;
                    if (currGridIdx >= grid[0].length - 1) {
                        currGridIdx = grid[0].length - 1;
                        pendulumForward = false;
                    }
                } else {
                    currGridIdx--;
                    if (currGridIdx <= 0) {
                        currGridIdx = 0;
                        pendulumForward = true;
                    }
                }
            }

        }, "4n").start(0);

        // Set BPM and start playing
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.start();
    }
	
	
	// Wraparound Checkbox
	

	
	

    // ================================================================

    // Setup
    setupPlayers();
    populateGrid();

    // Start on user click
    $("body").click(function() {
		
		
        if (!hasStarted) {
            Tone.start();
            startSequencer();
            hasStarted = true;
        }
		
		
    });


};





