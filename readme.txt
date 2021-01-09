my task 

feature
1. adding task
2. removing task
3. completed task
4. storage handling
5. updating time, day and date


issues:
1. array items/object
    id is always increasing and need to clear or reset in the dev-tool


<li class="new-task ${STATUS}">
    <span>${task}</span>
    <button class="btn btn-check" id="${id}" job="complete"><i class="fas fa-check"></i></button>
    <button class="btn btn-trash" id="${id}" job="remove"><i class="fas fa-trash"></i></button>
</li>