//Yu Hua Yang, 2133677
//Charles-Alexandre Bouchard 2135704
//most comments made by Charles-Alexandre Bouchard
"use strict";
/**
 * @description global variable for a functions to delete and add images
 * made by Yu-Hua Yang
 */
let image_counter = 0;

/** 
 * @description A toggle function that changes the state of a button from disabled/enabled to enabled/disabled.
 * @param {element} btn - html button element
 * @param {boolean} boolean_response - true of false 
 * made by Yu-Hua Yang
*/
function enable_disable_Button(btn, boolean_response){
 btn.disabled = boolean_response;
}

/**
 * @description A function that given an element id, makes the element required and makes the font-weight of its label bold. 
 * @param {String} elem_id - Id of element
 * made by Yu-Hua Yang
*/
function set_elem_required(elem_id){

  let new_elem = document.getElementById(elem_id);
  new_elem.setAttribute("required", "");
  new_elem.style.fontWeight = "bold";

}
 /**   
 * @description Creates a new HTML element takng input string tagname, string content, string parent
 * 
 * @param {string} tagname - tag name of the element to create
 * @param {string} content - text inside the HTML element
 * @param {string} parent - parent to append the tag name to
 * @returns - new HTML element 
 * made by Yu-Hua Yang
 */
 function createTagElement(tagname, content, parent) {

  let new_node = document.createElement(tagname);
  new_node.textContent=content;

  let par = document.getElementById(parent);
  par.append(new_node);
  return new_node;

}

/**
 * @description Given elem_id to identify the field, a feedback_text, and error_success, add a feedback and the error image next to the element, otherwise just the green valid image (without text) 
 * @param {String} element_id - Id of element
 * @param {String} feedback_text - feedback
 * @param {boolean} error_success - true or false
 * made by Yu-Hua Yang
 */ 
 function setElementFeedback(element_id, feedback_text, error_success){
  //creating if a Element ID exist if it does removes it and if not it will create a new one
  if(document.getElementById("element_feedback_" + element_id) != null) {
    document.getElementById("element_feedback_" + element_id).remove();
  }

  if(document.getElementById("element_feedback_text_" + element_id) != null) {
    document.getElementById("element_feedback_text_" + element_id).remove();
  }

  if (error_success == false){

    let image_node = createTagElement("img", null, element_id + "_div");
    let text_node = createTagElement("p", feedback_text, element_id + "_span");

    image_node.src = "../images/invalid.png";
    image_node.className = "validation_images";

    image_node.id = "element_feedback_" + element_id;
    text_node.id = "element_feedback_text_" + element_id;
  }
  else if(error_success == true){

    let image_node = createTagElement("img", null, element_id + "_div");

    image_node.src = "../images/valid.png";
    image_node.className = "validation_images";
    image_node.id = "element_feedback_" + element_id;
  }
 }
 
 /**
  * @description Use the right pattern to check the elementfor which the event (blur) occur. Set the feedback accordinglyand enable or disable the add button (if all fields are filled out and correct)
  * @param {String} regex - the regex patern used
  * @param {String} user_input - String inputed by user
  * made by Yu-Hua Yang
  */
  function validateElement(regex, user_input){

    return regex.test(user_input);

  }

/**
 * @description Given an array of (objects) and parent element, create a table, attach it to parent element and populate the table with array of objects. Each object occupies a row. This is a very important function as it is to be used quite often. 
 * @param {array} object_array - array inputed
 * made by Yu-Hua Yang
 */
  function createTableFromArrayObjects(object_array){

    if(document.getElementById("table_body_id") != null) {
      document.getElementById("table_body_id").remove();
    }

    let table_body = createTagElement("tbody", null, "generated_table");
    table_body.id = "table_body_id";

    for (let i = 0; i < object_array.length; ++i) {
      let current_table_row = createTagElement("tr", null, "table_body_id");
      let table_row = "tr" + i;

      current_table_row.id = table_row;

      addTableDataToTable(object_array[i], table_row);
    }
    addEventListenerToImageOfEditAndDelete()

  }

  /**
   * @description this function adds new data to the existing table
   * @param {array} array 
   * @param {id} current_id 
   * made by Yu-Hua Yang
   */
  function addTableDataToTable(array, current_id){
  if(array !== undefined){

    let table_data_counter = 0;
    let object_value = Object.values(array);

    let edit_image = document.createElement("img");
    let delete_image = document.createElement("img");
    
    edit_image.src = "../images/edit.png";
    delete_image.src = "../images/trash.png";

    edit_image.className = image_counter;
    delete_image.className = image_counter;
    
    object_value.forEach(function(current_element, index_of_array){

      let current_table_data = createTagElement("td", current_element, current_id);
      current_table_data.id = current_id + "td" + index_of_array;
      
      if (table_data_counter == 8){
        current_table_data.appendChild(edit_image);
      }
      else if (table_data_counter == 9){
        current_table_data.appendChild(delete_image);
      }

      table_data_counter++;
    });

    image_counter++;
  }
}

/**
 * @description this function adds an event listener to the edit and delete image elements
 * made by Yu-Hua Yang
 */
function addEventListenerToImageOfEditAndDelete(){
  let images = document.querySelectorAll("img");

  for (let i = 0; i<images.length - 1 ; i += 2){
    images[i].addEventListener("click", function() {editTableRow(images[i])});
    images[i+1].addEventListener("click", function() {deleteTableRow(images[i+1])});
  }
}

/**
 * @description this function takes in an array and a query, and then creates a new array that includes the elements being queried, and then creates and returns the new array.
 * @param {array} object_array - array of objects
 * @param {String} query - string to be queried
 * @returns Queried Array
 * made by Charles-Alexandre Bouchard
 */
function objArrQuery(object_array, query) {
  let newQueriedArr;
  const StrtoRegx = new RegExp(query);
  newQueriedArr = object_array.filter(filterByString);

  function filterByString(obj){
    if(validateElement(StrtoRegx, obj.id) || validateElement(StrtoRegx, obj.owner_name) || validateElement(StrtoRegx, obj.title) || validateElement(StrtoRegx, obj.category) || validateElement(StrtoRegx, obj.hours) || validateElement(StrtoRegx, obj.rate) || validateElement(StrtoRegx, obj.status) || validateElement(StrtoRegx, obj.description)){
      return true;
    }
    return false;
  }

  return newQueriedArr;
}

/**
 * @description this function updates or modifies the table, depending if there is an element being queried.
 * @param {element} elem - html element
 * made by Charles-Alexandre Bouchard
 */
function queryHandl(elem){
  let QueriedArr = objArrQuery(all_project_array, elem.value);
  if(elem.value == "" || QueriedArr[0] == null){
    createTableFromArrayObjects(all_project_array);
  }
  else{
    createTableFromArrayObjects(QueriedArr);
  }
}

/**
 * @description this function resets every input on the html page
 * made by Charles-Alexandre Bouchard
 */
function resetButton(){
  let proj_id = document.getElementById("project_id");
  let owner = document.getElementById("owner_name");
  let title = document.getElementById("title");
  let category = document.getElementById("category");
  let hours = document.getElementById("hours");
  let rate = document.getElementById("rate");
  let status = document.getElementById("status");
  let short_description = document.getElementById("short_description");
  proj_id.value = "";
  owner.value = "";
  title.value = "";
  category.value = "-------";
  hours.value = "";
  rate.value = "";
  status.value = "-------";
  short_description.value = "";
}

/**
   * @description enables the add buttons if the global boolean array is all true
   * made by Yu-Hua Yang
   */
function enableButton(){

  let array_checker_number = 0;
  let add_button = document.getElementById("add_btn");

  for(let i = 0; i < input_value_validation.length; i++){
      if(input_value_validation[i] == false){
          array_checker_number++;
      }
  }

  if(array_checker_number == 0){
      enable_disable_Button(add_button, false);
  }
  else{
      enable_disable_Button(add_button, true);
  }
}

/**
 * @description creates the table
 * made by Yu-Hua Yang
 */
 function buttonIntializeTable(){
  let object_project = createProjectObject();
  all_project_array.push(object_project);
  createTableFromArrayObjects(all_project_array);
  status_bar.textContent = "added a row";
}

/**
 * @description this function validates the data entered in the website using the regex pattern given
 * @param {id} element_id - id of element given
 * made by Yu-Hua Yang
 */
 function user_input_validate(element_id){

  let regex_pattern;
  let error_message;

  switch(element_id){
      case "project_id":
          regex_pattern = regex_proj_id;
          error_message = "Must start with alphabet, and may contain only alpha numeric, dash, $ or underscore (between 3 to 10 chars)";
          break;
      case "owner_name":
          regex_pattern = regex_owner;
          error_message = "Must start with alphabet, and may contain only alpha numeric or dash (between 3 to 10 chars)";
          break;
      case "title":
          regex_pattern = regex_proj_title;
          error_message = "Must be a word between 3 to 25 chars";
          break;
      case "hours":
          regex_pattern = regex_nber_hours;
          error_message = "Must be a positive number and 3 digits only";
          break;
      case "rate":
          regex_pattern = regex_rate;
          error_message = "Must be a positive number and 3 digits only"
          break;
      case "short_description":
          regex_pattern = regex_proj_description;
          error_message = "Must be a text between 3 to 65 chars";
          break;
  }

  let validation_boolean = validateElement(regex_pattern, document.getElementById(element_id).value);
  setElementFeedback(element_id, error_message, validation_boolean);
  updateInputValueValidationArray(element_id, validation_boolean);
  enableButton();
 }

 /**
   * @description this function validates the data entered in the website using the regex pattern given
   * @param {id} element_id - id of element
   * made by Yu-Hua Yang
   */
  function select_validate(element_id){
    let validation_boolean;
    if(document.getElementById(element_id).value === "-------"){
        validation_boolean = false;
        setElementFeedback(element_id, "Please select a option other than -------", validation_boolean); 
    }else{
        validation_boolean = true;
        setElementFeedback(element_id, "", validation_boolean);
    }
    updateInputValueValidationArray(element_id, validation_boolean);
    enableButton();
}

/**
 * @description this function updates the global boolean array variable: input_value_validation
 * @param {id} element_id - id of element given
 * @param {boolean} validation_boolean - true or false
 * made by Yu-Hua Yang
 */
 function updateInputValueValidationArray(element_id, validation_boolean){
  let array_index = table_headers.indexOf(element_id);
  input_value_validation[array_index] = validation_boolean;
}
