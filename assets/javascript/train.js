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
var trainName = "";
var destination = "";
var frequency = 0;
var minutesAway = 0;
var firstTrain = 0;
var nextArrival = 0;
var trainTime = 0;

// Capture button click.
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Take in user input.
  nameInput = $("#train-name-input").val().trim();
  destinationInput = $("#destination-input").val().trim();
  firstTrainInput = $("#first-train-input").val().trim();
  frequencyInput = $("#frequency-input").val().trim();

  // Create database keys.
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    minutesAway: minutesAway,
    firstTrain: firstTrain,
    nextArrival: nextArrival,
    trainTime: trainTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clears text boxes.
  nameInput = $("#train-name-input").val("");
  destinationInput = $("#destination-input").val("");
  firstTrainInput = $("#first-train-input").val("");
  frequencyInput = $("#frequency-input").val("");
});

// Firebase watcher + initial loader.
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var sv = childSnapshot.val();

  // Create responsive table to display user input.
  var newRow = $("<tr>").append(
    $("<td>").text(sv.trainName),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(sv.nextArrival),
    $("<td>").text(sv.minutesAway),
  );

// Append the new row to the table
$("#train-table > tbody").append(newRow);

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
