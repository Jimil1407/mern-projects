class todo{
    constructor(){
        this.todos = []
    }

    add(todo){
        this.todos.push(todo);
    }

    remove(index){
        this.todos.splice(index,1);
    }

    update(index,updatedtodo){
        this.todos[index] = updatedtodo
    }

    getAll(){
        return this.todos;
    }

    get(indexOftodo){
        return this.todos[indexOftodo];
    }

    clear(){
        this.todos = [];
    }
}

module.exports = todo;