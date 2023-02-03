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
        return element
}

export default newComment