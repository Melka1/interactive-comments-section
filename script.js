
function handleReply(id, type, username){
    let element = ` <div class="comment--reply ${type}">
                        <img src="./images/avatars/image-juliusomo.png" alt="">
                        <textarea name="reply" id="" cols="30" rows="10">@${username} </textarea>
                        <button class="button--reply">REPLY</button>
                    </div>`
    $(`#${id}`).after(element)
}

function handleEdit(id, type){
    let comment = $(`#${id} .comment`).text()
    let element = '<textarea cols="30" rows="10"></textarea>'
    $(`#${id} .comment`).remove()
    $(`#${id} .${type}`).append(element)
    $(`#${id} textarea`).val(comment)
    $(`#${id} .${type}`).parent().append(`<button onclick="handleUpdate('${id}', '${type}')" class="button--update">UPDATE</button>`)
}

function handleUpdate(id, type){
    let comment = $(`#${id} textarea`).val()
    $(`#${id} textarea`).parent().append(`<p class="comment"></p>`)
    $(`#${id} textarea`).remove()
    $(`#${id} .button--update`).remove()
    $(`#${id} .comment`).text(comment)
}