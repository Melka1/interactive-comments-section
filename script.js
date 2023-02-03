function handleReply(id, type, username){
    let element = ` <div class="comment--reply ${type}">
                        <img src="./images/avatars/image-juliusomo.png" alt="">
                        <textarea name="reply" id="" cols="30" rows="10">@${username} </textarea>
                        <button class="button--reply" onclick="handleReplying('${id}', '${type}')">REPLY</button>
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
    $(`#${id}`).children(".comment--container").append(`<button onclick="handleUpdate('${id}', '${type}')" class="button--update">UPDATE</button>`)
}

function handleUpdate(id, type){
    let comment = $(`#${id} textarea`).val()
    $(`#${id} textarea`).parent().append(`<p class="comment"></p>`)
    $(`#${id} textarea`).remove()
    $(`#${id} .button--update`).remove()
    $(`#${id} .comment`).text(comment)
}

function handleReplying(id, type){
    let i = 1;
    while(document.querySelector(`#${id}rply${i}`)){
        i++;
    }

    let kind = id
    let number = (type=="sub")?kind.replace("submsg", ""):kind.replace("msg","")
    let num = parseInt(number)
    console.log(number, num)
    let comment = $(`#${id}`).next().children('textarea').val()
    console.log(comment)
    $(`#${id}`).next().remove()
    let commentSection = `
    <div class="comment--section ${type}"  id="${id}rply${i}">
        <div class="score">
        <img src="./images/icon-plus.svg" alt="" class="plus">
        <p class="score--number">0</p>
        <img src="./images/icon-minus.svg" alt="" class="minus">
        </div>
        <div class="comment--container">
        <div class="header">
            <img class="profile--pic" src="./images/avatars/image-juliusomo.png" alt="">
            <p class="name">juliusomo</p>
            <p class="who">you</p>
            <p class="timestamp">Now</p>
            <div class="controls">
            <div class="delete">
                <img src="./images/icon-delete.svg" alt="">
                <p>Delete</p>
            </div>
            <div class="edit"  onclick="handleEdit('${id}rply${i}', '${type}')">
                <img src="./images/icon-edit.svg" alt="" >
                <p>Edit</p>
            </div>
            <div class="reply">
            </div>
            </div>
        </div>
        <div class="comment--content">
            <p class="comment"></p>
        </div>
        </div>
    </div>`;
  $(`#${id}`).after(commentSection)
  $(`#${id}rply${i} .comment`).text(comment)
}



let element;
const newComment = async()=>{
    await fetch("./data.json")
        .then(res=>res.json())
        .then(data=> {
            element = data.comments.map(com=>{
                return `
                <div class="comment--section main"  id="mainmsg${com.id}">
                    <div class="score">
                    <img src="./images/icon-plus.svg" alt="" class="plus">
                    <p class="score--number">${com.score}</p>
                    <img src="./images/icon-minus.svg" alt="" class="minus">
                    </div>
                    <div class="comment--container">
                    <div class="header">
                        <img class="profile--pic" src="${com.user.image.png}" alt="">
                        <p class="name">${com.user.username}</p>
                        <p class="timestamp">${com.createdAt}</p>
                        <div class="controls">
                        <div class="delete">
                        </div>
                        <div class="edit"></div>
                        <div class="reply" onclick="handleReply('mainmsg${com.id}', 'main', '${com.user.username}')" >
                            <img src="./images/icon-reply.svg" alt="" >
                            <p>Reply</p>
                        </div>
                        </div>
                    </div>
                    <div class="comment--content">
                        <p class="comment">${com.content}</p>
                    </div>
                    </div>
                </div>`
            })
        })

        $("#root").prepend(element)
        return element
}
newComment();