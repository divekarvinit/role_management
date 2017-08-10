var ID_COSNTANT_BUDGET_DROP_DOWN = "bud_dd_";
var ID_COSNTANT_SVR_DROP_DOWN = "svr_dd_";
var ID_COSNTANT_HR_DROP_DOWN = "hr_dd_";

var jsonList = {

	"users":[
		{"userId":"vinit", "firstName":"Vinit", "lastName": "Divekar" ,"emailId":"v@d.com"},
		{"userId":"ed", "firstName":"Edward", "lastName": "Ahn" ,"emailId":"e@a.com"},
		{"userId":"john", "firstName":"John", "lastName": "Doe" ,"emailId":"j@d.com"},
	]
};

var budgetRoleList = {

	"budgetRoles":[
		{"id":"budgetRole1", "name":"Budget Role 1"},
		{"id":"budgetRole2", "name":"Budget Role 2"},
		{"id":"budgetRole3", "name":"Budget Role 3"},
	]
};

var svrRoleList = {

	"svrRoles":[
		{"id":"svrRole1", "name":"Svr Role 1"},
		{"id":"svrRole2", "name":"Svr Role 2"},
		{"id":"svrRole3", "name":"Svr Role 3"},
	]
};

var hrRoleList = {

	"hrRoles":[
		{"id":"hrRole1", "name":"Hr Role 1"},
		{"id":"hrRole2", "name":"Hr Role 2"},
		{"id":"hrRole3", "name":"Hr Role 3"},
	]
};

$(document).ready(function(){

	// Populate Drop downs

	populateUserDropDown();
	populateBudgetRoleDropDown();
	populateSvrRoleDropDown();
	populateHrRoleDropDown();

	// Register events

	registerUserDropDownChangeEvent();
	registerClickEvents();
	registerTableRowEvents();

});

function populateUserDropDown(){

	$('.user-dropdown').append('<option value="0">' + '--- Select User ---' + '</option>');
	$.each(jsonList.users, function(){
		$('.user-dropdown').append('<option value = "' + this.userId + '">' + this.firstName + " " + this.lastName + '</option>');
	});

}

function populateBudgetRoleDropDown(){

	var rowCount = getTableRowCount();
	
	$('#' + ID_COSNTANT_BUDGET_DROP_DOWN + (rowCount)).append('<option value="0">' + '--- Select Role ---' + '</option>');
	$.each(budgetRoleList.budgetRoles, function(){
		$('#' + ID_COSNTANT_BUDGET_DROP_DOWN + (rowCount)).append('<option value = "' + this.id + '">' + this.name + '</option>');
	});
}

function populateSvrRoleDropDown(){

	var rowCount = getTableRowCount();

	$('#' + ID_COSNTANT_SVR_DROP_DOWN + (rowCount)).append('<option value="0">' + '--- Select Role ---' + '</option>');
	$.each(svrRoleList.svrRoles, function(){
		$('#' + ID_COSNTANT_SVR_DROP_DOWN + (rowCount)).append('<option value = "' + this.id + '">' + this.name + '</option>');
	});
}

function populateHrRoleDropDown(){

	var rowCount = getTableRowCount();


	$('#' + ID_COSNTANT_HR_DROP_DOWN + (rowCount)).append('<option value="0">' + '--- Select Role ---' + '</option>');
	$.each(hrRoleList.hrRoles, function(){
		$('#' + ID_COSNTANT_HR_DROP_DOWN + (rowCount)).append('<option value = "' + this.id + '">' + this.name + '</option>');
	});
}

function registerUserDropDownChangeEvent(){

	$(".user-dropdown").change(function(){

		var selectedDropDownValue = this.value;
		if(selectedDropDownValue != 0) {
			populateUserForm(selectedDropDownValue);
		} else {
			removeUserForm();
		}
		
	});
}

function registerClickEvents(){

	// Register click even of Create User button

	$('#create-user').click(function(){

		// Change user selection to default value
		$(".user-dropdown option:eq(0)").prop("selected", true);

		// Create an empty user form
		populateEmptyUserForm();
	});
}

function registerTableRowEvents(){

	// Bind the focusout event of the text box in the table to whole DOM document

	$(document).on('focusout', '[name = "rc_text"]', function(){
		console.log('In the focus out event!!!');
		if($(this).val().trim() != '' && $(this).val().trim() != undefined && $(this).val().trim() != null) {
				createNewTableRow();
		}
	});
}

function populateUserForm(selectedDropDownValue){
	populateEmptyUserForm();
	insertValuesIntoEmptyUserForm(selectedDropDownValue);
}

function populateEmptyUserForm(){
	
	// First remove any previously selected
	removeUserForm();

	$('#user-action').after(function(){
		return'<div class="row" id="user-form">' + 
			'<div class="col-md-6">' +
				'<form class="user-form">' +
					'<div class="form-group">' +
						'<label for="userid">UserID</label>' +
						'<input type="text" class="form-control" id="userid" placeholder="UserId">' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="userid">Email address</label>' +
						'<input type="email" class="form-control" id="emailid" placeholder="Email">' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="userid">First Name</label>' +
						'<input type="email" class="form-control" id="firstName" placeholder="First Name">' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="userid">Last Name</label>' +
						'<input type="email" class="form-control" id="lastName" placeholder="Last Name">' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>';
	});
}

function insertValuesIntoEmptyUserForm(selectedDropDownValue){
	if(selectedDropDownValue != "0") {
			$.each(jsonList.users, function(){
				if(selectedDropDownValue == this.userId) {
					$('#userid').val(this.userId);
					$('#emailid').val(this.emailId);
					$('#firstName').val(this.firstName);
					$('#lastName').val(this.lastName);
					return false;
				}
			});
		}
}

function removeUserForm(){
	
	$('#user-form').remove();
}

function createNewTableRow() {
	$('#roles-table-body').append(function(){
		
		// Get total number of rows in the table
		var rowCount = getTableRowCount();

		return '<tr id="roles_' + (rowCount + 1) + '" name = "roles">' +
					'<td scope="row">' + 
						'<input type = "text" class="form-control" id = "rc_' + (rowCount + 1) + '" name = "rc_text" placeholder = "Enter RC">' +
					'</td>' +
					'<td>' +
						'<select id = "' + ID_COSNTANT_BUDGET_DROP_DOWN + (rowCount + 1) + '" class="form-control budget-dropdown" name= "budget_dd">' +
						'</select>' +
					'</td>' +
					'<td>' +
						'<select id = "' + ID_COSNTANT_SVR_DROP_DOWN + (rowCount + 1) + '" class="form-control svr-dropdown" name= "svr_dd">' +
						'</select>' +
					'</td>' +
					'<td>' +
						'<select id = "' + ID_COSNTANT_HR_DROP_DOWN + (rowCount + 1) + '" class="form-control hr-dropdown" name= "hr_dd">' +
						'</select>' +
					'</td>' + 
				'</tr>';
		});

		// Populate table drop downs.

		populateBudgetRoleDropDown();
		populateSvrRoleDropDown();
		populateHrRoleDropDown();
}

function getTableRowCount(){
	return $('#roles-table-body tr').length;
}

function saveData(){
	alert('Work in Progress!! :)');
}