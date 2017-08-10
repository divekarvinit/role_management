var jsonList = {

	"users":[
		{"userId":"vinit", "firstName":"Vinit", "lastName": "Divekar" ,"emailId":"v@d.com"},
		{"userId":"ed", "firstName":"Edward", "lastName": "Ahn" ,"emailId":"e@a.com"},
		{"userId":"john", "firstName":"John", "lastName": "Doe" ,"emailId":"j@d.com"},
	]
};

$(document).ready(function(){

	populateUserDropDown();
	registerUserDropDownChangeEvent();

});

function populateUserDropDown(){

	console.log('In the ready function');
	var userDropDown = $('.user-dropdown');
	userDropDown.append('<option value="0">' + '--- Select User ---' + '</option>');
	$.each(jsonList.users, function(){
		userDropDown.append('<option value = "' + this.userId + '">' + this.firstName + " " + this.lastName + '</option>');
	});

}

function registerUserDropDownChangeEvent(){

	$(".user-dropdown").change(function(){

		var selectedDropDown = this.value;
		if(selectedDropDown != "0") {
			$.each(jsonList.users, function(){
				if(selectedDropDown == this.userId) {
					$('#userid').val(this.userId);
					$('#emailid').val(this.emailId);
					$('#firstName').val(this.firstName);
					$('#lastName').val(this.lastName);
					return false;
				}
			});
		}
	});
}