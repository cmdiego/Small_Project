// JavaScript for Group 28's Small Project
// COP4331: Fall 2020
// JS written by Christy Wilhite
// Credit to Dr. Leinecker for some aspects of this code

var urlBase = 'http://thisisgroup28.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var login = "";
var firstName = "";
var lastName = "";


function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	
	document.getElementById("loginResult").innerHTML = "";

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
	login = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var confirm = document.getElementById("loginPasswordConfirm").value;
	
	document.getElementById("signupResult").innerHTML = "";
	
	// check to see if any fields are empty
    if (login.value === null || login === "") {
        document.getElementById("signupResult").innerHTML = "All fields must be entered";
        // using this to show the user the message for a few seconds but not working here
        setTimeout(() => { console.log("waiting for user to read message!"); }, 4000);
        return;
    }

     if (password.value === null || password === "") {
        document.getElementById("signupResult").innerHTML = "All fields must be entered";
        setTimeout(() => { console.log("waiting for user to read message!"); }, 4000);
        return;
    }
    
    if (confirm.value === null || confirm === "") {
        document.getElementById("signupResult").innerHTML = "All fields must be entered";
        setTimeout(() => { console.log("waiting for user to read message!"); }, 4000);
        return;
    }
    
	var result = password.localeCompare(confirm);

	if (result !== 0) {

		document.getElementById("signupResult").innerHTML = "Passwords do not match";
		// still looking for a function to pause the message to user before returning
		// but unable to find anything that works so far
		return;
	}

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/SignUp.' + extension;

	var xhr = new XMLHttpRequest();
	
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
	
		var jsonObject = JSON.parse( xhr.responseText );
	    userId = jsonObject;
        saveCookie();
        
        // contact is automatically logged in when cookie is saved, so go to home page
		window.location.href = "contacts-home.html";
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
	document.cookie = "login=" + login + ",userId=" + userId + ";expires=" + date.toGMTString();
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
		if( tokens[0] == "login" )
		{
			login = tokens[1];
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
		return userId;
	}
}

function doLogout()
{
	userId = 0;
	login = "";
	document.cookie = "login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
    
    // collect user input
	var newFirstName = document.getElementById("contactFirstName").value;
	var newLastName = document.getElementById("contactLastName").value;
	var newPhone = document.getElementById("contactPhone").value;
	var newEmail = document.getElementById("contactEmail").value;


	// check to see if any fields are empty
    if (newFirstName.value === null || newFirstName === "") {
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered";
        return;
    }

    if (newLastName.value === null || newLastName === "") {
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered";
        return;
    }
    
    if (newPhone.value === null || newPhone === "") {
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered";
        return;
    }
    
    if (newEmail.value === null || newEmail === "") {
        document.getElementById("contactAddResult").innerHTML = "All fields must be entered";
        return;
    }
	
	// get user ID from the cookie
	var userId = readCookie();
	
	// if user is not logged in right, return to login page
	if (userId === 0){
	    window.location.href = "index.html";
	    return;
	}

	document.getElementById("contactAddResult").innerHTML = "";
	
	// prepare JSON array and API address to send package
	var jsonPayload = '{"firstName" : "' + newFirstName + '", "lastName" : "' + newLastName + '", "phone" : "' + newPhone + '", "email" : "' + newEmail + '", "ID" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	// create request
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
				document.getElementById("contactAddResult").innerHTML = "Contact has been added. <br> You can add another contact or go back home.";
			}
		};

		xhr.send(jsonPayload);
		
		// reset form so that user can add another contact
		document.getElementById("userInput").reset();
		
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}	

function searchContacts()
{

    // collect user input
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	
	var userID = readCookie();
	
	document.getElementById("contactSearchResult").innerHTML = "";

    // create JSON payload and API address
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
				    
				    // add rows and cells to table with contact information
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

function deleteContact(index, userId)
{
	
    var resultsTable = document.getElementById('searchResults');
    
    // get contact info from search results table
    var results = resultsTable.rows[index].cells[0].innerHTML;
    // split contact results string and store first and last name into an array
    var arr = results.split(" ", 2);
    
    // user must confirm before deleting contact
    var c = confirm("You are deleting " + arr[0] + " " + arr[1] + " from your contacts.");
    if (c == false)
    {
        return;
    }
    
	document.getElementById("contactSearchResult").innerHTML = "";
	
	// create json payload and API address
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
				document.getElementById("contactSearchResult").innerHTML = "Contact has been deleted";
			}

		};

		xhr.send(jsonPayload);
		
		// clear table, let db update the deletion and show new search results
		clearTable();
		setTimeout(() => { console.log("waiting for DB to update!"); }, 1000);
		setTimeout(() => { console.log("waiting for DB to update!"); }, 1000);
	    searchContacts();
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

// used to package a single contact's info for use between html pages
function packageModifyInfo(index, userId)
{
    // get contact info from search results table and split string
    var resultsTable = document.getElementById('searchResults');
    var results = resultsTable.rows[index].cells[0].innerHTML;
    var arr = results.split(" ", 4);
    
    // store this single contact's info in local storage in order to access it on another webpage
    localStorage.setItem("firstName", arr[0]);
    localStorage.setItem("lastName", arr[1]);
    localStorage.setItem("phone", arr[2]);
    localStorage.setItem("email", arr[3]);
    
    localStorage.setItem("userID", userId);
    
    // navigate to the update contact page after info stored in local storage
    window.location.href = "update-contact.html";
}

// places contact info as placeholders on the update-contact.html page
function displayContactInfo()
{
    document.getElementById("contactFirstName").placeholder = localStorage.getItem("firstName");
    document.getElementById("contactLastName").placeholder = localStorage.getItem("lastName");
    document.getElementById("contactPhone").placeholder = localStorage.getItem("phone");
    document.getElementById("contactEmail").placeholder = localStorage.getItem("email");
}

function modifyContact()
{
	document.getElementById("contactUpdateResult").innerHTML = "";
	
	// collect user input
	var firstName = document.getElementById("contactFirstName").value;
	var lastName = document.getElementById("contactLastName").value;
	var phone = document.getElementById("contactPhone").value;
	var email = document.getElementById("contactEmail").value;

    // create JSON payload and API address
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

// clears search results table since new searches append the table unless cleared
function clearTable()
{
    var table = document.getElementById('searchResults');
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
        table.deleteRow(0);
    }
}
