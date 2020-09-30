// JavaScript for Group 28's Small Project
// COP4331: Fall 2020
// JS written by Christy Wilhite
// Credit to Dr. Leinecker for some aspects of this code

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
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
	
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		saveCookie();
	
		window.location.href = "contacts-home.html";
		
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

	var result = password.localeCompare(confirm);

	if (result !== 0) {

		document.getElementById("signupResult").innerHTML = "Passwords do not match";
		setTimeout(() => { console.log("waiting for user to read message!"); }, 2000);
		return;
	}

	// var hash = md5( password );
	
	document.getElementById("signupResult").innerHTML = "";

	// lets add the hash after we get stuff working
	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';

	var url = urlBase + '/SignUp.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
	
		var jsonObject = JSON.parse( xhr.responseText );
	
		userId = jsonObject.id;
    	saveCookie();

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


	// check to see if any fields are empty
    if (newFirstName.value === null || newFirstName === "") {
        alert("newFirstName is blank");
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered"
        return;
    }

    if (newLastName.value === null || newLastName === "") {
        alert("newLastName is blank");
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered"
        return;
    }
    
    if (newPhone.value === null || newPhone === "") {
        alert("newPhone is blank");
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered"
        return;
    }
    
    if (newEmail.value === null || newEmail === "") {
        alert("new Email is blank");
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered"
        return;
    }
	
	// get user ID from the cookie
	var userId = readCookie();

	// alert for testing
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

        // this isn't working to give the user time to read that contact has been added
        // may need to change this function to synchronous
        setTimeout(() => { console.log("waiting for user to read message!"); }, 3000);
		window.location.href = "contacts-home.html";

	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}	

function searchContacts()
{

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var userID = readCookie();
	
	document.getElementById("contactSearchResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + firstName  + '", "lastName" : "' + lastName + '", "ID" : ' + userId + '}';

	var url = urlBase + '/SearchContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				
				var jsonObject = JSON.parse( xhr.responseText );

				for( var i=0; i<jsonObject.results.length; i++ )
				{
				    
					var resultsTable = document.getElementById('searchResults');
					
					var row = resultsTable.insertRow(-1);
					var cellResults = row.insertCell(0);
					cellResults.id = "contactInfo" + (i);
					cellResults.innerHTML = jsonObject.results[i];
					
					
					// create Edit and Delete icons and append them to their cells
					
					var cellEdit = row.insertCell(1);
					var cellRemove = row.insertCell(2);
					
					var newElement;

					cellEdit.id = "contactInfo" + (i) + "Edit";
					newElement = document.createElement("a");
					newElement.setAttribute("onclick", "packageModifyInfo(" + (i) + ", " + (userID) + ")");
					newElement.innerHTML = '<img id="editIcon" src="img/edit.png" alt="Edit">';
					cellEdit.appendChild(newElement);

					cellRemove.id = "tableRow" + (i) + "Remove";
					newElement = document.createElement("a");
					newElement.setAttribute("onclick", "deleteContact(" + (i) + ", " + (userID) + ")");
					newElement.innerHTML = '<img id="trashIcon" src="img/trash.png" alt="Remove">';
					cellRemove.appendChild(newElement);			
				}
			
			}
		};

		xhr.send(jsonPayload);
	
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

// this should work but can't test it until we have html set up for deleting
// may need to add an html span for "contactDeleteResult" somewhere.
function deleteContact(resultString, userId)
{

	alert("Your are deleting a contact.")
	
    var resultsTable = document.getElementById('searchResults');
    
    var results = resultsTable.rows[resultString].cells[0].innerHTML;
    var arr = results.split(" ", 2);
    
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var jsonPayload = '{"firstName" : "' + arr[0] + '", "lastName" : "' + arr[1] + '", "ID" : ' + userId + '}';
	var url = urlBase + '/DeleteContact.' + extension;
	
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
				// changed this line already
				document.getElementById("contactSearchResult").innerHTML = "Contact has been deleted";
			}

		};

		xhr.send(jsonPayload);
	
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function packageModifyInfo(index, userId)
{
    
    var resultsTable = document.getElementById('searchResults');
    var results = resultsTable.rows[index].cells[0].innerHTML;
    var arr = results.split(" ", 2);
    
    localStorage.setItem("firstName", arr[0]);
    localStorage.setItem("lastName", arr[1]);
    localStorage.setItem("userID", userId);
    
    window.location.href = "update-contact.html";
}
function modifyContact()
{
	document.getElementById("contactUpdateResult").innerHTML = "";
	
	var firstName = document.getElementById("contactFirstName").value;
	var lastName = document.getElementById("contactLastName").value;
	var phone = document.getElementById("contactPhone").value;
	var email = document.getElementById("contactEmail").value;

	var jsonPayload = '{"oldFirst" : "' + localStorage.getItem("firstName") + '", "oldLast" : "' + localStorage.getItem("lastName") + '","firstName" : "' + firstName + '", "lastName" : "' + lastName + '","phone" : "' + phone + '", "email" : "' + email + '", "userID" : ' + localStorage.getItem("userID") + '}';	
	var url = urlBase + '/UpdateContact.' + extension;
	
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
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};

		xhr.send(jsonPayload);
	
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
	
	
}	
