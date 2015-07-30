// JavaScript Document
$(document).ready(function() {
		
//Json array of objects to hold user list===========================================================
        var chatIds = [
  {
    "name": "Sanchez Hopkins",
    "designation": "Founder and CEO",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Abigail Shields",
    "designation": "Software Engineer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Juliette Thompson",
    "designation": "Frontend engineer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Marks Whitehead",
    "designation": "Accountant",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Ratliff Murphy",
    "designation": "Software Engineer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Alyce Hoffman",
    "designation": "Frontend engineer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Bauer Cantrell",
    "designation": "Advisor",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Talley Hayden",
    "designation": "Software Engineer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Gonzalez Hurley",
    "designation": "Lead Designer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  },
  {
    "name": "Trina Bishop",
    "designation": "Designer",
    "avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  }
];
		
		
var newIds = new Array();
        
$.material.init();
		
$(window).load(function() {

			
getAllUsers();
            
});

//Function to get all users in a sorted way alphbeticall=============================================================================		
function getAllUsers() {
		chatIds = sortByKey(chatIds, 'name');
		//alert(JSON.stringify(chatIds));
		var v, node, count = 0;
				var topbar = '<section class="module">\
		 \
		  <ol class="discussion">';
		
				var bottombar = ' </ol>\
		  \
		</section>';
				for (v in chatIds) {
				   
					node = '<li class="other" id="user' + count + '">\
			  <div class="avatar">\
				<img src="'+chatIds[count].avatar+'" />\
			  </div>\
			  <div class="messages">\
				<p>' + chatIds[count].name + '</p>\
				<time datetime="2009-11-13T20:00">'+chatIds[count].designation+'</time>\
			  </div>\
			</li>' + node;
				   
					count++;
		
		
				}
				
				var displayusers = topbar + node + bottombar;
				$(".se-pre-con").fadeOut("slow");
				$(".alluserdiv .allusers").html(displayusers);
			   
		
		
			}


           
        
		
//===================================detects search pattern as user types================================================	

$(".searchinput").keyup(function() {

	var patt = $(".searchinput").val();
	var len = patt.length;
	search_name(chatIds,chatIds.length, patt, len);


});
		
//==============================================sort function to sort based on key of objects======================================		
function sortByKey(array, key) {
	return array.sort(function(a, b) {
	 var x = a[key]; var y = b[key];
	return ((x.toLowerCase() > y.toLowerCase()) ? -1 : ((x.toLowerCase() < y.toLowerCase()) ? 1 : 0));
});
}


       
//=========================================================search function to search and create new user list=================
function search_name(chatIds,n, str, len) {
	newIds = [];
	for(var i=0;i<n;i++)
	{
	  var startIndex=chatIds[i].name.toLowerCase().indexOf(str);
	  if(startIndex>=0)
	  {
		  var endIndex=parseInt(startIndex)+parseInt(len)-1;
		  newIds.push(chatIds[i]);
		  newIds[newIds.length-1].from=startIndex;
		  newIds[newIds.length-1].to=endIndex;
	  }
	}
	updateUserList();
}

function updateUserList() {
	
	if(!newIds.length)
	{
		$("#alertbox .modal-dialog .modal-content .modal-body").html("<font color='#eb4141'>There is no user named </font><font color='##00acc1'>" +$("#search").val() + "</font>");
			$("#alertbox").modal('show');
	}
	else
	{
	var node;

	var topbar = '<section class="module">\
					 \
					  <ol class="discussion">';

	var bottombar = ' </ol>\
					  \
					</section>';
	for (var v = 0; v < newIds.length; v++) {
	   
		node = '<li class="other" id="user' + v + '">\
						  <div class="avatar">\
							<img src="'+newIds[v].avatar+'" />\
						  </div>\
						  <div class="messages">\
							<p>' + newIds[v].name.substr(0,newIds[v].from) + '<font color="#FED859"><strong>'+ newIds[v].name.substr(newIds[v].from,newIds[v].to-newIds[v].from+1) +'</strong></font>'+ newIds[v].name.substr(newIds[v].to+1,newIds[v].name.length) +'</p>\
<span class="hidden">'+newIds[v].id+'</span>\
							<time datetime="2009-11-13T20:00">'+newIds[v].designation+'</time>\
						  </div>\
						</li>' + node;




	}

	var displayusers = topbar + node + bottombar;

	$(".alluserdiv .allusers").html(displayusers);
	

}
}
		
$(".add").click(function(){
						 
var name=$("#newusername").val();
var designation=$("#newuserdesg").val();
if(name==''||designation=='')
{
	$("#adduser .modal-body").html("<font color='#eb4141'> Error! One of the values were empty!</font>");
	$("#adduser").modal('show');
}
else
{
	newobj={"name":name,"designation":designation,"avatar":"img/client.png"};
	chatIds.push(newobj);
	$("#adduser .modal-body").html("<font color='#68b12f'> Successfully Added new user!</font>");
	$("#adduser").modal('show');
	
	getAllUsers();
}
						 
						 
						 
});

       
		
	
});
