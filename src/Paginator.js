import { getPost } from "./Posts";
const listPost = document.getElementsByClassName('list_post')[0] 
const paginatorItem = document.getElementsByClassName('paginatorItem')




export const addPaginator = () => {
    let fragment = new DocumentFragment();
    let ulPaginator = document.createElement('ul');
    ulPaginator.className = 'paginator'
    for (let i = 1; i <= 10; i++) {
        let li = document.createElement('li');
        li.className = "paginatorItem"
        li.textContent = i
        fragment.append(li);
    }
    
    ulPaginator.append(fragment)
    listPost.after(ulPaginator)

    for(let i = 0; i < paginatorItem.length; i++) {
        paginatorItem[i].addEventListener('click' , (e) => {
            getPost(e.target.textContent)
        })
    }
    
}