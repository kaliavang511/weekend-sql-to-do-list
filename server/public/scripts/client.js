getToDos();

function getToDos() {
    axios.get('/todos').then((response) => {
        appendToDosToDom(response.data);
    });
}


function appendToDosToDom(toDoList) {
    let toDosBody = document.querySelector("#outPut")
    toDosBody.innerHTML = '';
    for (let toDos of toDoList) {
        toDosBody.innerHTML += `
       
                <li data-testid="toDoItem" class="completed">
                ${toDos.text}
                </li>

                <li>
                <button onClick="deleteToDos"(${toDos.id})">
                delete
                </button>
               </li>

      
      
                
        `
    }
}


function postList(event){
    event.preventDefault();
    let payloadObject = {
        text: document.querySelector('#todosinput').value
    }
 console.log(payloadObject)

    axios.post('/todos', payloadObject).then((response) => {
        getToDos();
    }).catch((error) => {
        alert('Something went wrong');
    });
  
}




function deleteToDos(toDosId) {
    axios({
        method: "DELETE",
        url: `/todos/${toDosId}`
    })
    .then((response) => {
        getToDos();
    }).catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
}


