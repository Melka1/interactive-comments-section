let svgPlus = (id) => `<svg onclick='add("${id}")' width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg>`
let svgMinus = (id) => `<svg onclick='minus("${id}")' width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>`
let svgReply = `<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"/></svg>`
let svgDelete = `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"/></svg>`
let svgEdit = `<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"/></svg>`
let pos;
window.addEventListener('scroll', function(){
    pos = this.scrollY
})

function add(id){
    let num = $(`#${id} .score p`).text()
    $(`#${id} .score p`).text(parseInt(num) + 1)
}

function minus(id){
    let num = $(`#${id} .score p`).text()
    if(num>0)$(`#${id} .score p`).text(parseInt(num) - 1);
}

function handleReply(id, type, username){
    let element = ` <div class="comment--reply ${type}">
                        <div class="reply--container">
                            <img src="./images/avatars/image-juliusomo.png" alt="">
                            <textarea name="reply" id="" cols="30" rows="10">@${username}, </textarea>
                            <button class="button--reply" onclick="handleReplying('${id}', '${type}')">REPLY</button>
                        </div>
                    </div>`
    $(`#${id}`).after(element)
}

function handleEdit(id, type){
    let comment = $(`#${id} .comment`).text()
    let element = '<textarea cols="30" rows="10"></textarea>'
    $(`#${id} .comment`).remove()
    $(`#${id} .comment--content`).append(element)
    $(`#${id} textarea`).val(comment)
    console.log(id)
    $(`#${id} .comment--content`).append(`<button onclick="handleUpdate('${id}', '${type}')" class="button--update">UPDATE</button>`)
}

function handleUpdate(id, type){
    let comment = $(`#${id} textarea`).val()
    $(`#${id} textarea`).parent().append(`<p class="comment"></p>`)
    $(`#${id} textarea`).remove()
    $(`#${id} .button--update`).remove()
    $(`#${id} .comment`).html(handleUser(comment))
}

function handleUser(comment){
    let regex = /^[@]\w+,*\s*/g; // starts with @ and ends with , and some username in between

    console.log(regex.test(comment))
    if(comment.match(regex)){
        console.log(comment.match(regex))
        let commented = comment.match(regex)
        comment = comment.replace(regex, `<span class='username'>${commented[0]}</span>`)
    }
    return comment
}

function handleReplying(id, type){
    let i = 0;
    while(document.querySelector(`#${id}rply${i}`)){
        i++;
    }

    let kind = id
    let number = (type=="sub")?kind.replace("submsg", ""):kind.replace("mainmsg","")
    let num = parseInt(number)
    console.log(id,number, num)
    let user = JSON.parse(localStorage.getItem("data")).currentUser;
    console.log(user)
    let comment = $(`#${id}`).next().find('textarea').val()
    console.log(comment)

    $(`#${id}`).next().remove()
    let commentSection = `
    <div class="comment--section ${type}"  id="${id}rply${i}">
        <div class="comment--container">
        <div class="score">
        ${svgPlus(`${id}rply${i}`)}
        <p class="score--number">0</p>
        ${svgMinus(`${id}rply${i}`)}
        </div>
        
        <div class="header">
            <img class="profile--pic" src="${user.image.png}" alt="">
            <p class="name">${user.username}</p>
            <p class="who">you</p>
            <p class="timestamp">Now</p>
        </div>
            
        <div class="controls">
            <div class="delete" onclick="handleDelete('${id}rply${i}')">
                ${svgDelete}
                <p>Delete</p>
            </div>
            <div class="edit"  onclick="handleEdit('${id}rply${i}', '${type}')">
                ${svgEdit}
                <p>Edit</p>
            </div>
        </div>

        <div class="comment--content">
            <p class="comment"></p>
        </div>
        </div>
    </div>`;
  $(`#${id}`).after(commentSection)
  $(`#${id}rply${i} .comment`).html(handleUser(comment))
}

function handleSend() {
    let user = JSON.parse(localStorage.getItem("data")).currentUser;
    console.log(user)
    let userName = user.username;
    let comment = $(".comment--add textarea").val()
    $(".comment--add textarea").val("")
    let i = 0;
    while(document.querySelector(`#mainmsg${i}`)){
        i++;
    }

    $(".comment--add").before(`
    <div class="comment--section main"  id="mainmsg${i}">
    <div class="comment--container">
        <div class="score">
        ${svgPlus(`mainmsg${i}`)}
        <p class="score--number">0</p>
        ${svgMinus(`mainmsg${i}`)}
        </div>
        
        <div class="header">
            <img class="profile--pic" src="${user.image.png}" alt="">
            <p class="name">${userName}</p>
            <p class="who">you</p>
            <p class="timestamp">Now</p>
        </div>
            
        <div class="controls">
            <div class="delete" onclick="handleDelete('mainmsg${i}')">
                ${svgDelete}
                <p>Delete</p>
            </div>
            <div class="edit"  onclick="handleEdit('mainmsg${i}', 'main')">
                ${svgEdit} 
                <p>Edit</p>
            </div>
        </div>

        <div class="comment--content">
            <p class="comment">${handleUser(comment)}</p>
        </div>
        </div>
    </div>`)
}

function handleDelete(id){
    console.log(id)
    $(`body`).prepend(`
    <div class="delete--container" id="delete--container">
        <div class="cover"></div>
        <div class="delete--popup">
            <h1>Delete Comment</h1>
            <p>Are you sure you want to delete this comment? This will remove the comment and it can't be undone.</p>
            <div class="controls">
                <button onclick="cancelDelete()" class="cancel">NO, CANCEL</button>
                <button onclick="performDelete('${id}')" class="delete">YES, DELETE</button>
            </div>
        </div>
    </div>
    `)
    
    $("#delete--container").css("top", pos)
    $("body").css("overflow","hidden");
}

function cancelDelete(){
    $("#delete--container").remove()
    $("body").css("overflow","initial");
}

function performDelete(id){
    console.log(id)
    $(`#${id}`).remove()
    $("#delete--container").remove()
    $("body").css("overflow","initial");
}


const newComment = async()=>{
    let element;
    let subElement;

    await fetch("./data.json")
        .then(res=>res.json())
        .then(data=> {
            localStorage.setItem("data", JSON.stringify(data))
            element = data.comments.map((com, index)=>{
                return `
                <div class="comment--section main"  id="mainmsg${index}">
                <div class="comment--container">
                    <div class="score">
                        ${svgPlus(`mainmsg${index}`)}
                        <p class="score--number">${com.score}</p>
                        ${svgMinus(`mainmsg${index}`)}
                    </div>
                    
                    <div class="header">
                        <img class="profile--pic" src="${com.user.image.png}" alt="">
                        <p class="name">${com.user.username}</p>
                        ${data.currentUser.username==com.user.username?'<p class="who">you</p>':""}
                        <p class="timestamp">${com.createdAt}</p>
                    </div>
                        
                    <div class="controls">
                        ${data.currentUser.username==com.user.username?
                            `<div class="delete" onclick="handleDelete('mainmsg${index}')">
                                ${svgDelete}
                                <p>Delete</p>
                            </div>
                            <div class="edit"  onclick="handleEdit('mainmsg${index}', 'main')">
                                ${svgEdit}
                                <p>Edit</p>
                            </div>
                            </div>`:
                            `<div class="reply" onclick="handleReply('mainmsg${index}', 'main', '${com.user.username}')" >
                                ${svgReply}
                                <p>Reply</p>
                        </div>`}
                    </div>

                    <div class="comment--content">
                        <p class="comment">${handleUser(com.content)}</p>
                    </div>
                    </div>
                </div>`
            })
            let reply;
            subElement = data.comments.map(((com, index)=>{
                if(com.replies){
                    reply = com.replies.map((reply, ind)=>{
                        return `
                        <div class="comment--section sub"  id="mainmsg${index}submsg${ind}">
                            <div class="comment--container">
                            <div class="score">
                            ${svgPlus(`mainmsg${index}submsg${ind}`)}
                            <p class="score--number">${reply.score}</p>
                            ${svgMinus(`mainmsg${index}submsg${ind}`)}
                            </div>
                            <div class="header">
                                <img class="profile--pic" src="${reply.user.image.png}" alt="">
                                <p class="name">${reply.user.username}</p>
                                ${data.currentUser.username==reply.user.username?'<p class="who">you</p>':""}
                                <p class="timestamp">${reply.createdAt}</p>
                            </div>

                            <div class="controls">
                                ${data.currentUser.username==reply.user.username?
                                `<div class="delete" onclick="handleDelete('mainmsg${index}submsg${ind}')">
                                    ${svgDelete}
                                    <p>Delete</p>
                                </div>
                                <div class="edit"  onclick="handleEdit('mainmsg${index}submsg${ind}', 'sub')">
                                    ${svgEdit}
                                    <p>Edit</p>
                                </div>`:
                                `<div class="reply" onclick="handleReply('mainmsg${index}submsg${ind}', 'sub', '${reply.user.username}')" >
                                    ${svgReply}
                                    <p>Reply</p>
                                </div>`}
                            </div>
                            <div class="comment--content">
                                <p class="comment">${handleUser(`@${reply.replyingTo}, ${reply.content}`)}</p>
                            </div>
                            </div>
                        </div>` 
                    })
                }
                return reply
            }))
            
        })

        $("#root").prepend(element)
        console.log(subElement)
            if(element){subElement.forEach((elem, index) => {
                if(elem.length){
                    elem.forEach((rep, ind) => {
                        if(ind == 0)$(`#mainmsg${index}`).after(rep);
                        else {
                            $(`#mainmsg${index}submsg${ind-1}`).after(rep);
                        }
                    })
                }
            })}
        return element
}
newComment();

