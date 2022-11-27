//Yu Hua Yang, 2133677
//Charles-Alexandre Bouchard 2135704
//most comments made by Charles-Alexandre Bouchard
"use strict";
let edit_validate_array = [false, false, false, false, false, false, false, false];

/** 
 * @description to create an object project. 
 * made by Yu-Hua Yang
 */  
function createProjectObject() {

let proj_id = document.getElementById("project_id").value;
let owner = document.getElementById("owner_name").value;
let new_title = document.getElementById("title").value;
let new_category = document.getElementById("category").value;
let new_hours = document.getElementById("hours").value;
let new_rate = document.getElementById("rate").value;
let new_status = document.getElementById("status").value;
let new_short_description = document.getElementById("short_description").value;

let project_object = {id:proj_id, owner_name:owner, title:new_title, category:new_category, hours:new_hours, rate:new_rate, status:new_status, description:new_short_description, edit:"", delete:""};

return project_object;

}

/** 
 * @description the user fills out the form and it is correct, the current project is visually shown in the table and added to the adequate storage.  
 * made by Yu-Hua Yang
*/
function updateProjectsTable_Once(){
  try {
    All_project_arry[All_project_arry.length] = createProjectObject();
  }  

  catch(TypeError){
    All_project_arry[0] = createProjectObject();
  }

  finally{
  localStorage.setItem('All_project_entries', JSON.stringify(All_project_arry)); 
  generateTable(All_project_arry,table_headers);
  }

  return All_project_arry;
}


/**
 * @description  When the icon (remove) next to the project is clicked,a confirmation dialog asking user to confirm the deletion. The project is then removed physically (storage) and logically (screen) 
 * @param {element} image_element - image element
 * made by Charles-Alexandre Bouchard
 */ 
 function deleteTableRow(image_element){
  if (confirm("Are you sure you want to permanently delete this row?")) {
    image_element.parentNode.parentNode.remove();
    let idRow = image_element.parentNode.parentNode.id;
    let numRow = idRow.replace(/\D/,'');
    let deleted = all_project_array.splice(numRow, 1);
    status_bar.textContent = "deleted a row";
  }}


/**
 * @description editTableRow-When the icon (edit) next to the project is clicked,the whole row become editable. The icon should turn to save icon,which when clicked update the project in question.
 * @param {element} image_element - image element
 * made by Charles-Alexandre Bouchard
 */
 function editTableRow(image_element){
  let selected = image_element.parentNode.parentNode;

  let proj_id = selected.childNodes[0];
  let owner = selected.childNodes[1];
  let proj_title = selected.childNodes[2];
  let proj_category = selected.childNodes[3];
  let proj_status = selected.childNodes[6];
  let nber_hours = selected.childNodes[4];
  let rate = selected.childNodes[5];
  let proj_descr = selected.childNodes[7];

  let proj_id_data = proj_id.innerHTML;
  let owner_data = owner.innerHTML;
  let proj_title_data = proj_title.innerHTML;
  let proj_category_data = proj_category.innerHTML;
  let proj_status_data = proj_status.innerHTML;
  let nber_hours_data = nber_hours.innerHTML;
  let rate_data = rate.innerHTML;
  let proj_descr_data = proj_descr.innerHTML;

  let edit = false;
  
  let proj_id_validation = proj_id.innerHTML="<input type='text' id='proj_id_input"+selected.id+"' value='"+proj_id_data+"'>";
  let owner_validation = owner.innerHTML="<input type='text' id='owner_input"+selected.id+"' value='"+owner_data+"'>";
  let proj_title_validation = proj_title.innerHTML="<input type='text' id='proj_title_input"+selected.id+"' value='"+proj_title_data+"'>";
  let proj_category_validation = proj_category.innerHTML="<input type='text' id='proj_category_input"+selected.id+"' value='"+proj_category_data+"'>";
  let proj_status_validation = proj_status.innerHTML="<input type='text' id='proj_status_input"+selected.id+"' value='"+proj_status_data+"'>";
  let nber_hours_validation = nber_hours.innerHTML="<input type='text' id='nber_hours_input"+selected.id+"' value='"+nber_hours_data+"'>";
  let rate_validation = rate.innerHTML="<input type='text' id='rate_input"+selected.id+"' value='"+rate_data+"'>";
  let proj_descr_validation = proj_descr.innerHTML="<input type='text' id='proj_descr_input"+selected.id+"' value='"+proj_descr_data+"'>";

  document.getElementById("generated_table").childNodes[1].childNodes[1].childNodes[16].innerHTML="save";

  image_element.remove();
  let currentTd = selected.childNodes[8];
  let save_img = createTagElement("img", null, currentTd.id);
  save_img.src = "../images/save.png";

  document.getElementById("proj_id_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("proj_id_input"+selected.id, selected.id, save_img)});
  document.getElementById("owner_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("owner_input"+selected.id, selected.id, save_img)});
  document.getElementById("proj_title_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("proj_title_input"+selected.id, selected.id, save_img)});
  document.getElementById("proj_category_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("proj_category_input"+selected.id, selected.id, save_img)});
  document.getElementById("proj_status_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("proj_status_input"+selected.id, selected.id, save_img)});
  document.getElementById("nber_hours_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("nber_hours_input"+selected.id, selected.id, save_img)});
  document.getElementById("rate_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("rate_input"+selected.id, selected.id, save_img)});
  document.getElementById("proj_descr_input"+selected.id).addEventListener("keyup", function(){edit_input_validate("proj_descr_input"+selected.id, selected.id, save_img)});

  
  
}

/**
 * @description save inner function
 * @param {id} rowId - id of the row
 * made by Charles-Alexandre Bouchard
 */
function save(rowId){
  let proj_id_val = document.getElementById("proj_id_input"+rowId).value;
  let owner_val = document.getElementById("owner_input"+rowId).value;
  let proj_title_val = document.getElementById("proj_title_input"+rowId).value;
  let proj_category_val = document.getElementById("proj_category_input"+rowId).value;
  let nber_hours_val = document.getElementById("nber_hours_input"+rowId).value;
  let rate_val = document.getElementById("rate_input"+rowId).value;
  let proj_status_val = document.getElementById("proj_status_input"+rowId).value;
  let proj_descr_val = document.getElementById("proj_descr_input"+rowId).value;
  let project_object = {id:proj_id_val, owner_name:owner_val, title:proj_title_val, category:proj_category_val, hours:nber_hours_val, rate:rate_val, status:proj_status_val, description:proj_descr_val, edit:"", delete:""};
  rowId = rowId.replace(/\D/,'');
  rowId = rowId.replace(/\D/,'');
  let deleted = all_project_array.splice(rowId, 1, project_object);
  createTableFromArrayObjects(all_project_array);
  document.getElementById("generated_table").childNodes[1].childNodes[1].childNodes[16].innerHTML="edit";
  status_bar.textContent = "edited a row";
}

/**
 * @description validates input of edit function
 * @param {id} element_id - id of element
 * @param {id} rowId - id of row
 * @param {element} save_img - img element
 * made by Charles-Alexandre Bouchard
 */
function edit_input_validate(element_id, rowId, save_img){
  let index;
  let regex_pattern;

  switch(element_id){
      case "proj_id_input"+rowId:
          regex_pattern = regex_proj_id;
          index = 0;
          break;
      case "owner_input"+rowId:
          regex_pattern = regex_owner;
          index = 1;
          break;
      case "proj_title_input"+rowId:
          regex_pattern = regex_proj_title;
          index = 2;
          break;
      case "proj_category_input"+rowId:
          regex_pattern = regex_proj_title;
          index = 3;
          break;
      case "nber_hours_input"+rowId:
          regex_pattern = regex_nber_hours;
          index = 4;
          break;
      case "rate_input"+rowId:
          regex_pattern = regex_rate;
          index = 5;
          break;
      case "proj_status_input"+rowId:
          regex_pattern = regex_proj_title;
          index = 6;
          break;
      case "proj_descr_input"+rowId:
          regex_pattern = regex_proj_description;
          index = 7;
  }
  let validation_boolean = validateElement(regex_pattern, document.getElementById(element_id).value);
  setEditElementFeedback(element_id, validation_boolean);
  edit_validate_array[index] = validation_boolean;
  if(checkIfValidated() == 8){
    save_img.addEventListener("click", function(){
      save(rowId);
      edit_validate_array = [false, false, false, false, false, false, false, false];
    });
  }
 }

 /**
  * @description sets feedback of validate edit function
  * @param {id} element_id - id of element
  * @param {boolean} error_success - true or false
  * made by Charles-Alexandre Bouchard
  */
 function setEditElementFeedback(element_id, error_success){
  //creating if a Element ID exist if it does removes it and if not it will create a new one
  if(document.getElementById("edit_element_feedback_" + element_id) != null) {
    document.getElementById("edit_element_feedback_" + element_id).remove();
  }

  if (error_success == false){

    let image_node = createTagElement("img", null, document.getElementById(element_id).parentNode.id);

    image_node.src = "../images/invalid.png";
    image_node.className = "validation_images";
    image_node.id = "edit_element_feedback_" + element_id;
  }
  else if(error_success == true){

    let image_node = createTagElement("img", null, document.getElementById(element_id).parentNode.id);

    image_node.src = "../images/valid.png";
    image_node.className = "validation_images";
    image_node.id = "edit_element_feedback_" + element_id;
  }
 }

 /**
  * @description function that checks validation
  * @returns count
  * made by Charles-Alexandre Bouchard
  */
 function checkIfValidated(){
  let count = 0;
  for (let i = 0; i < edit_validate_array.length; i++){
    if(edit_validate_array[i]){
      count++;
    }
  }
  if(count == 8){
    edit_validate_array = [false, false, false, false, false, false, false, false];
  }
  return count;
 }



/*saveAllProjects2Storage -When the user clicks on button save to storage,
 all projects in the table are saved to the browser local storage.
  If the local storage contained some old projects, then they are overwritten.
   Show an adequate message in the section status. e.g., 
   "all projects have been saved to local storage..." 
   If the table is empty, the button should be disabled.  
   */
/**
 * @description saveAllProjects2Storage -When the user clicks on button save to storage,all projects in the table are saved to the browser local storage. If the local storage contained some old projects, then they are overwritten. Show an adequate message in the section status. e.g., "all projects have been saved to local storage..." If the table is empty, the button should be disabled.
 * made by Charles-Alexandre Bouchard
 */
function saveAllProjects2Storage(){
  clearAllProjectsFromStorage();
  all_project_array.forEach(function(element, index){
    localStorage.setItem(index,JSON.stringify(element));
  });
  status_bar.textContent = "saved project to local storage";
}

/**
 * @description appendAllProjects2Storage - Same as with saveAllProjects2Storage, except that the new projects will be appended to a non-empty local storage
 * made by Charles-Alexandre Bouchard
 */
function appendAllProjects2Storage(){
  let rowsInStorage = 0;
  for (let v of Object.values(localStorage)){
    rowsInStorage++;
  }
  all_project_array.forEach(function (element) {
    localStorage.setItem(rowsInStorage + 1, JSON.stringify(element));
    rowsInStorage++;
  });
  status_bar.textContent = "appended new projects to local storage";
}

/**
 * @description clearAllProjectsFromStorage- When the user clicks on the button "clear local", all projects that are in local storage are removed. 
 * made by Charles-Alexandre Bouchard
 */
function clearAllProjectsFromStorage(){
  localStorage.clear();
  status_bar.textContent = "cleared local storage";
}

/**
 * @description readAllProjectsFromStorage- Read from the browser's local storage and visualize them to the user.
 * made by Yu-Hua Yang
 */
 function readAllProjectsFromStorage(){
  all_project_array = new Array();
  for (let v of Object.values(localStorage)){
    all_project_array.push(JSON.parse(v));
  }
  createTableFromArrayObjects(all_project_array);
  status_bar.textContent = "read all projects from local storage";
}




