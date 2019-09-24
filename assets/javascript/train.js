// Initialize Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyBg-bnUbyXMzeEgRnhnIAiWmKv_eTLtF8Q",
  authDomain: "train-scheduler-2e85d.firebaseapp.com",
  databaseURL: "https://train-scheduler-2e85d.firebaseio.com",
  projectId: "train-scheduler-2e85d",
  storageBucket: "",
  messagingSenderId: "153033932893",
  appId: "1:153033932893:web:1e480aea2937a410b18db4"
};
  
  firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// Define initial variables.
var trainName;
var destination;
var frequency = 0;
var minutesAway = 0;
var firstTrain = 0;
var nextArrival = 0;

// Capture button click.
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Take in user input.
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Create database keys.
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clears text boxes.
  nameInput = $("#train-name-input").val("");
  destinationInput = $("#destination-input").val("");
  firstTrainInput = $("#first-train-input").val("");
  frequencyInput = $("#frequency-input").val("");
});

// Conversion of input to next train time and minutes away.
database.ref().on("child_added", function(childSnapshot) {
  var firstTrainConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minutesAway = childSnapshot.val().frequency - timeRemain;
  var nextArrival = moment().add(minutesAway, "minutes");
  nextArrival = moment(nextArrival).format("hh:mm");
  var firebaseName = childSnapshot.val().trainName;
	var firebaseDestination = childSnapshot.val().destination;
	var firebaseFrequency = childSnapshot.val().frequency;

// Create responsive table to display user input.

$("#train-table > tbody").append("<tr><td>" + firebaseName + 
"</td><td>" + firebaseDestination + 
"</td><td>"+ firebaseFrequency + 
"</td><td>" + nextArrival + 
"</td><td>" + minutesAway + "</td></tr>");

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});
