var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

    recognition.onresult = function(event)
    {
        console.log(event);
        var content = event.results[0][0].transcript;
        document.getElementById("textbox").innerHTML = content;
        console.log("Content = " + content);
        speak();
    }

    function speak() 
    {
        var synth = window.speechSynthesis;
        var speakdata = document.getElementById("textbox").value;
        if(speakdata == "take my selfie")
        {
            var utterThis = new SpeechSynthesisUtterance("Taking Your Selfie In 5 Seconds");
            synth.speak(utterThis);
            Webcam.attach(camera);
            setTimeout(function(){
                takeSnapshot();
                save();
            }, 5000);
        }
        else
        {
         var utterThis = new SpeechSynthesisUtterance(speakdata);
         synth.speak(utterThis);   
        }
    }

    camera = document.getElementById("camera");
    Webcam.set({
        width: 360,
        height: 250,
        image_format: 'jpg',
        jpg_quality: 180,
    });

    function takeSnapshot()
    {
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
        });
    }

    function save()
    {
        link = document.getElementById("link");
        image = document.getElementById("selfie_image").src;
        link.href=image;
        link.click();
    }