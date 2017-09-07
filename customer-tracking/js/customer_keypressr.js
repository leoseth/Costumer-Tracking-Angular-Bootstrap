   
//// this is for customer keypress  /////
var app = angular.module('myapp', []);

//debugger;  this is serve as breakpoint
// $rootScope is a parent object of all $scope angular objects created in a web page //
// $scope is created with ng-controller while $rootscope is created with ng-app //
app.controller('customercontroller', function ($scope, $http, $rootScope) {   
    // this is $rootScope parameter to communicate with the carcontroller //
    $rootScope.$on('communication', function (event, data) {
        //$http({ method: 'GET', url: "/customer/retrieve" }).success(function (response) {    
        $http({ method: 'GET', url: 'customer.json' }).success(function (response) {
                dataresponse = [];
                dataresponse = response;
                console.log(response);
                currentstate = "connected";
                datapopulate();
        });                     
    });
    // this is $rootScope parameter to communicate with the carcontroller //    
       
    $scope.showcustomersearch     = false;                         
    $scope.showcustomertypeseacrh = false;
    //$scope.showcustomerlist     = false;
    $scope.showbirthday           = true;    
    //varrfidcode                   = document.getElementById("txtrfid")["value"];

    // this is to re-load the css styling and change the style of the these specific controls for customer//
    document.getElementById("Listedit").style.display           = "inherit";

    document.getElementById("lbledit").style.display            = "inherit";
    document.getElementById("lbleditcustid").style.display      = "inherit";
    document.getElementById("lblname").style.display            = "inherit";
    document.getElementById("lblfirst").style.display           = "inherit";
    document.getElementById("lblcomp").style.display            = "inherit";
    document.getElementById("lbltelname").style.display         = "inherit";
    document.getElementById("lblsearch").style.display          = "inherit";
    document.getElementById("customertype").style.display       = "inherit";
    document.getElementById("txtsearch").style.display          = "inherit";

    document.getElementById("confirmdiv").style.display         = "inherit";
    document.getElementById("carrefdropdownlist").style.display = "inherit";
    document.getElementById("demo").style.display               = "inherit";
    document.getElementById("demo2").style.display              = "inherit";
    document.getElementById("demo22").style.display             = "inherit";
    // this is to re-load the css styling and change the style of the these specific controls for customer//

    //$http({ method: 'GET', url: "/customer/retrieve", cache: true }).success(function (response) {
    $http({ method: 'GET', url: "customer.json", cache: true }).success(function (response) {
        $scope.val   = response.data;
        dataresponse = response;
                         
        introduction();

        disabledcustomertext();

        angular.element('#txtrfid').focus();
    });

    $scope.addcustomer = function (addcustomer) {        
        editdisabled();

        document.getElementById('nosearch')["value"] = "yes";        

        emptycustomertext();
        disabledcustomertext();
        
        setTimeout(function () {
            $scope.$apply(function () {
                $("#txtrfid").focus();
                adddemomessage();
            });
        }, 0);       
        return;
    }                                                                                         

    $scope.editcustomer = function (editcustomer) {
        $scope.showlbltelname  = false;
        currentstate = "edit";
        accesstype   = "editcust";

        edit_delete_styling();

            // this to remove the empty space on the ng-repeat listedit box after deleting record//
            if (emptyseacrh == "refresh_list") {
                 emptyseacrh = "empty";
            } else { emptyseacrh = "not empty"; }
            // this to remove the empty space on the ng-repeat listedit box after deleting record//

        retrieve();
        compstr = "";
        editenter();
    }

    $scope.deletecustomer = function (deletecustomer) {
        $scope.showlbltelname  = false;
        currentstate = "delete";
        accesstype   = "deletecust";

        edit_delete_styling();

            // this to remove the empty space on the ng-repeat listedit box after deleting record//
            if (emptyseacrh == "refresh_list") {
                emptyseacrh = "empty";
            } else { emptyseacrh = "not empty"; }
            // this to remove the empty space on the ng-repeat listedit box after deleting record//

        retrieve();
        compstr = "";
        editenter();
    }

    $scope.viewcustomer = function (viewcustomer) {
        //$scope.showcustomerlist = false;
        $scope.showlbltelname   = true;
        currentstate = "view";
        accesstype   = "viewcust";

        viewstyling();        

        // this to remove the empty space on the ng-repeat listedit box after deleting record//
        if (emptyseacrh == "refresh_list") {
            emptyseacrh = "empty";
        } else { emptyseacrh = "not empty"; }
        // this to remove the empty space on the ng-repeat listedit box after deleting record//

        retrieve();
        compstr = "";
        editenter();
    }  

    // right padding s with c to a total of n chars for customer
    function padding_right(s, c, n) {
        // this is to give the value with the response data field if the response data is empty//
        if (s == "") { s = '\u00A0', 2; }
        // this is to give the value with the response data field if the response data is empty//

        if (!s || !c || s.length >= n) {            
            return s;
        }
        var max = (n - s.length) / c.length;        
        for (var i = 0; i < max; i++) {
             s += c;
        }
        return s;
    }
    // right padding s with c to a total of n chars for customer

    function retrieve() {       
        // by removing "cache : true" in the $http service GET method it can re-access the server side{ //
        // customer is the prefix of the customerController

        //$http({ url: "/customer/retrieve", method: 'GET'}).success(function (response) {
        $http({ url: "customer.json", method: 'GET' }).success(function (response) {
        // by removing "cache : true" in the $http service GET method it can re-access the server side{ //                        

            /// this is to empty the ListBoxview and the listedit select control ///
            if (emptyseacrh == "empty" && accesstype == "viewcust") {               
                $('#Listedit').find('option').remove();
            }
            if (emptyseacrh == "empty") { $('#Listedit').find('option').remove(); }
            /// this is to empty the ListBoxview and the listedit select control ///

            var responsedata = [];
            var editcust     = [];  /// this is an array for the customer

            if (accesstype == "viewcust") {                    
                var count  = 21;
                var count2 = 21;
                var count3 = 21;
                var count4 = 31;
                var count5 = 18;
                var count6 = 17;        
            } else {
                var count = 20;                
                var compcount = 20;
            }            

            for (var i = 0; i < response.length ; i++) {
                
                if (compstr == 'Company') {
                    if (accesstype == "viewcust") {                                                                       
                        if (response[i].custtype == "Company"){
                            editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', count2) + padding_right(response[i].compname, '\u00A0', count3) + padding_right(response[i].phone_num, '\u00A0', count4) + padding_right(response[i].mobile_num, '\u00A0', count5) + padding_right(" ", '\u00A0', count6));
                        }
                    } else {
                        if (response[i].custtype == "Company") {                           
                            var a = response[i].compname;
                            editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', compcount) + a);
                        }
                    }                    
                }

                if (compstr == 'Individual') {
                    if (accesstype == "viewcust") {
                        if (response[i].custtype == "Individual") {
                            editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', count2) + padding_right(response[i].compname, '\u00A0', count3) + padding_right(response[i].phone_num, '\u00A0', count4) + padding_right(response[i].mobile_num, '\u00A0', count5) + padding_right(" ", '\u00A0', count6));
                        }
                    } else {
                        if (response[i].custtype == "Individual") {                           
                            var a = response[i].compname;
                            editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', compcount) + a);
                        }
                    }
                }

                if (compstr == '') {

                    if (accesstype == "viewcust") {                       
                        editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', count2) + padding_right(response[i].compname, '\u00A0', count3) + padding_right(response[i].phone_num, '\u00A0', count4) + padding_right(response[i].mobile_num, '\u00A0', count5) + padding_right(" ", '\u00A0', count6));                        
                    } else {                        
                        var a = response[i].compname;
                        editcust.push(padding_right(response[i].custnum, '\u00A0', 20) + padding_right(response[i].lastname, '\u00A0', count) + padding_right(response[i].firstname, '\u00A0', compcount) + a);
                    }                    
                }
            }           
                $scope.val                    = editcust;
                dataresponse                  = response;
              
                if (accesstype == "viewcust") {
                    $scope.showcustomerlist = true;
                    viewposition();                    
                } else {
                    $scope.showcustomerlist = true;
                    editposition();
                }                
                $scope.showeditborder         = true;
                $scope.showcustomer           = true;
                $scope.showlastname           = true;
                $scope.showfirstname          = true;
                $scope.showcompanyname        = true;
                $scope.showsearch             = true;
                $scope.showcustomertypeseacrh = true;                                   
                $scope.showcustomersearch     = true;                
                                
                $scope.customersearch         = [];
                $scope.showrequired           = false;

                document.getElementById("customertype")['value'] = "";

                if (accesstype == "viewcust") {
                    angular.element("#Listedit").focus();
                    if ($scope.customertypeseacrh != undefined) {
                        if ($scope.customertypeseacrh != "") {
                            $scope.customertypeseacrh = $scope.customertypeseacrh;
                            searchfocus = "focus";
                            custsearchenter();
                        }
                    }
                } else {
                    angular.element("#Listedit").focus();
                    if ($scope.customertypeseacrh != undefined) {
                        if ($scope.customertypeseacrh != "") {
                            $scope.customertypeseacrh = $scope.customertypeseacrh;
                            searchfocus = "focus";
                            custsearchenter();
                        }              
                    } 
                }

                /// this is to focus the seacrh box ///
                document.getElementById('customertype')['value'] = compstr;
                angular.element('#txtsearch').focus();             
                /// this is to focus the seacrh box ///

                /// this is to empty the ListBoxview and the listedit select control ///
                if (emptyseacrh == "empty" && accesstype == "viewcust") {
                    $('#Listedit').find('option').remove();
                }
                if (emptyseacrh == "empty") { $('#Listedit').find('option').remove(); }
                /// this is to empty the ListBoxview and the listedit select control ///                
        });                                
        return;
    }    
     
    $scope.editcustkeyup = function (keyCode) {
        if (keyCode == 38) {
            angular.element("#Listedit").focus();
        }
        if (keyCode == 40) {
            angular.element("#Listedit").focus();
        }
    }

    $scope.deletecustkeyup = function (keyCode) {
        if (keyCode == 38) {
            angular.element("#Listedit").focus();
        }
        if (keyCode == 40) {
            angular.element("#Listedit").focus();
        }
    }

    $scope.viewcustkeyup = function (keyCode) {
        if (keyCode == 38) {
            angular.element("#Listedit").focus();
        }
        if (keyCode == 40) {
            angular.element("#Listedit").focus();
        }
    }

    /// This is to convert from 'mm-dd-yyyy(10-28-2016)' format to 'yyyy-mm-dd(2016-10-28)' format for customer ///
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day   = '' + d.getDate(),
            year  =      d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2)   day   = '0' + day;

        return [year, month, day].join('-');
    }
    /// This is to convert from 'mm-dd-yyyy(10-28-2016)' format to 'yyyy-mm-dd(2016-10-28)' format /// 

    $scope.listeditkeycode = function (keyCode) {
        $scope.showdemo2   = false;
        if (keyCode == 13) {
            datapopulate();            
        }       
    }
    $scope.listeditkeycode2 = function () {
        if (window.event.toElement.nodeType == 1) {
            datapopulate();
        }
    }   

    function datapopulate() {       
        if (currentstate == "edit" || currentstate == "view" || currentstate == "connected") {
            if (currentstate == "edit") { var datafiltered = document.getElementById("Listedit")['value'].slice(0, 17);}
            if (currentstate == "view") { var datafiltered = document.getElementById("Listedit")['value'].slice(0, 17);}
            if (currentstate == "connected") { var datafiltered = varcustnum }
            for (var i = 0; i < dataresponse.length ; i++) {
                for (var i = 0; i < dataresponse.length ; i++) {
                    if (dataresponse[i].custnum == datafiltered) {
                             $scope.rfid              = dataresponse[i]["rfid_code"];
                             $scope.telephonenumber   = dataresponse[i]["phone_num"];
                             $scope.address           = dataresponse[i]["address"];                             
                             document.getElementById('txtbirthday')['value']  = formatDate(dataresponse[i]["birthday"].slice(0, 9));
                             document.getElementById('txtbirthday2')['value'] = dataresponse[i]["birthday"].slice(0, 9);
                             $scope.birthplace        = dataresponse[i]["birthplace"];
                             $scope.companyname       = dataresponse[i]["compname"];
                             $scope.customerid        = dataresponse[i]["custnum"];
                             $scope.customerid2       = dataresponse[i]["custnum"];
                             $scope.customertype      = dataresponse[i]["custtype"];                      
                             document.getElementById('txtemailadd')['value'] = dataresponse[i]["email_add"];
                             $scope.firstname         = dataresponse[i]["firstname"];
                             $scope.idnumber          = dataresponse[i]["idnum"];
                             $scope.idtype            = dataresponse[i]["idtype"];
                             $scope.lastname          = dataresponse[i]["lastname"];
                             $scope.middlename        = dataresponse[i]["middlename"];
                             document.getElementById('txtmobilenum')['value'] = dataresponse[i]["mobile_num"];
                             $scope.nationality       = dataresponse[i]["nationality"];
                             edit2 = "EDIT";
                             $scope.showdemo2         = false;
                             $scope.showcarreferences = true;
                             $scope.showdemo          = false;
                             retrieveplate();
                        // this is a variable to be use in the car information //
                        varrfidcode   = $scope.rfid;
                        varcustnum    = $scope.customerid;
                        // this is a variable to be use in the car information //

                        //this is to filled-up the remaining customer information //
                        if (document.getElementById("txtmobilenum")['value'] == "" || document.getElementById("txtlastname")['value'] == "") {                            
                            document.getElementById('txtrfid')['value'] = dataresponse[i]["rfid_code"];                                                                                  
                        }
                        // this is to filled-up the remaining customer information //
                        editdisabled();
                    }                             }
            }
        } else {
            if (currentstate = "delete") {     
                var confirmation = window.confirm("Are you sure you want to DELETE this customer record?");
                    if (confirmation == true) {
                        var x = document.getElementById("Listedit");
                        x.remove(x.selectedIndex);
                        alert("successfully deleted");
                    }                                  
            }
        }            
    }
    
    // to retrieve all platenumbers from car the table for all the customer.rfidcode equal to car.rfidcode //
    function retrieveplate() {
        var vrfid_code = { 'rfid_code': $scope.rfid };
        //$http({ url: '/customer/retrievecar', method: "POST", data: JSON.stringify(vrfid_code), dataType: 'json', headers: { 'Content-Type': 'application/json' } }).success(function (response) {
        $http({ url: 'car.json', method: "GET"}).success(function (response) {
            var varplatenum = [];
            for (var x = 0; x < response.length; x++) {
                if (response[x].rfid_code == $scope.rfid) {
                    varplatenum.push(response[x].platenum);
                }                       
            }
            $scope.vplatenum = varplatenum;            
        });                                                                                                    
        return;
    }
    // to retrieve all platenumbers from car the table for all the customer.rfidcode equal to car.rfidcode //

    //  car plate no. references change //
    $scope.carefchange = function () {
        if ($scope.carreferences != "") {
            var vfilteredplate = { 'platenum': $scope.carreferences };
            //$http({ url: '/customer/retrievecar2', method: "POST", data: JSON.stringify(vfilteredplate), dataType: 'json', headers: { 'Content-Type': 'application/json' } }).success(function (response_value) {            
            $http({ url: 'car.json', method: "GET"}).success(function (response) {                           

                var response_value = [];
                for (var x = 0; x < response.length; x++) {
                    if (response[x].platenum == $scope.carreferences) {
                        response_value.push(response[x].platenum);
                        response_value.push(response[x].make);
                        response_value.push(response[x].model);
                        response_value.push(response[x].regnum);
                        response_value.push(formatDate(response[x].regdate.slice(0, 9)));
                        response_value.push(response[x].color);
                        response_value.push(response[x].chasisnum);
                        response_value.push(response[x].enginenum);
                        break;
                    }
                }
                console.log(response_value);
                // this is to connect with the car controller //
                $rootScope.$emit('connectcarcontroller', response_value);
                // this is to connect with the car controller //
                
                // this is to connect with the transactions controller //
                var vfilteredplate2 = { 'platenum': $scope.carreferences };
                $rootScope.$emit('connecttranscontroller', $scope.carreferences);
                // this is to connect with the transactions controller //
            });
           
        }             
    }
    //  car plate no. references change //
    
    // this to clear the listboxview and listedit from the customer module //
    $(document).keyup(function (escapecustomer) {
        if (escapecustomer.keyCode == 27) {
            $scope.$apply(function () {
                $scope.showcustomerlist  = false;  $scope.showsearch             = false;
                $scope.showeditborder    = false;  $scope.showcustomertypeseacrh = false;
                $scope.showcustomer      = false;  $scope.showcustomersearch     = false;
                $scope.showlastname      = false;  $scope.customertypeseacrh     = [];
                $scope.showfirstname     = false;  $scope.showrequired           = true;
                $scope.showcompanyname   = false;  $scope.showdemo               = false;
                $scope.showlbltelname    = false;
                $scope.showdemo2         = false;
            });            
        }
    });   
    // this to clear the listboxview and listedit from the customer module //

    function keyUP() {
        var connect = document.getElementById('sdt');
        connect.click();
    }

    $scope.telnokeypress = function (evt) {
        if (evt.keyCode >= 60 && evt.keyCode != 13) {
            alert('invalid, because this is a numeric data type please re-type');
        }
        else {
            if (document.getElementById('txttelno').value.length >= 10 && evt.keyCode !=13) {
                if (document.getElementById('txttelno')['value'].substring(0, 1) != "(") {
                   
                    //alert('you have exceeded the 10 digits limit, please re-type');

                    vtelephonestr = document.getElementById('txttelno')['value'];
                    document.getElementById('txttelno')['value'] = "";
                    document.getElementById('txttelno')['value'] = vtelephonestr.substring(0, 10);

                    document.getElementById('txttelno').focus();
                    telephonefilter();
                }
            }
            else {
                keyCode = evt.keyCode;
            }
        }
    }

    $scope.telnokeyup = function (keyCode) {
        if (keyCode == "38") {
            document.getElementById('txtaddress').focus();
        }
        if (keyCode == "40" || keyCode == "13") {
            telephonefilter();
        }
    }

    function telephonefilter() {
          vtelstr3 = document.getElementById('txttelno')['value'];
          if (document.getElementById('txttelno').value.length < 7) {
                 alert('invalid input, your lower than 7 digits please double check');
                 document.getElementById('txttelno').focus()
          }                
          else {
                 if (document.getElementById('txttelno').value.length == 7) {
                     vtelstrcom2 = vtelstr3.slice(-7, -4);
                     vtelstrcom3 = vtelstr3.substring(document.getElementById('txttelno').value.length - 4);
                     document.getElementById('txttelno')['value'] = "(" + "   " + ")" + "-" + vtelstrcom2 + "-" + vtelstrcom3;
                     document.getElementById('txtmobilenum').focus();
                 }

                 if (document.getElementById('txttelno').value.length == 8) {
                     vtelstrcom1 = vtelstr3.slice(-10, -7);
                     vtelstrcom2 = vtelstr3.slice(-7, -4);
                     vtelstrcom3 = vtelstr3.slice(-4);

                     document.getElementById('txttelno')['value'] = "(" + "  " + vtelstrcom1 + ")" + "-" + vtelstrcom2 + "-" + vtelstrcom3;
                     document.getElementById('txtmobilenum').focus();
                 }

                 if (document.getElementById('txttelno').value.length == 9) {
                     vtelstrcom1 = vtelstr3.slice(-10, -7);
                     vtelstrcom2 = vtelstr3.slice(-7, -4);
                     vtelstrcom3 = vtelstr3.slice(-4);

                     document.getElementById('txttelno')['value'] = "(" + " " + vtelstrcom1 + ")" + "-" + vtelstrcom2 + "-" + vtelstrcom3;
                     document.getElementById('txtmobilenum').focus();
                 }

                 if (document.getElementById('txttelno').value.length == 10) {

                     vtelstrcom1 = vtelstr3.slice(-10, -7);
                     vtelstrcom2 = vtelstr3.slice(-7, -4);
                     vtelstrcom3 = vtelstr3.slice(-4);

                     document.getElementById('txttelno')['value'] = "(" + vtelstrcom1 + ")" + "-" + vtelstrcom2 + "-" + vtelstrcom3;
                     document.getElementById('txtmobilenum').focus();
                  }

                  if (document.getElementById('txttelno').value.length == 11) {

                      vtelstrcom1 = vtelstr3.slice(-11, -8);
                      vtelstrcom2 = vtelstr3.slice(-8, -5);
                      vtelstrcom3 = vtelstr3.slice(-5, -1);

                      document.getElementById('txttelno')['value'] = "(" + vtelstrcom1 + ")" + "-" + vtelstrcom2 + "-" + vtelstrcom3;
                      document.getElementById('txtmobilenum').focus();
                  }

                  if (document.getElementById('txttelno').value.length >= 14) {
                      document.getElementById('txtmobilenum').focus();
                  }
                      txtmobilenumfocus();
             }
    }    

    function txtmobilenumfocus() {
        setCursorPositionToEnd('txtmobilenum');
    }

    $scope.lastnamekeypressed = function (evt) {
        if (evt.keyCode <= 59 && evt.keyCode != 13) {
            alert('invalid input');
        }
    }

    $('input[type="text"]').keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $('input[type="Date"]').keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $scope.txtOnKeyPress2 = function (txt3) {
        if (txt3.keyCode <= 59 && txt3.keyCode != 13) {
            alert('invalid input');
        }
    }

    $scope.compkeyup = function (keyCode) {
        if (keyCode == 13) {
            angular.element('#txtlastname').focus();
        }
        if (keyCode == 38) {
            angular.element('#customtype').focus();
        }
        if (keyCode == 40) {
            angular.element('#txtlastname').focus();
        }
    }

    $scope.covertcompname = function (compname) {
        var vccompname = document.getElementById('txtcompname').value.toUpperCase();
        document.getElementById('txtcompname')["value"] = vccompname;
    }

    $scope.convertlast = function (lname) {
        var cnvlast = document.getElementById('txtlastname').value.toUpperCase();
        document.getElementById('txtlastname')["value"] = cnvlast;
    }
    
    $scope.convertidnumber = function (cidnumber) {
        var cnvidnumber = document.getElementById('txtidnumber').value.toUpperCase();
        document.getElementById('txtidnumber')["value"] = cnvidnumber;
    }

    $scope.lastkeyup = function (keyCode) {
        if (keyCode == 13) {
            angular.element('#txtfirstname').focus();
        }
        if (keyCode == 38) {
            angular.element('#txtcompname').focus();
        }
        if (keyCode == 40) {
            angular.element('#txtfirstname').focus();
        }
    }

    $scope.convertfirst = function (fname) {
        var cnvfirst = document.getElementById('txtfirstname').value.toUpperCase();
        document.getElementById('txtfirstname')["value"] = cnvfirst;
    }

    $scope.firstnamekeypress = function (evt) {
        if (evt.keyCode <= 59 && evt.keyCode != 13) {
            alert('invalid input');
        }
    }

    $scope.firstnamekeyup = function (keyCode) {
        if (keyCode == 13) {
            angular.element('#txtmiddlename').focus();
        }
        if (keyCode == 38) {
            angular.element('#txtlastname').focus();
        }
        if (keyCode == 40) {
            angular.element('#txtmiddlename').focus();
        }
    }

    $scope.convertaddress = function (addr) {
        var cnvaddr = document.getElementById('txtaddress').value.toUpperCase();
        document.getElementById('txtaddress')["value"] = cnvaddr;
    }    

    $scope.addresskeyup = function (keyCode) {
        if (keyCode == 38) {
            angular.element('#txtmiddlename').focus();
            txttelnofocus();
        }
        if (keyCode == 40) {
            angular.element('#txttelno').focus();
            $scope.lbltel_show  = true;
            //$scope.lbltel_model = "Please type the phone number including the areacode";
            document.getElementById("lbltel").innerText = "Please type the phone"+
                                                          " number including the "+
                                                          " areacode";
            txttelnofocus();
        }
    }

    function txttelnofocus() {
        setCursorPositionToEnd('txttelno');
    }

    $scope.convertmiddle = function (mname) {
        var cnvmiddle = document.getElementById('txtmiddlename').value.toUpperCase();
        document.getElementById('txtmiddlename')["value"] = cnvmiddle;
    }

    $scope.middlenamekeypress = function (evt) {
        if (evt.keyCode <= 59 && evt.keyCode != 13) {
            alert('invalid input');
        }
    }

    $scope.middlenamekeyup = function (keyCode) {
        if (keyCode == 13) {
            angular.element('#txtaddress').focus();
        }
        if (keyCode == 38) {
            angular.element('#txtfirstname').focus();
        }
        if (keyCode == 40) {
            angular.element('#txtaddress').focus();
        }
    }

    $scope.mobilekeypress = function (mobile) {
        if (mobile.keyCode >= 60 && mobile.keyCode != 13) {
            alert('Invalid because this is a numeric data');
        }
    }

    $scope.mobilekeyup = function (keyCode) {
        if (keyCode == 38) {
            angular.element('#txttelno').focus();
        }
        if (keyCode == 40) {
            angular.element('#txtemailadd').focus();
            txtemailaddfocus();
        }
        if (keyCode == 13) {
            angular.element('#txtemailadd').focus();
            txtemailaddfocus();
        }
    }

    function txtemailaddfocus() {
        setCursorPositionToEnd('txtemailadd');
    }

    $scope.emailaddkeyup = function (keyCode) {
        if (keyCode == 38) {
            document.getElementById('txtmobilenum').focus();
        }
        if (keyCode == 40) {          
            if (edit2 == "EDIT") {
                document.getElementById('txtbirthday').focus();
            }
            if (edit2 == "") {
                $scope.showbirthday2 = false;
                document.getElementById('txtbirthday').focus();
                txtbirthdayfocus();
            }
        }
        if (keyCode == 13) {
            if (edit2 == "EDIT") {
                document.getElementById('txtbirthday').focus();
            }
            if (edit2 == "") {
                document.getElementById('txtbirthday').focus();              
            }
        }
    }

    $scope.birthdaykeyup = function (keyCode) {
        if (keyCode == 38) {
            document.getElementById('txtemailadd').focus();
        }
        if (keyCode == 40) {
            document.getElementById('txtbirthplace').focus();
            txtbirthplacefocus();
        }
        if (keyCode == 13) {
            document.getElementById('txtbirthplace').focus();
            txtbirthplacefocus();
        }
    }

    function txtbirthplacefocus() {
        setCursorPositionToEnd('txtbirthplace');
    }

    $scope.birtplacekeyup = function (keyCode) {
        if (keyCode == 38) {
            if (edit2 == "EDIT") {
                document.getElementById('txtbirthday2').focus();
            }
            if (edit2 == "") {
                document.getElementById('txtbirthday').focus();
            }
        }
        if (keyCode == 40) {
            document.getElementById('txtnationality').focus();
            txtnationalityfocus();
        }
        if (keyCode == 13) {
            document.getElementById('txtnationality').focus();
            txtnationalityfocus();
        }
    }

    function txtnationalityfocus() {
        setCursorPositionToEnd('txtnationality');
    }

    $scope.convertbirthplace = function (cbirthplace) {
        var cnvbirthplace = document.getElementById('txtbirthplace').value.toUpperCase();
        document.getElementById('txtbirthplace')["value"] = cnvbirthplace;
    }

    $scope.convertnational = function (cnational) {
        var cntnational = document.getElementById('txtnationality').value.toUpperCase();
        document.getElementById('txtnationality')["value"] = cntnational;
    }

    $scope.nationalkeyup = function (keyCode) {
        if (keyCode == 38) {
            document.getElementById('txtbirthplace').focus();
        }
        if (keyCode == 40) {
            idtype();
            document.getElementById('sidtype').focus();
        }
        if (keyCode == 13) {
            idtype();
            document.getElementById('sidtype').focus();
        }
    }

    function sidtypefocus() {
        setCursorPositionToEnd('sidtype');
    }

    $scope.idtypekeyup = function (keyCode) {
        document.getElementById('skipload')["value"] = "skip_load";
        document.getElementById('hiddenclick')["value"] = "txtidnumber";
        if (keyCode == 38) {
            document.getElementById('txtnationality').focus();
        }
        if (keyCode == 40) {
            document.getElementById('txtidnumber').focus();
        }
        if (keyCode == 13) {
            document.getElementById('txtidnumber').focus();
            Funcidnumber();
        }
    }

    function Funcidnumber() {
        setCursorPositionToEnd('txtidnumber');
    }

    function notify() {
        var snd = new Audio("alert/notify.wav");
        snd.play();

        document.getElementById('hiddenfieldrfid')["value"] = "";

        var carref = document.getElementById("carrefdropdownlist").value;
        document.getElementById("carrefhidden").value = carref;

        var vclick = document.getElementById("btncaref2");
        vclick.click();
    }

    function sendSMStone() {
        var smstone = new Audio("alert/notify.wav");
        smstone.play();
    }

    $scope.idnumberkeyup = function (keyCode) {
       
        $scope.confirmdiv_show = true;        

        if (keyCode == 13) {
                document.getElementById("id_false").style.fontWeight = "normal";
                document.getElementById("id_true").style.fontWeight  = "Bold";
                document.getElementById('confirmed')['value']        = "yes";
                document.getElementById('no_option').value           = "";
                angular.element('#id_true').focus();          
        }        
    }   

    $scope.savingrec = function(keyCode) {
            if (keyCode == 13) {
                if (vconfirmed != "no") {
                    document.getElementById('confirmed')['value'] = "yes";
                    document.getElementById('no_option').value = "";
                    return;
                } else {
                    document.getElementById('no_option').value = "selected";
                    vgranted = "";
                    var vclick3 = document.getElementById('Button2');
                    vclick3.click();
                    return;
                }
            }
            if (keyCode == 37) {
                vconfirmed = 'yes';
                document.getElementById('no_option').value = "";
                document.getElementById('confirmed')['value'] = "yes";
                document.getElementById('id_true').focus();
            }            
            if (keyCode == 39) {
                vconfirmed = 'no';
                document.getElementById('no_option').value = "selected";
                document.getElementById('confirmed')['value'] = "";
                document.getElementById('id_false').focus();
            }
            return;
    }

    $scope.mousesave = function (mousesave) {     
        save();       
        return;
    }

    function save() {
        if (document.getElementById('txtidnumber')['value'] != "") {           
            var cust = {
                'rfid_code' : document.getElementById('txtrfid')["value"],       'phone_num'  : document.getElementById('txttelno')["value"],
                'address'   : document.getElementById('txtaddress')["value"],    'birthday'   : document.getElementById('txtbirthday')["value"],
                'birthplace': document.getElementById('txtbirthplace')["value"], 'compname'   : document.getElementById('txtcompname')["value"],
                'custnum'   : document.getElementById('txtcustid')["value"],     'custtype'   : document.getElementById('customtype')["value"],
                'email_add' : document.getElementById('txtemailadd')["value"],   'firstname'  : document.getElementById('txtfirstname')["value"],
                'idnum'     : document.getElementById('txtidnumber')["value"],   'idtype'     : document.getElementById('sidtype')["value"],
                'lastname'  : document.getElementById('txtlastname')["value"],   'middlename' : document.getElementById('txtmiddlename')["value"],
                'mobile_num': document.getElementById('txtmobilenum')["value"],  'nationality': document.getElementById('txtnationality')["value"]
            };
            //$.ajax({url: 'customer/save',type: 'POST', data: JSON.stringify(cust), dataType: 'json', contentType: "application/json", success: function (response) {
            $http({ url: 'customer.json', method: 'GET' }).success(function (response) {
                alert('This customer record cannot be save in the server side because this is for demo purpose only');
                customercust.push(cust.rfid_code);
                customercust.push(cust.phone_num);
                customercust.push(cust.address);
                customercust.push(cust.birthday);
                customercust.push(cust.birthplace);
                customercust.push(cust.compname);
                customercust.push(cust.custnum);
                customercust.push(cust.custtype);
                customercust.push(cust.email_add);
                customercust.push(cust.firstname);
                customercust.push(cust.idnum);
                customercust.push(cust.idtype);
                customercust.push(cust.lastname);
                customercust.push(cust.middlename);
                customercust.push(cust.mobile_num);
                customercust.push(cust.nationality);
                console.log(customercust);
                emptycustomertext();
                // to activate the ng-disabled it should write first in the $scope.$apply //
                disabledcustomertext();
                $scope.showcarreferences = false;
                // to activate the ng-disabled it should write first in the $scope.$apply //

                // this is how to refresh the select control //                    
                $scope.customertype = [];
                $scope.idtype = [];
                // this is how to refresh the select control //                   

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.confirmdiv_show = false;
                        angular.element("#txtrfid").focus();
                    });
                }, 0);
               
            }, function (failed) {               
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.confirmdiv_show = false;
                    });
                }, 0);

                alert('Failed to save records');
            });

            return;
        }
        else { alert('all fields are required'); }
    }

    function deleterecord() {    
        var cust = { 'custnum': document.getElementById("Listedit")['value'].slice(0, 17) };              

        $http({url: '/customer/delete',method: "DELETE",data: JSON.stringify(cust), dataType: 'json',headers: { 'Content-Type': 'application/json' }}).success(function (response) {            

                $scope.showcustomerlist = false;
                $scope.showeditborder = false;
                $scope.showcustomer = false;
                $scope.showlastname = false;
                $scope.showfirstname = false;
                $scope.showcompanyname = false;
                $scope.showsearch = false;
                $scope.showcustomertypeseacrh = false;
                $scope.showcustomersearch = false;
                $scope.customertypeseacrh = [];

                $scope.showrequired = true;

                editdisabled();
               
        }, function (failed) {
            alert('failed');
        });
        
        return;
    }    

    $scope.confirmdivkeyup = function (keyCode) {
        if (keyCode == 37) {
            document.getElementById("id_false").style.fontWeight = "normal";
            document.getElementById("id_true").style.fontWeight  = "Bold";
            angular.element('#id_true').focus();
        }
        if (keyCode == 38) {
            angular.element('#txtidnumber').focus();
            $scope.confirmdiv_show = false;
        }
        if (keyCode == 39) {
            document.getElementById("id_true").style.fontWeight = "normal";
            document.getElementById("id_false").style.fontWeight = "Bold";
            angular.element('#id_false').focus();
        }
        return;
    }

    $scope.mousecancel = function (mousecancel) {       
        $scope.confirmdiv_show = false;
        angular.element('#txtlastname').focus();
        return;
    }

    $scope.cancelrec = function (keyCode) {
        if (keyCode == 13) {
            $scope.confirmdiv_show = false;
            angular.element('#txtlastname').focus();
        }      
        return;
    }       
   
    function clickseacrh() {
        customertype.focus();
    }

    // this is to remove the empty space in the customer select control //
    $scope.mouseenter2 = function () {
        removeempty();
    }
    function removeempty() {
        var x = document.getElementById("Listedit");
        for (var i = 0; i < x.length; i++) {
            if (x[0].innerHTML == "") {
                x.selectedIndex = 0;
                x.remove(x.selectedIndex);
                break;
            }
        }
    }
    // this is to remove the empty space in the customer select control //

    $scope.mouseenter = function (mouseenter) {
        if (accesstype == "viewcust") {           
             angular.element('#Listedit').focus();
        } else {
             angular.element('#Listedit').focus();
        }
    }   

    $scope.customertypechange = function () {      
        emptyseacrh = "empty";
        compstr = $scope.customertypeseacrh;

        retrieve();        
    }

    $scope.fcustomtype = function () {
        if ($scope.customertype == "Individual") {
            $scope.showdemo = false;
            $scope.companyname = "";
            var a = document.getElementById('txtcompname');
            a.disabled = true;
            angular.element("#txtlastname").focus()            
        }
        if ($scope.customertype == "Company") {
            $scope.showdemo = false;
            var a = document.getElementById('txtcompname');
            a.disabled = false;
            angular.element("#txtcompname").focus()
        }       
    }
   
    $scope.fsidtype = function (csidtype) {
        $scope.showdemo = false;
        document.getElementById('txtidnumber').focus();
    }

    function SQLconnect() {
        var carref = document.getElementById("carrefdropdownlist").value;
        document.getElementById("carrefhidden").value = carref;

        var vclick = document.getElementById("btncaref");
        vclick.click();
    }

    function connectRFID_code() {
        document.getElementById('hiddenfieldrfid')["value"] = "";

        var carref = document.getElementById("carrefdropdownlist").value;
        document.getElementById("carrefhidden").value = carref;

        var vclick = documett.getElementById("btncaref2");
        vclick.click();
    }

    $scope.searchtext = function(keyCode) { /// this is subject for research
        if (keyCode == 40) {
            if (accesstype == "viewcust") {              
                angular.element('#Listedit').focus();
            } else {
                angular.element('#Listedit').focus();
            }
        }        
    }

    function dummyfunction() {
        document.getElementById('lblline3');
    }       

    function mssgrfid() {
        document.getElementById('carrefdropdownlist').innerText = "";

        alert('This RFID CODE exist in the database, please re-type and use a different rfid ');
        document.getElementById('txtrfid')['value'] = "";
        return;
    }

    function carrefdrop() {
        document.getElementById('carrefdropdownlist').innerText = "";
    }

    $(document).ready(function () {
        $(document.getElementById('customerdiv')).mouseenter(function () {
            if (document.getElementById('txtrfid')['value'] == "") {
                if (document.getElementById('Listedit').style.display == "none") {
                    document.getElementById('txtrfid').focus();
                }
            }
        });
    });

    $scope.Grfid2Code = function (evt) {
        if (evt >= 48 && evt < 58) {            
        }
        else if (typeof (evt) != "undefined") {            
            if (evt.keyCode != 13) {
                alert("Invalid input");
                document.getElementById('txtrfid')['value'] = "          ";
                execScript;
            }
        }
    }

    //$scope.$watch('customertype', function () {
    //    watch();
    //});

    $scope.rfid2func = function (rfid) {
        //document.getElementById('txtrfid')['value'] = document.getElementById('txtrfid2')['value'];
        if (document.getElementById('txtrfid').value.length >= 10) {
            //document.getElementById('txtrfid2')['value'] = "";
            txtOnKeyPress();
        }
    }

    function txtOnKeyPress(txt1) {
        if (document.getElementById('txtrfid').value.length >= 10) {
            ////alert(document.getElementById('nosearch')["value"]);
            if (document.getElementById('nosearch')["value"] == "yes") {

                var cust = { 'rfid_code': document.getElementById('txtrfid')["value"] };
                var datafound;
                //$.ajax({url: 'customer/searchrfid', type: 'POST', data: JSON.stringify(cust), dataType: 'json', contentType: "application/json", success: function (response) {       
                $http({ url: 'customer.json', method: 'GET' }).success(function (response) {                    
                    for (var i = 0; i < response.length; i++) {                       
                        if (response[i].rfid_code == $scope.rfid) {
                            datafound = response[i].rfid_code;
                        }
                    }
                    //if (response == "") {                   
                    if (datafound == undefined) {
                        ////alert("not exist");

                        confirmtrue();

                        autogenerate();

                        angular.element('#customtype').focus();
                        $scope.showdemo2 = false
                        $scope.showdemo  = true;
                        $scope.modeldemo = "Please select a customer type";
                        document.getElementById("demo").style.top      = "74px";
                        document.getElementById("demo").style.left     = "341px";
                        document.getElementById("demo").style.width    = "250px";
                        document.getElementById("demo").style.height   = "5px";
                        document.getElementById("demo").style.fontSize = "11.5px";
                    }
                    else {
                        alert("This RFID code exist in our Database. Please re-type");
                        document.getElementById('txtrfid')['value'] = "";
                        document.getElementById('txtrfid').focus();
                        return;
                    }
                });                                    
            }
            
            if (document.getElementById('nosearch')["value"] == "") {
                var cust = { 'rfid_code': document.getElementById('txtrfid')["value"] };
                var datafound;

                //$.ajax({url: 'customer/searchrfid', type: 'POST', data: JSON.stringify(cust), dataType: 'json', contentType: "application/json", success: function (response) {
                $http({ url: 'customer.json', method: 'GET' }).success(function (response) {

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].rfid_code == $scope.rfid) {
                            datafound = response[i].rfid_code;
                        }
                    }

                    if (datafound == undefined) {
                        ////alert('empty');
                        /////  this is for search /////
                        if (document.getElementById('nosearch')["value"] == "") {
                            var varconfirm = window.confirm("This RFID code doesn't exist in our Database. Do you want to register this new RFID code?");
                        }
                        /////  this is for search /////
                        if (varconfirm == true) {                            
                            confirmtrue();

                            autogenerate();

                            newcust();

                            document.getElementById('customtype').focus();
                            $scope.showdemo2 = false
                            $scope.showdemo  = true;
                            $scope.modeldemo = "Please select a customer type";
                            document.getElementById("demo").style.top      = "74px";
                            document.getElementById("demo").style.left     = "341px";
                            document.getElementById("demo").style.width    = "250px";
                            document.getElementById("demo").style.height   = "5px";
                            document.getElementById("demo").style.fontSize = "11.5px";
                        } else {

                            $scope.$apply(function () {
                                alert('are you sure');

                                $scope.rfid_model = true; $scope.telephonenumber_model = true;
                                $scope.customerid_model = true; $scope.mobilenumber_model = true;
                                $scope.customertype_model = true; $scope.emailaddress_model = true;
                                $scope.companyname_model = true; $scope.birthday_model = true;
                                $scope.lastname_model = true; $scope.birthplace_model = true;
                                $scope.firstname_model = true; $scope.nationality_model = true;
                                $scope.middlename_model = true; $scope.idtype_model = true;
                                $scope.address_model = true; $scope.idnumber_model = true;
                            });
                            document.getElementById('txtrfid')['value'] = "";
                            document.getElementById('txtcustid')['value'] = "";
                            document.getElementById('txtrfid').focus();
                            return;
                        }
                    }
                    else {
                        alert('exist');
                        $scope.$apply(function () {
                            $scope.telephonenumber = response[0]["phone_num"];
                            $scope.address = response[0]["address"];
                            $scope.birthday = formatDate(response[0]["birthday"].slice(0, 9));
                            $scope.birthday2 = response[0]["birthday"].slice(0, 9);
                            $scope.birthplace = response[0]["birthplace"];
                            $scope.companyname = response[0]["compname"];
                            $scope.customerid = response[0]["custnum"];
                            $scope.customerid2 = response[0]["custnum"];
                            $scope.customertype = response[0]["custtype"];
                            $scope.emailaddress = response[0]["email_add"];
                            $scope.firstname = response[0]["firstname"];
                            $scope.idnumber = response[0]["idnum"];
                            $scope.idtype = response[0]["idtype"];
                            $scope.lastname = response[0]["lastname"];
                            $scope.middlename = response[0]["middlename"];
                            $scope.mobilenumber = response[0]["mobile_num"];
                            $scope.nationality = response[0]["nationality"];
                        });;
                        if (document.getElementById('customtype')['value'] == "") {
                            document.getElementById('customtype')['value'] = response[0]["custtype"];
                        }
                        if (document.getElementById('txttelno')['value'] == "") {
                            document.getElementById('txttelno')['value'] = response[0]["phone_num"];
                            document.getElementById('txtaddress')['value'] = response[0]["address"];
                            document.getElementById('txtbirthday')['value'] = formatDate(response[0]["birthday"].slice(0, 9));
                            document.getElementById('txtbirthday2')['value'] = response[0]["birthday"].slice(0, 9);
                            document.getElementById('txtbirthplace')['value'] = response[0]["birthplace"];
                            document.getElementById('txtcompname')['value'] = response[0]["compname"];
                            document.getElementById('txtcustid')['value'] = response[0]["custnum"];
                            document.getElementById('txtcustid2')['value'] = response[0]["custnum"];
                            document.getElementById('customtype')['value'] = response[0]["custtype"];
                            document.getElementById('txtemailadd')['value'] = response[0]["email_add"];
                            document.getElementById('txtfirstname')['value'] = response[0]["firstname"];
                            document.getElementById('txtidnumber')['value'] = response[0]["idnum"];
                            document.getElementById('sidtype')['value'] = response[0]["idtype"];
                            document.getElementById('txtlastname')['value'] = response[0]["lastname"];
                            document.getElementById('txtmiddlename')['value'] = response[0]["middlename"];
                            document.getElementById('txtmobilenum')['value'] = response[0]["mobile_num"];
                            document.getElementById('txtnationality')['value'] = response[0]["nationality"];
                        }
                        document.getElementById('txtrfid').focus();
                        return;
                    }
                }, function (failed) {
                });                                  
            };
            varrfidcode = document.getElementById("txtrfid")["value"];
        }

        if (txt1 != 'undefined') {
            if (window.event.keyCode == "40") {
                document.getElementById('customtype').focus();
                alert('ooops1');
            }
            if (window.event.keyCode == "13") {
                document.getElementById('skipload')["value"] = "";
                document.getElementById('btnvalidate').click();

                document.getElementById('customtype').focus();
                alert('oooops2');
            }
        }
    }
    $("#txtrfid").focus();

    $scope.custsearch = function (custsearch) {
        editdisabled();

        emptycustomertext();
        disabledcustomertext();

        document.getElementById('nosearch')["value"] = "";
        setTimeout(function () {
            $scope.$apply(function () {
                adddemomessage();
                angular.element("#txtrfid").focus();
            });
        }, 0);        
    }

    // this is for custnum autogenerate in customer table //
    function autogenerate() {        
        var custfiltered;
        $http({ url: 'customer.json', method: 'GET' }).success(function (response) {           
              custfiltered = Number(response[11].custnum.substring(4,17)) + 1;
              document.getElementById("txtcustid")['value'] = "CBV-" + custfiltered;
        });
        return;
    }
    // this is for custnum autogenerate in customer table //

    function newcust() {
        document.getElementById("customtype")["value"]     = null;
        document.getElementById("txtcompname")["value"]    = null;
        document.getElementById("txtlastname")["value"]    = null;
        document.getElementById("txtfirstname")["value"]   = null;
        document.getElementById("txtmiddlename")["value"]  = null;
        document.getElementById("txtaddress")["value"]     = null;
        document.getElementById("txttelno")["value"]       = null;
        document.getElementById("txtmobilenum")["value"]   = null;
        document.getElementById("txtemailadd")["value"]    = null;
        document.getElementById("txtbirthday")["value"]    = null;
        document.getElementById("txtbirthday2")["value"]   = null;
        document.getElementById("txtbirthplace")["value"]  = null;
        document.getElementById("txtnationality")["value"] = null;
        document.getElementById("sidtype")["value"]        = null;
        document.getElementById("txtidnumber")["value"]    = null;
        return;
    }

    function emptycustomertext() {
        document.getElementById("txtrfid")["value"]        = null;
        document.getElementById("txtcustid")["value"]      = null;
        document.getElementById("customtype")["value"]     = null;
        document.getElementById("txtcompname")["value"]    = null;
        document.getElementById("txtlastname")["value"]    = null;
        document.getElementById("txtfirstname")["value"]   = null;
        document.getElementById("txtmiddlename")["value"]  = null;
        document.getElementById("txtaddress")["value"]     = null;
        document.getElementById("txttelno")["value"]       = null;        
        document.getElementById("txtmobilenum")["value"]   = null;
        document.getElementById("txtemailadd")["value"]    = null;
        document.getElementById("txtbirthday")["value"]    = null;
        document.getElementById("txtbirthday2")["value"]   = null;
        document.getElementById("txtbirthplace")["value"]  = null;
        document.getElementById("txtnationality")["value"] = null;
        document.getElementById("sidtype")["value"]        = null;
        document.getElementById("txtidnumber")["value"]    = null;
        varrfidcode                                        = "";
        varcustnum                                         = "";
        searchfocus                                        = "";
        return;
    }
  
    function disabledcustomertext() {      
             $scope.rfid_model            = false;
             $scope.customerid_model      = true;

             if ($scope.customertype == null) {               
                //$scope.customertype_model = true;               
             }            

             $scope.companyname_model     = true;
             $scope.lastname_model        = true;
             $scope.firstname_model       = true;
             $scope.middlename_model      = true;
             $scope.address_model         = true;
             $scope.telephonenumber_model = true;
             $scope.mobilenumber_model    = true;
             $scope.emailaddress_model    = true;
             $scope.birthday_model        = true;
             $scope.birthday2_model       = true;
             $scope.birthplace_model      = true;
             $scope.nationality_model     = true;
             $scope.idtype_model          = true;
             $scope.idnumber_model        = true;

             $scope.lbltel_show           = false;
             $scope.confirmdiv_show       = false;

             $scope.showbirthday          = true;
             $scope.showbirthday2         = false;      
             return;
    }

    function confirmtrue() {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.rfid_model = true;
                $scope.customerid_model = true;
                $scope.customertype_model = false;
                $scope.companyname_model = false;
                $scope.lastname_model = false;
                $scope.firstname_model = false;
                $scope.middlename_model = false;
                $scope.address_model = false;
                $scope.telephonenumber_model = false;
                $scope.mobilenumber_model = false;
                $scope.emailaddress_model = false;

                $scope.birthday_model = false;
                $scope.birthday2_model = false;

                $scope.birthplace_model = false;
                $scope.nationality_model = false;
                $scope.idtype_model = false;
                $scope.idnumber_model = false;

                return;
            });
        }, 0);      
    }

    function editdisabled() {
            $scope.showcustomerlist       = false;

            $scope.showcustomer           = false;
            $scope.showeditborder         = false;
            $scope.showlastname           = false;
            $scope.showfirstname          = false;
            $scope.showcompanyname        = false;
            $scope.showlbltelname         = false;
            $scope.showsearch             = false;
            $scope.showcustomertypeseacrh = false;
            $scope.showcustomersearch     = false;
            $scope.customertypeseacrh     = [];

            $scope.showrequired           = true;
            $scope.rfid_model             = true;
            $scope.customerid_model       = true;           
            
            $scope.customertype_model     = false;

            $scope.companyname_model      = false;
            $scope.lastname_model         = false;
            $scope.firstname_model        = false;
            $scope.middlename_model       = false;

            $scope.address_model          = false;
            $scope.telephonenumber_model  = false;
            $scope.mobilenumber_model     = false;
            $scope.emailaddress_model     = false;

            $scope.birthday_model         = false;
            $scope.birthday2_model        = false;
            $scope.birthplace_model       = false;
            $scope.nationality_model      = false;

            $scope.idtype_model           = false;
            $scope.idnumber_model         = false;

            angular.element('#customtype').focus();
            return;
    }    
  
    ///   this is for a customer demo messages   ///
    $scope.addcust = function () {
        $scope.showdemo2 = false;
        $scope.showdemo  = true;
        $scope.modeldemo = "click to add new customer";
        document.getElementById("demo").style.top      = "250px";
        document.getElementById("demo").style.left     = "37px";
        document.getElementById("demo").style.width    = "230px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "12px";
    }
    $scope.addcustremove = function () {
        $scope.showdemo  = false;
        $scope.showdemo2 = false
    }

    $scope.editcust = function () {
        $scope.showdemo2 = false;
        $scope.showdemo  = true;
        $scope.modeldemo = "click to edit the existing customer";
        document.getElementById("demo").style.top      = "250px";
        document.getElementById("demo").style.left     = "145px";
        document.getElementById("demo").style.width    = "270px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "12px";
    }
    $scope.editcustremove = function () {
        $scope.showdemo  = false;
    }

    $scope.deletecust = function () {
        $scope.showdemo2 = false;
        $scope.showdemo = true;
        $scope.modeldemo = "click to delete the existing customer";
        document.getElementById("demo").style.top      = "250px";
        document.getElementById("demo").style.left     = "253px";
        document.getElementById("demo").style.width    = "280px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "12px";
    }
    $scope.deletecustremove = function () {
        $scope.showdemo  = false;
    }

    $scope.viewcust = function () {
        $scope.showdemo2 = false;
        $scope.showdemo  = true;
        $scope.modeldemo = "click to view all the existing customers";
        document.getElementById("demo").style.top      = "250px";
        document.getElementById("demo").style.left     = "364px";
        document.getElementById("demo").style.width    = "300px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "12px";
    }
    $scope.viewcustremove = function () {
        $scope.showdemo  = false;
    }

    $scope.searchcustomer = function () {
        $scope.showdemo2 = false;
        $scope.showdemo  = true;
        $scope.modeldemo = "click to search a specific customer through RFID code";
        document.getElementById("demo").style.top      = "250px";
        document.getElementById("demo").style.left     = "472px";
        document.getElementById("demo").style.width    = "400px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "12px";
    }
    $scope.searchcustomerremove = function () {
        $scope.showdemo = false;
    }

    $scope.custypeenter = function () {
        $scope.showdemo2 = false;
        $scope.showdemo  = true;
        $scope.modeldemo = "select search type";
        document.getElementById("demo").style.top      = "43px";
        document.getElementById("demo").style.left     = "781px";
        document.getElementById("demo").style.width    = "180px";
        document.getElementById("demo").style.height   = "10px";
        document.getElementById("demo").style.fontSize = "11.5px";

        if (accesstype == "viewcust") {
            $scope.showdemo = true;
            $scope.modeldemo = "select search type";
            document.getElementById("demo").style.top      = "43px";
            document.getElementById("demo").style.left     = "1035px";
            document.getElementById("demo").style.width    = "180px";
            document.getElementById("demo").style.height   = "10px";
            document.getElementById("demo").style.fontSize = "11.5px";
        }
    }
    $scope.custypeenterremove = function () {
        $scope.showdemo = false;
    }

    $scope.custsearchenter = function () {
        custsearchenter();
    }
    $scope.custsearchremove = function () {
        $scope.showdemo2 = false;
    }
    function custsearchenter() {
        $scope.showdemo2 = true;
        $scope.modeldemo2 = "By typing the first letter of the customer you want to search you will see one of the powerful feature of AngularJS it's called Data_Binding.";
        document.getElementById("demo2").style.top      = "43px";
        document.getElementById("demo2").style.left     = "880px";
        document.getElementById("demo2").style.width    = "320px";
        document.getElementById("demo2").style.height   = "120px";
        document.getElementById("demo2").style.fontSize = "11.5px";

        if (accesstype == "viewcust") {
            $scope.showdemo2 = true;
            $scope.modeldemo2 = "By typing the first letter of the customer you want to search you will see one of the powerful feature of AngularJS it's called Data_Binding.";
            document.getElementById("demo2").style.top      = "43px";
            document.getElementById("demo2").style.left     = "1080px";
            document.getElementById("demo2").style.width    = "180px";
            document.getElementById("demo2").style.height   = "200px";
            document.getElementById("demo2").style.fontSize = "11.5px";
        }
    }    

    $scope.carrefenter = function () {   
        $scope.showdemo2 = true;
        $scope.modeldemo2 = "Select a specific Car Plate number to see the details and it's corresponding transactions";
        document.getElementById("demo2").style.top      = "243px";
        document.getElementById("demo2").style.left     = "880px";
        document.getElementById("demo2").style.width    = "320px";
        document.getElementById("demo2").style.height   = "110px";
        document.getElementById("demo2").style.fontSize = "12px";
    }

    $scope.carrefenterremove = function () {
        $scope.showdemo2 = false;
    }

    $scope.customtypeenter = function () {
        $scope.showdemo = true;
        $scope.modeldemo = "Please select a customer type";
        document.getElementById("demo").style.top      = "74px";
        document.getElementById("demo").style.left     = "341px";
        document.getElementById("demo").style.width    = "250px";
        document.getElementById("demo").style.height   = "5px";
        document.getElementById("demo").style.fontSize = "11.5px";
    }
    $scope.customtyperemove = function () {
        $scope.showdemo = false;
    }

    $scope.rfidenter = function () {
        adddemomessage();
    }
    $scope.rfidremove = function () {
        $scope.showdemo2 = false;
    }

    function adddemomessage() {
        $scope.showdemo  = false;
        $scope.showdemo2 = true;
        $scope.modeldemo2 = "Please type with 10 numeric length for RFID Code example: 9723412345";
        document.getElementById("demo2").style.top      = "24px";
        document.getElementById("demo2").style.left     = "343px";
        document.getElementById("demo2").style.width    = "320px";
        document.getElementById("demo2").style.height   = "90px";
        document.getElementById("demo2").style.fontSize = "11.5px";
    }

    $scope.sidtypeenter = function () {
        idtype();
    }
    $scope.sidtyperemove = function () {
        $scope.showdemo = false;
    }

    function idtype() {
        $scope.showdemo   = true;
        $scope.modeldemo  = "Selecct ID type";
        document.getElementById("demo").style.top       = "115px";
        document.getElementById("demo").style.left      = "1177px";
        document.getElementById("demo").style.width     = "150px";
        document.getElementById("demo").style.height    = "3px";
        document.getElementById("demo").style.fontSize  = "11.5px";
        return;
    }

    $scope.Listeditenter = function () {
        if (searchfocus != "focus") {
            editenter();
        }        
    }
    $scope.Listeditmove   = function () {
        $scope.showdemo   = false;
        $scope.showdemo2  = false;
    }

    function editenter() {
        $scope.showdemo = false;
        $scope.showdemo2 = true;
        $scope.modeldemo2 = "Please press arrow key and arrow down to select and press enter / click the selected customer. While you"+
        " can filter the customer by selecting the search by on the top. Otherwise, press escape to clear the listbox";
        document.getElementById("demo2").style.top      = "54px";
        document.getElementById("demo2").style.left     = "643px";
        document.getElementById("demo2").style.width    = "350px";
        document.getElementById("demo2").style.height   = "130px";
        document.getElementById("demo2").style.fontSize = "11.5px";
    }

    function introduction() {
        $scope.showdemo2 = true;
        $scope.modeldemo2 = "This Customer Tracking application developed using AngularJS and Javascript with a"+
        " combination of both HTML,CSS,JQuey in Web API framework through Restful Web services which is Representation"+
        " State Transfer (REST). The appliction has the ability to track the customer information and all the deatails"+
        " including the number of car registered and it's number of transaction they have subscribe from the"+
        " company. Otherwise, this Customer Tracking application is currently and successsfully used by my client"+
        " as one of the biggest Car services company here in my location. To start go to Add customer if you want to"+
        " add new customer or edit, delete, view and search";
        document.getElementById("demo2").style.top      = "10px";
        document.getElementById("demo2").style.left     = "543px";
        document.getElementById("demo2").style.width    = "410px";
        document.getElementById("demo2").style.height   = "260px";
        document.getElementById("demo2").style.fontSize = "12px";
    }
    ///   this is for a customer demo messages   ///
});

// this function is for the setcursor position wherein to put cursor on the last part of the statement //
function setCursorPositionToEnd(elementId) {
    var elementRef = document.getElementById(elementId);
    var cursorPosition = document.getElementById(elementId).value.length;

    console.log(elementRef + cursorPosition);

    if (elementRef != null) {
        if (elementRef.createTextRange) {
            var textRange = elementRef.createTextRange();
            textRange.move('character', cursorPosition);
            textRange.select();
        }
        else {
            if (elementRef.selectionStart) {
                elementRef.focus();
                elementRef.setSelectionRange(cursorPosition, cursorPosition);
            }
            else {
                elementRef.focus();
                elementRef.setSelectionRange(cursorPosition, cursorPosition);
            }
        }
    }
}
// this function is for the setcursor position wherein to put cursor on the last part of the statement //

// this is for re-ordering the styling from css //
function edit_delete_styling() {
    document.getElementById("lbledit").style.width      = "621px";
    document.getElementById("lbleditcustid").style.left = "155px";
    document.getElementById("lblname").style.left       = "299px";
    document.getElementById("lblfirst").style.left      = "437px";
    document.getElementById("lblcomp").style.left       = "564px";
    document.getElementById("lblsearch").style.left     = "706px";
    document.getElementById('customertype').style.left  = "773px";
    document.getElementById('txtsearch').style.left     = "873px";
    return;
}

function viewstyling() {
    document.getElementById("lbledit").style.width      = "874px";
    //document.getElementById("Listedit").style.left      = "153px";
    document.getElementById("lbleditcustid").style.left = "155px";
    document.getElementById("lblname").style.left       = "298px";
    document.getElementById("lblfirst").style.left      = "444px";
    document.getElementById("lblcomp").style.left       = "590px";
    document.getElementById("lblsearch").style.left     = "960px";
    document.getElementById('customertype').style.left  = "1026px";
    document.getElementById('txtsearch').style.left     = "1125px";
    return;
}
// this is for re-ordering the styling from css //

// this is for listeditbox position //
function editposition() {
    document.getElementById("Listedit").style.left      = "153px";
    document.getElementById("Listedit").style.top       = "26px";
    document.getElementById("Listedit").style.width     = "927px";
    return;
}

function viewposition() {
    document.getElementById("Listedit").style.left      = "153px";
    document.getElementById("Listedit").style.top       = "26px";
    document.getElementById("Listedit").style.width     = "1179px";
    return;
}
// this is for listeditbox position //

//// this is for customer keypress  /////
