import { addPaginator } from "./Paginator";
const formAddTicketHidden = document.querySelector('.modal_add_post')
const listPost = document.getElementsByClassName('list_post')[0]
const buttonSubmit = formAddTicketHidden.querySelector('.button_submit')

const deletePost = (e) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${e}`, {
        method: 'DELETE',
    }).then(res => {
        if (res.status === 200) {
            let newArrPost = JSON.parse(localStorage.getItem("user")).filter(i => i.id !== +e)
            localStorage.setItem('user', JSON.stringify(newArrPost))
            document.getElementById(`${e}`).remove()
        }
    })
}

export async function getPost(e = 1) {
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(res => {
        localStorage.setItem('user', JSON.stringify(res))
        setListPost(e)
    })
}

const setListPost = (e) => {
    listPost.innerHTML = ''
    let fragment = new DocumentFragment();

    const listPostUsPage = JSON.parse(localStorage.getItem("user")).slice((e - 1) * 9, (e * 9) + 1)
    let addPost = document.createElement('div')
    for (let i = 0; i < 10; i++) {

        addPost.innerHTML = '<button class="add_post">Добавить пост</button>'
        addPost.addEventListener('click', () => {
            formAddTicketHidden.classList.remove('hide_item')
        })
        addPost.addEventListener('click', () => {

        })
        let li = document.createElement('li');
        let btnDel = document.createElement('button');
        btnDel.textContent = "Удалить пост"
        btnDel.setAttribute('id', listPostUsPage[i].id);
        btnDel.addEventListener('click', (e) => deletePost(e.target.id))
        li.className = "post"
        li.setAttribute('id', listPostUsPage[i].id)
        li.innerHTML =
            `
                            <h3>${listPostUsPage[i].title}</h3>
                            <p>${listPostUsPage[i].body}</p>
                            <div class = "details_post"><a href = #>Подробнее о постe</a></div>
                    
                        `
        li.append(btnDel)
        fragment.append(li);
    }
    listPost.prepend(addPost)
    listPost.append(fragment)
}

formAddTicketHidden.addEventListener('submit', (e) => {
    e.preventDefault()
    const dataForm = {}
    Array.from(formAddTicketHidden.elements)
        .filter(({ name }) => name)
        .forEach(({ name, value }) => {
            dataForm[name] = value;
        });
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify(dataForm)
    }).then(res => {
        if (res.status === 201) buttonSubmit.disabled = false
        e.target.reset();
        formAddTicketHidden.classList.add('hide_item')
    })
    console.log('Отправленный объект', dataForm)
    buttonSubmit.disabled = true
})

getPost()
addPaginator()
