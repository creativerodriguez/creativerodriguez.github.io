//Popular Vote Watcher
//Orlando Rodriguez
//app.js

var electionId = window.votingData.electionId;
var electionDate = window.votingData.electionDate;
var electionDescription = window.votingData.electionDescription;
var candidates = window.votingData.candidates;
var voting = window.votingData.voting;
var names = [];
var parties = [];
var display = [];
var output = [];
var total = 0;
var percent = 0;
var currentVoteCount = 0;
var percentSum;
var timeDelayMs = 5000; // 5-second delay

function calculateVotes() {
	total = 0;
	output = [];
	document.getElementById('results').innerHTML = '';
	try {
		for ( var i = 0; i < candidates.length; i++) {
			var vote = {
				id : i,
				inputvalue : 0,
				name : window.votingData.candidates[i].name,
				verticle : window.votingData.candidates[i].verticle,
				display : '',
				votes : '',
				output : ''
			};
			output.push(vote);
		}

	} catch (err) {
		document.getElementById("results").innerHTML = "calculateVotes: "
				+ err.message + ' : ' + err.name;
	}

	if (!isNaN(total)) {
		try {
			document.getElementById('candidatesDisplay').innerHTML = '';
// 			document.getElementById('votesDisplay').innerHTML = '';
			document.getElementById('results').innerHTML = '';
			output
					.forEach(function(vote) {
						inputvalue = [parseInt(window.votingData.voting[currentVoteCount][vote.id])];
						vote.inputvalue = inputvalue;
						votesArray = window.votingData.voting[currentVoteCount];
						percentTotal = votesArray.reduce(function(percentTotal, x) { return percentTotal + x; }, 0);						
						total += parseInt(inputvalue);
						vote.display = '<div class="col-12 col-sm-12">'
								+ '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=" width="150" height="150" class="img-fluid rounded-circle" alt="Generic placeholder thumbnail">'
								+ '<h4><input name="name" id="can'
								+ (vote.id + 1) + '" value="' + vote.name
								+ '"></h4><br/>'
								+ '<small for="can' + (vote.id + 1)
								+ '">Candidate ' + (vote.id + 1) + '</small>'
								+ '<div class="text-muted"><input name="name" id="verticle'
								+ (vote.id + 1) + '" value="' + vote.verticle
								+ '"><br/>'
								+'<label for="votes' + (vote.id + 1)
								+ '"> Votes for ' + vote.name
								+ '</label><br/><input class="btn-success" name="votes" id="vote_input'
								+ (vote.id + 1) + '" value="' + vote.inputvalue
								+ '"><br/><output id="percent'
								+ (vote.id+1) + '"> Percentage : '
								+  getPercent(inputvalue, percentTotal).toFixed(1) // percent.toFixed(1)
								+ '%</output>'
								+ '</div></div>';

/*
						vote.votes = '<label for="votes' + (vote.id + 1)
								+ '"> Votes for Candidate ' + (vote.id + 1)
								+ '</label> <input name="votes" id="vote_input'
								+ (vote.id + 1) + '" value="' + vote.inputvalue
								+ '"><br/>';
*/

						vote.output = '<label for="canName'
								+ (vote.id+1)
								+ '"> <span id="canVerticle'
								+ (vote.id+1)
								+ '">Verticle : '
								+ vote.verticle
								+ '</span>, &nbsp;&nbsp;<span id="canName'
								+ (vote.id+1)
								+ '">Name : '
								+ vote.name
								+ '</span>, &nbsp;&nbsp;</label><output id="percent'
								+ (vote.id+1) + '"> Percentage : '
								+  getPercent(inputvalue, percentTotal).toFixed(1) // percent.toFixed(1)
																					// //
								+ '%</output><br/>';
						document.getElementById('candidatesDisplay').innerHTML += vote.display;
// 						document.getElementById('votesDisplay').innerHTML += vote.votes;
						document.getElementById('results').innerHTML += vote.output;
					});
			console.table(output);
			console.table(voting);
		} catch (err) {
			document.getElementById("results").innerHTML = "output.forEach: "
					+ err.message + ' : ' + err.name;
		}
		 document.getElementById('totalvotes').value = total;
	}
	 validateForm();
}

function getPercent(v, i) {
	x = 0;
	x = (v / i) * 100;
	return x;
}

function voteUpdates() {
	 "use strict";
	 // The if test prevents the voteUpdates
	 // function from recursing forever
	 try {
		 calculateVotes();
		if (currentVoteCount < voting.length -1) {
			currentVoteCount ++;
			setTimeout(voteUpdates, timeDelayMs, voting, currentVoteCount);		
		} else {
			console.log(currentVoteCount);
		}
	} catch (err) {
		document.getElementById("results").innerHTML = "voteUpdates: "
				+ err.message + ' : ' + err.name;
	}
 }

document.getElementById('date').value = electionDate;
document.getElementById('heading').innerHTML = electionDescription;
document.getElementById('btn').addEventListener('click', calculateVotes);

function validateForm() {
	try {
		for ( var i = 0; i < output.length; i++) {
			var id = output[i].id + 1;

			var str = '';
			var int = 0;
			var res = true;

			if (!output[i].name) {
				document.getElementById('results').innerHTML = '<span style="color: red;font-weight: bolder;">Name must be filled out for Candidate '
						+ id + '</span>';
				return false;
			}
			str = output[i].name;
			res = /^[a-zA-Z. ]+$/.test(str);
			if (res === false) {
				document.getElementById('results').innerHTML = '<span style="color: red;font-weight: bolder;">Name must not contain numbers for Candidate '
						+ id + '</span>';
				return false;
			}
			if (!output[i].verticle) {
				document.getElementById('results').innerHTML = '<span style="color: red;font-weight: bolder;">Party must be filled out for Verticle '
						+ id + '</span>';
				return false;
			}
			if (!output[i].inputvalue) {
				document.getElementById('results').innerHTML = '<span style="color: red;font-weight: bolder;">Votes must be filled out for Votes for Candidate '
						+ id + '</span>';
				return false;
			}
			int = output[i].inputvalue;
			res = /^\d+$/.test(int);
			if (res === false) {
				document.getElementById('results').innerHTML = '<span style="color: red;font-weight: bolder;">Votes must be numbers for Votes for Candidate '
						+ id + '</span>';
				return false;
			}

		}
	} catch (err) {
		document.getElementById("results").innerHTML = "validateForm: "
				+ err.message + ' : ' + err.name;
	}

}
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}
voteUpdates();