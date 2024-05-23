var addSiteBtn = document.getElementById('addSiteBtn');
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var inputs = [siteName, siteUrl];
var tableBody = document.getElementById('tableBody');
var validationModalBtn = document.getElementById('validationModalBtn');
var search = document.getElementById('search');

var sites =[];

if(localStorage.getItem('sites') === null){
    sites = [];
}
else{
    sites = JSON.parse(localStorage.getItem('sites'));
    tableBody.innerHTML = '';
    for(var i=0; i<sites.length; i++)
        showSite(sites[i]);
}

// Add site to the local storage

addSiteBtn.onclick = function(){
    var valid = true;

    for(var i=0; i< inputs.length; i++){
        validation(inputs[i]);
        valid = validation(inputs[i]) && valid;
    }

    if(valid){
        var site = {
            siteName : siteName.value,
            siteUrl : siteUrl.value
        };

        addSite(site);
        showSite(site);
        resetForm();
    }
    else{
        validationModalBtn.click();
        this.classList.add('disable');
    }
}

function addSite(obj){
    sites.push(obj);
    localStorage.setItem('sites', JSON.stringify(sites));
}

function resetForm(){
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');
}

//-----------------------------------------------------------------------------------------------------------------------------------

// Show the site in the table

function showSite(obj){
    tableBody.innerHTML +=`<tr>
                                <td>${sites.indexOf(obj) + 1}</td>
                                <td>${obj.siteName}</td>
                                <td>
                                    <a href="${obj.siteUrl}" class="btn text-white" target="_blank">
                                        <i class="fa-solid fa-eye me-1"></i>
                                        visit
                                    </a>
                                </td>
                                <td>
                                    <button class="btn btn-danger text-white" onclick="removeSite(${sites.indexOf(obj)})">
                                        <i class="fa-solid fa-trash-can"></i>
                                        delete
                                    </button>
                                </td>
                            </tr>`;
}

//-------------------------------------------------------------------------------------------------------------------------------------

// Remove site from the table and local storage

function removeSite(objIndex){
    sites.splice(objIndex, 1);
    localStorage.setItem('sites', JSON.stringify(sites));
    tableBody.innerHTML = '';
    for(var i=0; i<sites.length; i++)
        showSite(sites[i]);
}

//--------------------------------------------------------------------------------------------------------------------------------------

// search site from the table

search.onfocus = function(){
    this.parentElement.classList.add('focus');    //add box shadow of the search
}

search.onblur = function(){
    this.parentElement.classList.remove('focus'); //remove box shadow of the search
}

search.oninput = function(){
    var temp = searchSite(this.value);
    tableBody.innerHTML = '';
    for(var i=0; i<temp.length; i++)
        showSite(temp[i]);
}

function searchSite(inputValue){
    var temp = [];

    for(var i=0; i< sites.length; i++){
        if(sites[i].siteName.toLowerCase().includes(inputValue.trim().toLowerCase()))
            temp.push(sites[i]);
    }

    return temp;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------


//validation

function validation(elem){
    var regex = {
        siteName : /^[A-Z][a-z]{0,9}\s?[a-z]{0,10}$/,
        // siteUrl : /^(www.)[\w]+(.com)$/,
        siteUrl : /^(http)(s)?(:\/\/)[A-Za-z\-\.]+(\/)?$/
    }

    if(!regex[elem.id].test(elem.value)){
        elem.classList.remove('is-valid');
        elem.classList.add('is-invalid');
        return false;
    }
    else{
        elem.classList.remove('is-invalid');
        elem.classList.add('is-valid');
        if(inputs[0].classList.contains('is-valid') && inputs[1].classList.contains('is-valid')) 
            addSiteBtn.classList.remove('disable');
        return true;
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------


