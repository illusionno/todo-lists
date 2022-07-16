let data = {}
let allList = document.querySelector('.all-list')
let finList = document.querySelector('.fin-list')
let unfList = document.querySelector('.unfi-list')
let allbtn = document.querySelector('.all')
let finbtn = document.querySelector('.fin')
let unfibtn = document.querySelector('.unfi')
let ipt = document.querySelector('.ipt')

// 输入新任务
ipt.addEventListener('keydown', (e) =>
{
    // 监听回车键
    if (e.keyCode === 13) {
        handleSubmit()
    }
})
// 页面刷新
window.addEventListener('load', showList)
// 已完成列表
finbtn.addEventListener('click', showFinList)
// 未完成列表
unfibtn.addEventListener('click', showUnfiList)
// 全部列表
allbtn.addEventListener('click', showList)
// 新增节点
function handleSubmit()
{
    // 获取输入框中值
    let iptText = ipt.value
    if (iptText.trim() === '') {
        alert('请输入任务！')
        ipt.value = ''
        return;
    }
    let date = Date.now()
    // 创建节点
    let li = document.createElement('li')
    li.id = date
    let span = document.createElement('span')
    let content = document.createTextNode(iptText)
    let img = document.createElement('img')
    img.src = "./delete.png"
    img.className = 'del-icon'
    img.addEventListener("click", handleClick);
    // 插入节点
    span.appendChild(content)
    span.style = "color:#fff"
    li.appendChild(span)
    li.appendChild(img)
    allList.appendChild(li)
    data[date] = {
        text: iptText,
        finished: false
    }
    // 存储到localStorage
    localStorage.setItem('data', JSON.stringify(data))
    ipt.value = ''
}

// 显示所有列表
function showList()
{
    data = JSON.parse(localStorage.getItem('data') || {})
    clear(finList)
    clear(allList)
    clear(unfList)
    for (let key in data) {
        let li = document.createElement('li')
        li.id = key
        let span = document.createElement('span')
        let content = document.createTextNode(data[key].text)
        // let allNum=document.createTextNode(data[key].length)
        console.log(data);
        let img = document.createElement('img')
        img.src = "./delete.png"
        img.className = 'del-icon'
        img.addEventListener("click", handleClick);
        span.addEventListener('click', revertDelete);
        // 插入节点
        span.appendChild(content)
        // i.appendChild(allNum)
        li.appendChild(span)
        li.appendChild(img)
        if (data[key].finished) {
            li.style = 'text-decoration:line-through'
        }
        allList.appendChild(li)
        allList.style = "color:#fff"
    }
   
}
// 显示已完成列表
function showFinList()
{
    data = JSON.parse(localStorage.getItem('data') || {})
    clear(allList)
    clear(finList)
    clear(unfList)
    // clear(unfList)
    for (let key in data) {
        if (data[key].finished) {
            let li = document.createElement('li')
            li.id = key
            let span = document.createElement('span')
            let content = document.createTextNode(data[key].text)
            li.style = 'text-decoration:none'
            let img = document.createElement('img')
            img.src = "./delete.png"
            img.className = 'del-icon'

            //     li.innerHTML = `<li>
            //     <span>${data[key].text}</span>
            //     <img src="./delete.png" alt="删除" class="del-icon"/>
            //   </li>`
            span.addEventListener('click', revertDelete);
            li.style = 'text-decoration:line-through'
            span.appendChild(content)
            span.style = "color:#fff"
            li.appendChild(span)
            li.appendChild(img)
            li.appendChild(img)
            finList.appendChild(li)
            finList.style = "color:#fff"
        }
    }
}
// 显示未完成列表
function showUnfiList()
{
    data = JSON.parse(localStorage.getItem('data') || {})
    clear(allList)
    clear(finList)
    clear(unfList)
    for (let key in data) {
        if (!data[key].finished) {
            let li = document.createElement('li')
            li.id = key
            let span = document.createElement('span')
            let content = document.createTextNode(data[key].text)
            li.style = 'text-decoration:none'
            let img = document.createElement('img')
            img.src = "./delete.png"
            img.className = 'del-icon'
            img.addEventListener("click", handleClick);
            span.appendChild(content)
            span.style = "color:#fff"
            li.appendChild(span)
            li.appendChild(img)
            li.appendChild(img)
            unfList.appendChild(li)
            unfList.style = "color:#fff"
        }
    }
}
// 点击删除
function handleClick(e)
{
    let li = e.target.parentNode
    let key = li.id
    li.style = 'text-decoration:line-through'
    data[key].finished = true
    localStorage.setItem('data', JSON.stringify(data))
}
// 撤销
function revertDelete(e)
{
    let li = e.target.parentNode
    let key = li.id
    li.style = 'text-decoration:none'
    data[key].finished = false
    localStorage.setItem('data', JSON.stringify(data))
}
// 移除节点
function clear(list)
{
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}