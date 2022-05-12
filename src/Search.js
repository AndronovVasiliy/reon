const search = document.getElementsByClassName('search')[0]
const searchPost = document.getElementsByClassName('post')

search.addEventListener('input', (e) => {
    for (let i = 0; i < searchPost.length; i++) {
        let title = searchPost[i].getElementsByTagName('h3')[0].textContent
        let text = searchPost[i].getElementsByTagName('p')[0].textContent
        searchPost[i].classList.remove('hideItem')
        let value = e.target.value
        if (title.indexOf(value) < 0 || text.indexOf(value) < 0) {
            searchPost[i].classList.add('hideItem')
        }
    }
})