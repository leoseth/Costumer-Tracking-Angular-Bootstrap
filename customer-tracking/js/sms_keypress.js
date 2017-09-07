
///// sms keypress /////  
$('input[type="text"]').keydown(function (event) {
    if (window.event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
});

$('#form1').keyup(function (i) {
    if (i.keyCode == 27) {
        document.getElementById('Label2').style.display       = "inherit";                              
        document.getElementById('lblsms').style.display       = "inherit";
        document.getElementById('txtsms').style.display       = "inherit";
        document.getElementById('lblservice').style.display   = "inherit";
        document.getElementById('cmbservice').style.display   = "inherit";

        document.getElementById('lbltopuserid').style.display = "none";
        document.getElementById('lbledit').style.display      = "none";

        if (document.getElementById('Listedit').style.display =="inherit"){
            document.getElementById('Listedit').style.display = "none";
        }
        else{}
    }
});                      

function GetKeyCode(evt){
    var keyCode; 
    if (evt.keyCode >= 49 && evt.keyCode < 58 || evt.keyCode  == 45){
        keyCode = evt.keyCode;
    }
    else if (typeof (evt.charCode) != "undefined"){
        if (evt.keyCode != 13){
            keyCode = evt.charCode;
            alert("Invalid data type, please re-type");
        }
    }          
}
                       
$(document).keydown(function (event){
        if (window.event.keyCode == 27){                                
            document.getElementById('ListBoxview').style.display = "none";
            document.getElementById('lbledit').style.display = "none";
            document.getElementById('lbltopuserid').style.display = "none";

            document.getElementById('Label2').style.display = "inherit";

            document.getElementById('Label2').style.display = "inherit";
            document.getElementById('lblsms').style.display = "inherit";
            document.getElementById('txtsms').style.display = "inherit";
            document.getElementById('lblservice').style.display = "inherit";
            document.getElementById('cmbservice').style.display = "inherit";
        }
});                        

function getkeypressed(evt){
    var keyCode; 
    if (evt.keyCode >= 65 && evt.keyCode < 123 || evt.keyCode == 46){
        keyCode = evt.keyCode;
    }
    else if (typeof (evt.charCode) != "undefined"){
        if (evt.keyCode != 13){
            keyCode = evt.charCode;
            alert("Invalid data type, please re-type");
        }
    } 
}

function txtOnKeyPress(txt1){                          
       if (window.event.keyCode == 13){
           var vresponse = window.confirm("Are you sure you want to SAVE this record?");
           if (vresponse == true){
               document.getElementById('Button2').click();
               return true;
           }
       }

       if (window.event.keyCode == "38"){
           document.getElementById('cmbservice').focus();
       }                               
}

function txtOnKeyPress2(txt3){
    if (txt3 != 'undefined'){
        if (window.event.keyCode == "38"){
            txt4 = document.getElementById('cmbservice').focus();
        }
        if (window.event.keyCode == "40"){
            txt4 = document.getElementById('<%=txtsms.ClientID%>').focus();
        }
    }
}
                       
    function Submit(){
        var edit = document.getElementById('edit')['value'];
        var confirmation = window.confirm("Are you sure you want to " + edit + " this record?");
        document.getElementById("HiddenField1")["value"] = confirmation;
        return true;
    }

function rightsaccess() {
    document.getElementById('txtsms').focus();
                           
    if (document.getElementById('hiddenservice')["value"] == "none"){
        document.getElementById('btnrightaccess').click();                                
        return true;
    }
    else{
        document.getElementById('btnrightaccess').click();
        return true;

        if (document.getElementById('hiddenservice')["value"] == "exist"){
            var vconfirm = window.confirm("This SERVICE exist in our Database, do you want to edit this?");
            if (vconfirm == true){
                document.getElementById('txtsms').focus();
            }
            else{
                document.getElementById('cmbservice')["value"]="";
                document.getElementById('txtsms')["value"]="";
                document.getElementById('cmbservice').focus();
            }
        }
        else{
            document.getElementById('txtsms').focus();
        }
    }
}

function Functest(){
    if (document.getElementById('hiddenservice')["value"] == "exist"){
        var vconfirm = window.confirm("This SERVICE exist in our Database, do you want to edit this?");
        if (vconfirm == true){
            document.getElementById('txtsms>').focus();
        }
        else{
            document.getElementById('cmbservice')["value"] = "";
            document.getElementById('txtsms')["value"] = "";
            document.getElementById('cmbservice').focus();
        }
    }
    else{
        document.getElementById('txtsms').focus();
    }
}                                   

///// sms keypress /////