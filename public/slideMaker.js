//Nasa API key
var apiKey = config.API_KEY;
/* Add this -> config.js 
	var config = {API_KEY: [your nasa key in quotes here]};
and .gitignore
	config.js
See for details: https://gist.github.com/derzorngottes/3b57edc1f996dddcab25 
*/
/* See https://api.nasa.gov/index.html#getting-started for free NASA api key */


var slideList = [];
var req = new XMLHttpRequest();

//About:  https://epic.gsfc.nasa.gov/about/api
req.open('Get', 'https://api.nasa.gov/EPIC/api/natural/images?api_key=' + apiKey, true);
req.addEventListener('load', function(){
	var response = JSON.parse(req.responseText);
	for(var count = 0; count < response.length; count++){
		var date = response[count].date;

		//Building the URL for the image src
		var year = date.substring(0, 4);
		var month = date.substring(5, 7);
		var day = date.substring(8, 10);

		var image = 'https://api.nasa.gov/EPIC/archive/natural/' +
			year + '/' + month + '/' + day + '/png/' + 
			response[count].image + '.png?api_key=' + apiKey;

		var caption = "DSCOVR Spacecraft";
		var body = "Earth"
		
		var epicImage = {"img_src":image, "img_caption":caption, "img_body":body, "date":date};
		
		slideList.push(epicImage);
		console.log("Added EPIC image " + count);
	}
	curiosity();
 });
 req.send(null);

function curiosity(){
	//About: https://api.nasa.gov/api.html#MarsPhotos
	var req2 = new XMLHttpRequest;
	req2.open('Get', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=' + apiKey, true);
	req2.addEventListener('load', function(){
		var response2 = JSON.parse(req2.responseText);
		//photo array
		for(var count = 0; count < response2.latest_photos.length; count++){
			if (response2.latest_photos[count].camera.name == "NAVCAM"){

				var image = response2.latest_photos[count].img_src;
				
				var caption =  response2.latest_photos[count].rover.name;

				var date = response2.latest_photos[count].earth_date + " Sol: " + response2.latest_photos[count].sol;

				var body = "Mars";

				var curiosityPic = {"img_src":image, "img_caption":caption, "img_body":body, "date":date};

				slideList.push(curiosityPic);
				console.log("Added EPIC image " + count);
			}
		}
		//For now skipping the other two rovers, since they aren't responding with clear images
		startSlideShow();
	 });
	 req2.send(null);
}

function opportunity(){
	console.log("in opportunity");
	var req = new XMLHttpRequest;
	req.open('Get', 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=' + apiKey, true);
	req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText);
		console.log(response);
		//photo array
		for(var count = 0; count < response.latest_photos.length; count++){
			if (response.latest_photos[count].camera.name == "NAVCAM" ||
				response.latest_photos[count].camera.name == "PANCAM"){

				var image = response.latest_photos[count].img_src;

				var caption = response.latest_photos[count].rover.name + " Sol: " + response.latest_photos[count].sol;

				var body = "Mars";

				var date = response.latest_photos[count].earth_date;

				var opportunityPic = {"img_src":image, "img_caption":caption, "img_body":body, "date":date};

				slideList.push(opportunityPic);
			}
		}
		spirit();
	 });
	 req.send(null);
}

function spirit(){
	console.log("in spirit");
	var req = new XMLHttpRequest;
	req.open('Get', 'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=' + apiKey, true);
	req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText);
		console.log(response);
		//photo array
		for(var count = 0; count < response.latest_photos.length; count++){
			if (response.latest_photos[count].camera.name == "NAVCAM" ||
				response.latest_photos[count].camera.name == "PANCAM"){

				var image = response.latest_photos[count].img_src;

				var caption = response.latest_photos[count].rover.name + " Sol: " + response.latest_photos[count].sol;

				var body = "Mars";

				var date = response.latest_photos[count].earth_date;

				var spiritPic = {"img_src":image, "img_caption":caption, "img_body":body, "date":date};

				slideList.push(spiritPic);
			}
		}
		startSlideShow();
	 });
	 req.send(null);
}

//Working from : https://www.sitepoint.com/make-a-simple-javascript-slideshow-without-jquery/
function startSlideShow(){
	console.log("start slide show");
	console.log(slideList);
	var slideCount = slideList.length;

	var indicators = document.getElementById("indicatorList");
	var slides = document.getElementById("inner");
	var innerDiv = document.getElementById("carouselExampleIndicators");
	//Build carousel
	for (var i = 0; i < slideCount; i++){
		//Add indicators
		var newIndicator = document.createElement("li");
		newIndicator.setAttribute("data-target", "#carouselExampleIndicators");
		newIndicator.setAttribute("data-slide-to", i);
		
		if(slideList[i].img_body == "Earth"){
			newIndicator.className = "earth";
		}
		else if(slideList[i].img_body == "Mars"){
			newIndicator.className = "mars";
		}

		if(i == 0){
			newIndicator.className += " active";
		}

		indicators.appendChild(newIndicator);

		//Add carousel slides
		var newSlide = document.createElement("div");
		
		newSlide.className= "carousel-item";
		if(i == 0){
			newSlide.className = "carousel-item active";
		}
		newSlide.innerHTML = '<img class="image-fluid" src="' + slideList[i].img_src + '" alt="none yet" width=500 height=500>';
		var caption = document.createElement("div");
		//d-block means hide on small screens, bring back on med screens
		caption.className = "carousel-caption d-none d-md-block";
		var slideNum = document.createElement("p");
		var picDate = document.createElement("p");
		var body = document.createElement("h3");
		var picCaption = document.createElement("p");

		slideNum.textContent = (i+1) + "/" + slideCount;
		picDate.textContent = slideList[i].date;
		body.textContent = slideList[i].img_body;
		picCaption.textContent = slideList[i].img_caption;

		caption.appendChild(slideNum);
		caption.appendChild(body);
		caption.appendChild(picDate);
		caption.appendChild(picCaption);

  		newSlide.appendChild(caption);
		
		slides.appendChild(newSlide);

	}

	var x = '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
				'<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
				    '<span class="sr-only">Previous</span>'+
				  '</a>'+
				  '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">'+
				   '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
				    '<span class="sr-only">Next</span>'+
				  '</a>'
	var fwdbackButtons = document.createElement("span");
	fwdbackButtons.innerHTML = x;
	innerDiv.appendChild(fwdbackButtons);

}




/*

To do - 

How to host on Heroku?

Serverside conversion

checkboxes to control which images you see

add solar images
https://sohowww.nascom.nasa.gov/data/realtime/realtime-update.html

find a way to get rid of duplicate or blurry pictures?

*/