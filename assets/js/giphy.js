   var APIKey= "dc6zaTOxFJmzC";
   var designs = ["Eli Manning","Tom Brady", "Aishwarya Rai", "Jennifer Aniston", "Donald Trump"];

      // writing a function for images// setting var for attribute and search query
    function displayDesign() {
            //emthying out the images from the class
          $('.photo').empty();

            // extract button label to send to qurty 
          var designsAssign = $(this).attr("data-name");
          //  create query to call giphy , query parameter designsAssign is search critria and limit is 10 
          var queryURL = "http://api.giphy.com/v1/gifs/search?q="+   designsAssign + "&api_key=dc6zaTOxFJmzC&limit=10  ";
          console.log(queryURL);
          // Creates AJAX call for the specific Giphy Image is being clicked
          $.ajax({
          url: queryURL,
          method: "GET"
          }).done(function(response) {
              console.log(response);
              // Creates a div to hold the image
              $("#giphy-view").attr(designsAssign);
              // setting up for loop for images .Ajax query returns images in a set numbers.
              for (var i=0; i< response.data.length; i++ ) {
                    var poster= $('<img>');
                    poster.addClass ('pictures');
                    // adding the attributes to each image
                    poster.attr( "src", response.data[i].images.fixed_width_still.url);         
                    poster.attr( "data-still",response.data[i].images.fixed_width_still.url);
                    poster.attr( "data-animate",response.data[i].images.fixed_width.url);
                    poster.attr( "data-state", "still" );
                    $('.photo').append(poster);                                
             } //  
         });  // end of function of ajax 
   };  // end of function displayDesign()

// add buttons for the array of images on the screen
    function renderButtons() {
    
    // Deletes buttons prior to adding new buttons
    // ( otherwise we will have repeat buttons)
    $("#buttons-view").empty(); 

    // Loops through the array of images
     for (var i = 0; i < designs.length; i++) {
            var a = $("<button>");
            a.addClass("designs");
            // Added a data-attribute
            a.attr("data-name", designs[i]);
            a.text(designs[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
     }  // for loop design.length
   }  // function render Button 

     // This function handles events where the add  image button is clicked
   $("#add-design").on("click", function(event) {
    // This line of code will grab the input from the textbox and trim extra spaces
     var giff=$("#giphy-input").val().trim();
     if (giff != "")  {
         event.preventDefault();

         // from the textbox is then added to our array
         designs.push(giff);
         // remove duplicates from array 
         designs = designs.filter((v,i,a) => a.indexOf(v) == i);
         // Calling renderButtons which handles the processing displaying buttons in  from the array 
         renderButtons();
   }// Text box is not empty, then only add it , igore empty buttons 
   }); // end of function on click 
 
    // when any button is clicked call function to display gifs based on text of the button 
   $(document).on("click", ".designs ", displayDesign);

   $(document).on('click',".pictures", function(event){
       var state= $(this).attr("data-state");
       if(state=="still") {
          $(this).attr("src",$(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          console.log(state);
        }
        else {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr('data-state',"still");
        }
     });
//Calling the renderButtons function to display the intial buttons
   // emptying out the button div
   $("#buttons-view").empty();
    renderButtons();