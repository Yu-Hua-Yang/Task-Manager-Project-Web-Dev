//Yu Hua Yang, 2133677
//Charles-Alexandre Bouchard 2135704
"use strict";
/**
 * @description Initialize some global variables 
 * made by Yu-Hua Yang
 */
//All_project_arry (array to hold different project objects) 
const table_headers= ["project_id","owner_name","title","category","hours","rate","status","short_description"]; 
let all_project_array = new Array();
let input_value_validation = [false, false, false, false, false, false, false, false];
//global regex variables for data validation
const regex_proj_id = /^[a-zA-Z][a-zA-Z0-9_-]{3,10}$/;
const regex_owner = /^[a-zA-Z][a-zA-Z-_ ]{3,10}$/;
const regex_proj_title = /^[a-zA-Z ]{3,25}$/;
const regex_nber_hours = /^[0-9]{1,3}$/;
const regex_rate = /^[0-9]{1,3}$/;
const regex_proj_description = /^.{3,65}$/;
//Buttons to handle application responsiveness  
let status_bar;

/**
 * @description loading the DOM and then adding all the eventlisteners and initializing the variables 
 * made by Yu-Hua Yang and added upon by Charles-Alexandre Bouchard
*/
window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM has been fully loaded and parsed able to proceed');
    
    let button_add = document.getElementById("add_btn");
    let button_write = document.getElementById("write_btn");
    let button_append = document.getElementById("append_btn");
    let button_clear = document.getElementById("clear_btn");
    let button_load = document.getElementById("load_btn");
    let button_reset = document.getElementById("reset_btn");
    let query = document.getElementById("query");
    status_bar = document.getElementById("status_bar");
    let table = document.getElementById("generated_table");
    let proj_id = document.getElementById("project_id");
    let owner = document.getElementById("owner_name");
    let title = document.getElementById("title");
    let category = document.getElementById("category");
    let hours = document.getElementById("hours");
    let rate = document.getElementById("rate");
    let status = document.getElementById("status");
    let short_description = document.getElementById("short_description");

    button_add.addEventListener("click", buttonIntializeTable);
    query.addEventListener("keyup", function(){queryHandl(query)});
    button_reset.addEventListener("click", resetButton);
    button_write.addEventListener("click", saveAllProjects2Storage);
    button_append.addEventListener("click", appendAllProjects2Storage);
    button_clear.addEventListener("click", clearAllProjectsFromStorage);
    button_load.addEventListener("click", readAllProjectsFromStorage);

    [category, status].forEach( element => {
        element.addEventListener("change", function(event) {select_validate(event.target.id)});
    });
    [proj_id, owner, title, hours, rate, short_description].forEach( element => {
        element.addEventListener("keyup", function(event) {user_input_validate(event.target.id)});
    });

});
