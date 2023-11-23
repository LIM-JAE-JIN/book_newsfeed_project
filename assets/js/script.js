async function getTodoItemsFromServer() {
    const response = await fetch("http://localhost:3000/todo-items")
    const items = await response.json()
    return items
}

async function postTodoItem(title) {
    const response = await fetch("http://localhost:3000/todo-items", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title
        })
    })
    return response.json()
}

async function deleteTodoItem(id) {
    const response = await fetch(`http://localhost:3000/todo-items/${id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
    })
    return response.json()
}

async function patchToggleStatusTodoItem(id) {
    const response = await fetch(`http://localhost:3000/todo-items/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
    })
    return response.json()
}

function addItem(item) {
    const c = item.status === "done" ? "danger" : ""
    const html =
        `<li data-id="${item.id}" class="animated flipInX ${c}">
            <div class="checkbox">
                <span class="close"><i class="fa fa-times"></i></span>
                <label><span class="checkbox-mask"></span><input type="checkbox" />${item.title}</label>
            </div>
        </li>`

    $(".todo-list").append(html)
    $(".no-items").addClass("hidden")

    $(".form-control")
        .val("")
        .attr("placeholder", "✍️ Add item...")
    setTimeout(function () {
        $(".todo-list li").removeClass("animated flipInX")
    }, 500)
}

function setHeaderByDay() {
    const todayContainer = document.querySelector(".today")
    const weekday = [
        "Sunday 🖖",
        "Monday 💪😀",
        "Tuesday 😜",
        "Wednesday 😌☕️",
        "Thursday 🤗",
        "Friday 🍻",
        "Saturday 😴"
    ]

    const n = weekday[new Date().getDay()]
    const randomWordArray = [
        "Oh my, it's ",
        "Whoop, it's ",
        "Happy ",
        "Seems it's ",
        "Awesome, it's ",
        "Have a nice ",
        "Happy fabulous ",
        "Enjoy your "
    ]

    const randomWord =
        randomWordArray[Math.floor(Math.random() * randomWordArray.length)]
    todayContainer.innerHTML = randomWord + n
}

(async () => {
    this.todoItems = await getTodoItemsFromServer()

    function syncTodoItemsWithDisplay(todoItems) {
        $(".todo-list").html("")

        todoItems.forEach(item => {
            addItem(item)
        })
    }

    function syncTodoItems(newOtoItems) {
        this.todoItems = [...newOtoItems]
        return () => {
            syncTodoItemsWithDisplay(this.todoItems)
        }
    }

    function getTodoItemsFrom() {
        return this.todoItems
    }

    async function setToDone(id) {
        try {
            const todoItems = [...getTodoItemsFrom()]
            const todoItemIndex = todoItems.findIndex(item => item.id === id)
            const updatedItem = await patchToggleStatusTodoItem(id)
            todoItems.splice(todoItemIndex, 1, updatedItem)
            syncTodoItems(todoItems)
        } catch {
            alert("처리에 실패 했습니다. 다시 시도 해 주세요")
        }
    }

    $(".todo-list").on("click", 'input[type="checkbox"]', function () {
        const li = $(this)
            .parent()
            .parent()
            .parent()
        li.toggleClass("danger")
        li.toggleClass("animated flipInX")

        setToDone(li.data().id)
        setTimeout(function () {
            li.removeClass("animated flipInX")
        }, 500)
    })

    $(".todo-list").on("click", ".close", async function () {
        try {
            const box = $(this)
                .parent()
                .parent()
            await deleteTodoItem(box.data().id)
            box.removeClass("animated flipInX").addClass("animated bounceOutLeft")
            setTimeout(function () {
                box.remove()
            }, 500)
        } catch (e) {
            alert("삭제 실패 했습니다. 다시 시도 해 주세요.")
        }

    })

    $(".add-btn").on("click", async function () {
        $("#form-item").submit()
    })

    $("#form-item").on("submit", async function (e) {
        e.preventDefault()
        const formControl = $(".form-control").first()
        const title = formControl.val()
        if (!title) {
            alert("할일을 먼저 작성 해 주세요.")
            return false
        }
        const newItem = await postTodoItem(title)
        addItem(newItem)
        formControl.focus()
    })

    $(".todo-list").sortable()
    $(".todo-list").disableSelection()


    setHeaderByDay()
    syncTodoItems(todoItems)()
})()

