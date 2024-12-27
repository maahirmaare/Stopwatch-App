$(function(){
    // variable
    var mode = 0;  //App Mode
    var timeCounter = 0; //time counter
    var lapCounter = 0; //lap counter
    var action; //variable for setInterval
    var lapNumber = 0; //Number laps 
    // minutes,seconds,centiseconds for time and laps
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapCentiseconds; 

    //on APP LOAD SHOW START AN LAP BUTTONS
    hideshowButtons("#startButton","#lapButton");
    // click on startButton
    $("#startButton").click(function(){
        //Mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start Counter
        startAction();

    });


    //click on Stop Button
    $("#stopButton").click(function(){
        //Show Resume and Reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //Stop Counter
        clearInterval(action)
    });

    //click on resumeButton
    $("#resumeButton").click(function(){
        //Show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");

        //start counter
        startAction();
    });

    //click on resetButton
    $("#resetButton").click(function(){
       //reload Page
       location.reload();
    });

    //click on lapButton
    $("#lapButton").click(function(){
        //if mode ON
         if(mode){
        //stop action
        clearInterval(action);
        //resetLap and print lap details
        lapCounter = 0;
        addLap();
        //start action
        startAction();

         }
        
    });



    // functions
    //hideshowButtons function shows two buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
       
    }

    //Update time: converts counter to min, sec, centisec

    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter / 100) % 60);
        timeCentiseconds = (timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter / 100) % 60);
        lapCentiseconds = (lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));

    }

    //Format Numbers
    function format(number){
        if (number<10){
            return '0'+number;
        }else{
            return number;
        }
    }

    //addLap function: print lap details iside the lap box
    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap">'+ 
        '<div class="laptimetitle">'+
        'Lap'+ lapNumber +
        '</div>'+
        '<div class="laptime">'+
        '<span>'+ format(lapMinutes) + '</span>'+
        ':<span>'+ format(lapSeconds) + '</span>'+
        ':<span>'+ format(lapCentiseconds) + '</span>'+
        '</div>'+
        '</div>';
        $(myLapDetails).prependTo("#laps");
    }
});