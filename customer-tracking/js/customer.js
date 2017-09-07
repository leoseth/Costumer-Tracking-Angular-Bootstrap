var app = angular.module('myapp', []);
app.controller("customercontroller", function ($scope, $http,$rootScope) {
    console.log("success");

    $scope.rfidcodekeypress = function (keycode) {
        if (keycode == 13) {       
            angular.element("#customerid").focus();
        }        
    }
    $scope.rfidcodekeyup = function (keycode) {       
        if (keycode == 40) {
            angular.element("#customerid").focus();
        }
    }

    $scope.custidkeypress = function (keycode) {
        if (keycode == 13) {         
            angular.element("#custtype").focus();
        }
    }
    $scope.custidkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#rfidcode").focus();
        }
        if (keycode == 40) {            
            angular.element("#custtype").focus();
        }
    }

    $scope.custtypechange = function ($event) {
        alert("companname");
        angular.element("#companyname").focus();
    }    
    $scope.custtypekeyup = function (keycode) {
        if (keycode == 38) {
            alert("customer id");
            angular.element("#customerid").focus();
        }
        if (keycode == 40) {
            alert("companname");
            angular.element("#companyname").focus();
        }
    }

    $scope.compkeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#lastname").focus();
        }
    }
    $scope.compkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#custtype").focus();
        }
        if (keycode == 40) {
            angular.element("#lastname").focus();
        }
    }
    
    $scope.lastkeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#firstname").focus();
        }
    }
    $scope.lastkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#companyname").focus();
        }
        if (keycode == 40) {            
            angular.element("#firstname").focus();
        }
    }
    
    $scope.firstkeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#middlename").focus();
        }
    }
    $scope.firstkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#lastname").focus();
        }
        if (keycode == 40) {
            angular.element("#middlename").focus();
        }
    }

    $scope.middlekeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#address").focus();
        }
    }
    $scope.middlekeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#firstname").focus();
        }
        if (keycode == 40) {
            angular.element("#address").focus();
        }
    }

    $scope.addresskeyup = function () {
        if(keycode==38){
            angular.element("#middlename").focus();
        }
        if (keycode==40) {
            angular.element("#phonenum").focus();
        }
    }

    $scope.phonenumkeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#mobilenum").focus();
        }
    }
    $scope.phonenumkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#address").focus();
        }
        if (keycode == 40) {
            angular.element("#mobilenum").focus();
        }
    }

    $scope.mobilenumkeypress = function (keycode) {
        if (keycode == 13) {
            angular.element("#emailadd").focus();
        }
    }
    $scope.mobilenumkeyup = function (keycode) {
        if (keycode == 38) {
            angular.element("#phonenum").focus();
        }
        if (keycode == 40) {
            angular.element("#emailadd").focus();
        }
    }        
});