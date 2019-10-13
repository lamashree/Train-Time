
$(document).ready(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAu_68fcdqdF1eCf2w-9ADOZTLSUF_zFis",
        authDomain: "train-time-311f5.firebaseapp.com",
        databaseURL: "https://train-time-311f5.firebaseio.com",
        projectId: "train-time-311f5",
        storageBucket: "train-time-311f5.appspot.com",
        messagingSenderId: "209435540398",
        appId: "1:209435540398:web:a92773ff4739d84289a63f",
        measurementId: "G-NS23MP5CFG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    // button for adding new train time
    $("#submitbutton").on("click", function (event) {
        event.preventDefault();
        console.log("The submit button is working")

        //graping the input from users and contain in the varible//
        var name = $("#name-input").val().trim();
        var destination = $("#set-destination").val().trim();
        var FirstTimeTrain = moment($("#Train-time").val().trim(), "HH:mm-military time");
        var frequencyInMinutes = $("#Train-frequency").val().trim();

        // creating local object to hold Train data///
        var newTrain = {
            name: name,
            destination: destination,
            TrainTime: FirstTimeTrain,
            frequency: frequencyInMinutes
        };
        // alerting the user they adding new data for Train//
        alert("YOU Added your Train Schedule");
        
        console.log(newTrain);

        //uploading Train Time to the database.//
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.TrainTime);
        console.log(newTrain.frequency);

        //
        $("#name-input").val("");
        $("#set-destination").val("");
        $("#Train-time").val("");
        $("#Train-frequency").val("");
    });
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var TrainTime = childSnapshot.val().TrainTime;
        var frequency = childSnapshot.val().frequency;

        // Employee Info
        console.log(name);
        console.log(destination);
        console.log(TrainTime);
        console.log(frequency);

        // var Trainstart= moment.unix(FirstTimeTrain).format("HH;mm");
        // console.log(Trainstart + "this is working");
        var firsttimemoment= moment(TrainTime, "HH:mm");
        //
        console.log(firsttimemoment);
        var currentTime= moment();
        console.log(currentTime);
        var minuteArrival= currentTime.diff(firsttimemoment, "minutes");
        var minuteLast= minuteArrival % frequency;
        var awayTrain =frequency - minuteLast;
        console.log("minutes:" + minuteArrival);
        console.log("Mimutes last:" + minuteLast);
        console.log("Away Train:" + awayTrain);

        var nextArrival = currentTime.add(awayTrain, 'minutes');
        var arrivaltime = nextArrival.format("HH:mm");

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(TrainTime),
            $("<td>").text(frequency),
            $("<td>").text(awayTrain),
          );
          $("#Train-table").append(newRow);
    });

});
