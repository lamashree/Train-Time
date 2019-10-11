
$(document).ready(function(){
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

$("#submitbutton").on("click", function(event){
    event.preventDefault();
    console.log("The submit button is working")
    var name = $("#name-input").val().trim();
    var destination = $("#set-destination").val().trim();
    var FirstTimeTrain= $("#Train-time").val().trim();
    var TrainFrequency= $("#Train-frequency").val().trim(); 
    
    var newTrain ={
        name: name,
        destination:destination,
        TrainTime:TrainFrequency,
        frequency:TrainFrequency
    }
    console.log(newTrain);
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.TrainTime);
    console.log(newTrain.frequency);

  }) 
});