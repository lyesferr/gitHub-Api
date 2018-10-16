var tag;

window.onload = function () 
{

	

	$('#myCompany').keydown(function (event) {
		var keypressed = event.keyCode || event.which;
		if (keypressed == 13 ) 
		{
			myFunction()
		}
	});

	

}

function myFunctionInput()
{
	var x = document.getElementById("myCompany").value;
	
	if (x=="")
	{
		document.getElementById("theContainer").innerHTML = "";
	}
}

function myFunction()
	{
		console.log("ici");

		var theUser = $( "#myCompany" ).val();


		//$('.geo').html(position.coords.latitude+ " " +position.coords.longitude);
		$.getJSON("https://api.github.com/users/" + theUser + "/repos", function(json) 
		{
			document.getElementById("theContainer").innerHTML = "";
			let template = document.querySelector("#template").innerHTML;

			for (var i = 0; i < 10; i++) 
			{
				let node = document.createElement("div");
				node.classList.add("row");
				node.classList.add("alert");
				node.classList.add("alert-info");
				node.classList.add("alertItem");
				node.innerHTML = template;
				
				node.querySelector(".auteurPoste").innerHTML = json[i].full_name;

				var link = json[i].html_url;
				console.log(link);
				//node.querySelector(".linkUser").replaceWith = '<img src="'+ photoPro + '.jpg" alt="author">';
				node.querySelector(".linkUser").setAttribute("href",link);
				

				node.querySelector(".languageOf").innerHTML = json[i].language;
				node.querySelector(".tagOf").innerHTML = " ";//getTag(json[i].owner.login,json[i].name);
				
				function ji (){
					$.getJSON("https://api.github.com/repos/"+ json[i].owner.login +"/"+ json[i].name +"/tags", function(json) 
						{
				
							tag =  json[0].name;
							node.querySelector(".tagOf").innerHTML = tag;
									
							});

				}
				ji();
				node.querySelector(".addOf").setAttribute("id", i);
				node.querySelector(".addOf").addEventListener("click", function(){
					 
					 node.querySelector(".addOf").style.visibility = "hidden";
					 let template = document.querySelector("#template2").innerHTML;

					 let node2 = document.createElement("div");
					 node2.classList.add("row");
					 node2.classList.add("alert");
					 node2.classList.add("alert-success");
					 node2.innerHTML = template;
					 node2.querySelector(".auteurPoste").innerHTML = json[this.id].full_name

					 var link = json[this.id].html_url;
					 console.log(link);
					 //node.querySelector(".linkUser").replaceWith = '<img src="'+ photoPro + '.jpg" alt="author">';
					 node2.querySelector(".linkUser").setAttribute("href",link);

					 node2.querySelector(".languageOf").innerHTML = json[this.id].language;
					 let theID = this.id;
					 function ji (){
						$.getJSON("https://api.github.com/repos/"+ json[theID].owner.login +"/"+ json[theID].name +"/tags", function(json) 
							{
						tag =  json[0].name;
						console.log("tag -> "  + tag);
						node2.querySelector(".tagOf").innerHTML = tag;
								
						});
	
					}
					ji();
					 node2.querySelector(".delOf").addEventListener("click", function(){
						
						node2.remove();
						node.querySelector(".addOf").style.visibility = "visible";
						});
			 
					 document.getElementById("theContainer2").appendChild(node2);
					});
				document.getElementById("theContainer").appendChild(node);
				
			}

		});        
			
	}