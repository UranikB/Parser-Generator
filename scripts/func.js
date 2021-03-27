function addField(){
    const container = document.getElementById("input-form");

    const inputField = document.createElement("div");
    inputField.classList.add("input-field");

    const input1 = document.createElement("input");
    input1.classList.add("nonterminal");
    input1.maxLength = 1;
    input1.type = "text";

    const arrow = document.createElement("span");
    arrow.innerHTML = "&#8594;";


    const input2 = document.createElement("input");
    input2.classList.add("production-rule");
    input2.type = "text";

    inputField.innerHTML = "<button class=\"delete-field-button\" onclick=\"deleteField(this)\"><img src=\"../resources/trash.svg\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.insertBefore(inputField, document.getElementById("add-field-button"));
}

function deleteField(button){
    let field = button.parentNode;
    field.parentElement.removeChild(field)
}

function showFirst(){
    document.getElementById("first-container").style.visibility = "visible";
}

function showFollow(){
    document.getElementById("follow-container").style.visibility = "visible";
}