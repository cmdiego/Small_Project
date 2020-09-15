
// JavaScript for Group 28's Small Project
// Most of this has been borrowed from Dr. Leinecker's example code

var urlBase = 'http://thisisgroup28.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	// var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	// lets add the hash after we get stuff working
	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';

	// alert for testing
	alert ( jsonPayload );

	var url = urlBase + '/Login.' + extension;
	//alert for testing
	alert ( url );

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		
		// alert for testing
		alert( "JSON package has been sent to the backend");


		var jsonObject = JSON.parse( xhr.responseText );
		alert(xhr.responseText);

		//alert for testing
		alert ( jsonObject );
		
		userId = jsonObject.id;

		//alert for testing
		alert ( userId );
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		saveCookie();
	
		window.location.href = "contactsHome.html";
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignup()
{

	window.location.href = "signup.html";

	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var confirm = document.getElementById("loginPasswordConfirm").value;

	// alerts for testing
	alert ("loginName is " + login + ": loginPassword is " + password + "confirm is " + confirm);

	var result = password.localeCompare(confirm);
	// alert for testing
	alert ("result of comparison is " + result);

	if (result != 0) {
		document.getElementById("signupResult").innerHTML = "Passwords do not match";
		// alert for testing
		alert ("passwords don't match");

		return;
	}

	// if stmt & alert for testing only
	if (result == 0) {
		
		alert ( "passwords match" );
	}
	// var hash = md5( password );
	
	document.getElementById("signupResult").innerHTML = "";

	// lets add the hash after we get stuff working
	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';

	// alert for testing
	alert ( jsonPayload );

	var url = urlBase + '/SignUp.' + extension;
	//alert for testing
	alert ( url );
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		// alert for testing
		alert ("JSON sent to API");
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		//alert for testing
		alert ( "response rec'd from API" );
		
		userId = jsonObject.id;

		//alert for testing
		alert ( userId );
		
		saveCookie();

		// alert for testing
		alert ("looks like signup worked!");
	
		window.location.href = "index.html";
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}


function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
		return userId;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}


function addContact()
{
	var newFirstName = document.getElementById("contactFirstName").value;
	var newLastName = document.getElementById("contactLastName").value;
	var newPhone = document.getElementById("contactPhone").value;
	var newEmail = document.getElementById("contactEmail").value;

	alert (newFirstName);
	var userId = readCookie();

	alert ("User ID is " + userId);

	document.getElementById("contactAddResult").innerHTML = "";
	
	
	var jsonPayload = '{"firstName" : "' + newFirstName + '", "lastName" : "' + newLastName + '", "phone" : "' + newPhone + '", "email" : "' + newEmail + '", "ID" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	// alert for testing
	alert ( jsonPayload );

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// readyState 4 means req finished & response ready, status 200 means "ok"
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}

		};

		xhr.send(jsonPayload);
		alert ("JSON has been sent");

		window.location.href = "contactsHome.html";


	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}	

// need to write most of this function
function searchContacts()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

// this is currently copied from add contact and needs to be redoneIt sh
function deleteContact()
{
	var newFirstName = document.getElementById("contactFirstName").value;
	var newLastName = document.getElementById("contactLastName").value;
	var newPhone = document.getElementById("contactPhone").value;
	var newEmail = document.getElementById("contactEmail").value;
	var userId = readCookie();

	document.getElementById("contactAddResult").innerHTML = "";
	
	
	var jsonPayload = '{"firstName" : "' + newFirstName + '", "lastName" : "' + newLastName + '", "phone" : "' + newPhone + '", "email" : "' + newEmail + '", "ID" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	// alert for testing
	alert ( jsonPayload );

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// readyState 4 means req finished & response ready, status 200 means "ok"
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}

		};

		xhr.send(jsonPayload);
		alert ("JSON has been sent");
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

