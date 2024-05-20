getToDos();

function getToDos() {
    axios.get('/todos').then((response) => {
        appendToDosToDom(response.data);
    });
}


function appendToDosToDom(toDoList) {
    let toDosLists = document.querySelector("#outPut")
    toDosLists.innerHTML = '';
    for (let toDos of toDoList) {


    
        toDosLists.innerHTML += 
        
        `
       <li id=list data-testid="toDoItem" class=${toDos.isComplete? 'completed':'notCompleted'}>${toDos.text}
        <button class="completedBtn" onClick="changeToCompleted('false',${toDos.id})" data-testid="completeButton"> complete </button> 
        <button onClick="deleteToDos(${toDos.id})" data-testid="deleteButton"> 
        Delete 
        </button> 
        </li>
    `;
    



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

function changeToCompleted(completed, completeId) {   
    axios({
        method: "PUT",
        url: "/todos/complete/" + completeId,
        data: {
            completed: completed
        }
        
    })
    .then((response) => {
        getToDos()
    })
    .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    })


}




function deleteToDos(toDosId) {
    axios({
        method: "DELETE",
        url: `/todos/${toDosId}`
    })
    .then((response) => {
        getToDos();
    }).catch((error) => {
        alert('Something went wrong');
    });
}


