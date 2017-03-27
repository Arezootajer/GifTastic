 // While it may not seem imperative for smaller programs, you should get in the habit
 // linking to a separate js file and also wrapping your js code in either a 

 // $(document).ready(function(){
 //  // code goes here
 // })

 // or an IIFE (immediately invoked function expression)
 // ;(function(){
 //  // code goes here
 // })()

 // One of the most important reasons for that is security - because right now your global variables
 // can be tampered with through the console by a malicious visitor 😮

      var animals = ["dog", "Cat", "Rat", "Bat", "Donkey", "lion", "Tiger", "elephant","Bull","butterfly","deer","Dove","Panda","Fish","Bear"];

      // Function for adding buttons
      function renderButtons() {

        // Delete the content inside the buttonsView div prior to adding new button
        $("#buttonsView").empty();
   
        // Loop through the array of animals, then generate buttons for each animal in the array
        for(i=0; i<animals.length; i++){
          // you should try to keep indentation consistent as it helps with readability
          var a = $("<button>");
          a.addClass("btn btn-info animalBtn");
        
          a.attr("data-name", animals[i]);
        
          a.text(animals[i]);
        
          $("#buttonsView").append(a);

        };

      }

      // click add button function
      $("#add-button").on("click", function(event) {
        event.preventDefault();

        // get user value
        // add new animal to push to the array
        var animal = $("#inputAnimal").val();

        animals.push(animal);
        //call function
        renderButtons();

        // clear input text
        $("input:text").val("");
      });

      // call for first time 
      renderButtons();


  $(document.body).on("click", ".animalBtn", function() {


        var animal = $(this).attr("data-name");
        // you generally want to remove console.log statements from production code
        // console.log(animal);
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=dc6zaTOxFJmzC&limit=10';

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // you want to remove any prior gifs from the imageSection before adding any new ones
          $("#imageSection").empty();

         var results = response.data;

          // when iterating over the values in an array, feel free to use the native `.forEach` method
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
         

            var animalimage = $("<img>");
            // var p = $("<p>").text("Rating:" + results[i].rating);

            animalimage.addClass("gif");
            animalimage.attr("src", results[i].images.fixed_height_still.url);
            animalimage.attr("data-animate", results[i].images.fixed_height.url);
            animalimage.attr("data-still", results[i].images.fixed_height_still.url);
            animalimage.attr("data-state", "still" );
           
            gifDiv.append(animalimage);
            $("#imageSection").prepend(gifDiv);
          }
        });
         
        });


   $(document.body).on("click", ".gif", function() {
    
      var state=$(this).attr("data-state");

      // console.log(state);
      // nice job using strict equality checking 👌
      if (state==="still"){
      
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr ("data-state", "still");
      }

    });
      