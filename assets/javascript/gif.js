// Global Variables
var cars = ["supra", "350z","BMW","Mercedes","Tundra","Nissan","ferrari"];
var numGifs = 10;
var offset = 0;

// Display initial buttons
renderButtons();

// Adding click event listeners to all elements with a class of "theme"
$(document).on("click", ".theme", function() {
    $("#displayGif").empty(); 
    offset = 0;  
    displayGifInfo($(this).attr("data-theme"))
});

// Add click event listners to all elemements with a class of "gifImage"
$(document).on("click",".gifImage", toggleGif);

// Handles events when the add gif button is clicked
$("#addGif").on("click", function(event) {
    event.preventDefault();
    // Grab the input from the textbox
    var input  = $("#gifInput").val().trim();

    // Add button only if text field is not blank
    if (input !== "") {

        // The gif theme from the textbox is then added to gif array
        cars.push(input);

        // Calling renderButtons which handles the processing of gif array
        renderButtons();

        // Clear input text field
        $("#gifInput").val("");
    }

});  

$("#moreGifs").on("click", function(event) {
    event.preventDefault();
    offset += 10;
    displayGifInfo($(this).attr("data-theme"));
});

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo(theme) {

    // var theme = $(this).attr("data-theme");
    console.log("offset: "+offset)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+theme+"&limit=10&offset="+offset+"&rating=G&lang=en&api_key=ZcsM1JDHgHGzXl7jUkkOl87f5EpsqOfc"

    // Creates AJAX call for the specific gif theme button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < numGifs; i++){

            var gifDiv = $("<div class='card my-2'>");
            var div = $("<div class='card-body'>").html("<h5 class='card-title'>" + response.data[i].title.toUpperCase() + '</h5>');
            var ul = $("<ul class='list-group list-group-flush'>");
            var gifImage = $("<img class='card-img-top gifImage hover-outline' alt="+theme+">");
            gifImage.attr("src",response.data[i].images.fixed_height_small_still.url);
            gifImage.attr("still",response.data[i].images.fixed_height_small_still.url)
            gifImage.attr("gif",response.data[i].images.fixed_height_small.url);
            gifDiv.append(ul);
            ul.append("<li class='list-group-item'><strong>Source:</strong> " + response.data[i].source_tld + "<br/>")
            div.append("<h6>Rating: " + response.data[i].rating.toUpperCase() + "</h6>")
            gifDiv.prepend(div);
            gifDiv.prepend(gifImage);
            console.log(gifDiv)
            $("#displayGif").prepend(gifDiv);


        }
        $("#moreGifs").show().attr("data-theme",theme);  // Add current theme to more button
    });
}

// Function for displaying gif theme buttons
function renderButtons() {

    // Clear current buttons and re-render the buttons to prevent button duplication
    $("#gifButtons").empty();
    $("#moreGifs").hide();

    // Loops through the array of gif themes
    for (var i = 0; i < cars.length; i++) {
        // Dynamicaly generate buttons for each gif theme in the array
        var a = $("<button>");
        // Add a class of theme to button
        a.addClass("theme btn btn-primary m-1");
        // Add a data-attribute
        a.attr("data-theme", cars[i]);
        // Display initial button text
        a.text(cars[i]);
        // Add the button to the gifButtons div
        $("#gifButtons").append(a);
    }   
}

// Function to toggle between still image and gif
function toggleGif () {
    if ($(this).attr("src") === $(this).attr("still")) {
        $(this).attr("src",$(this).attr("gif"));
    }
    else {
        $(this).attr("src",$(this).attr("still"));
    }
}
