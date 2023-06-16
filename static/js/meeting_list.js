//================================ 모임 글 목록 API 시작 ================================
fetch(`${BACKEND_BASE_URL}/meeting/`).then(res => res.json()).then(meetings => {
    meetings.forEach((meeting) => {
        if (meeting.meeting_image[0]) {
            let id = meeting['id']
            let title = meeting['title']
            let user = meeting['user']
            let created_at = meeting['created_at']
            let comment_count = meeting['comment_count']
            let meeting_image = meeting['meeting_image'][0]['image']
            let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <img src="${BACKEND_BASE_URL}${meeting_image}" alt="">
                        <p>${user} 📄${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
            $('#meeting_card').append(temp_html)
        } else {
            let id = meeting['id']
            let title = meeting['title']
            let user = meeting['user']
            let created_at = meeting['created_at']
            let comment_count = meeting['comment_count']
            let content = meeting['content']
            let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${user} 📄${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
            $('#meeting_card').append(temp_html)
        }
    })
})
//================================ 모임 글 목록 API 끝 ================================

//================================ 모임 글 검색 API 시작 ================================ 
function meetingSearch() {
    let search_field = $('#search_select').val()
    let search_key = $('#meeting_search').val()
    $('#meeting_card').empty()
    fetch(`${BACKEND_BASE_URL}/meeting/search_${search_field}/?search=${search_key}`).then(res => res.json()).then(meetings => {
        meetings.forEach((meeting) => {
            if (meeting.meeting_image[0]) {
                let id = meeting['id']
                let title = meeting['title']
                let user = meeting['user']
                let created_at = meeting['created_at']
                let comment_count = meeting['comment_count']
                let meeting_image = meeting['meeting_image'][0]['image']
                console.log(meeting_image)
                let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <img src="${meeting_image}" alt="">
                        <p>${user} 📄${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
                $('#meeting_card').append(temp_html)
            } else {
                let id = meeting['id']
                let title = meeting['title']
                let user = meeting['user']
                let created_at = meeting['created_at']
                let comment_count = meeting['comment_count']
                let content = meeting['content']
                let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${user} 📄${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
                $('#meeting_card').append(temp_html)
            }
        })
    })
}
//================================ 모임 글 검색 API 끝 ================================ 
//================================ 모임 글 목록에서 북마크 하기 API 시작 ================================ 
async function meetingBookmark(id) {
    let response = await fetch(`${BACKEND_BASE_URL}/meeting/${id}/bookmark/`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2ODc3Mjg5LCJpYXQiOjE2ODY3OTA4ODksImp0aSI6IjJmYzA3YjBjYjUzNzRkNWM5MWRlNWM1YTQyZGQ2ODAwIiwidXNlcl9pZCI6MSwiZW1haWwiOiJuYnYxNDQzQGdtYWlsLmNvbSIsImFjY291bnQiOiJuYnYxNDQzIiwicGhvbmUiOiIwMDAwMDAwMDAwMCIsIm5pY2tuYW1lIjoiXHVhYzAwXHViY2Y0XHVjNzkwXHVhY2UwIn0.g0dN8h-FxNCsEw-zwXHGN-Df6R4zq7jy8t2rWHDs9Hk"
            // Authorization: localStorage.getItem('access_token'),
        },
    })
    if (response.status === 200) {
        alert("북마크 취소")
        // location.reload();
    } else {
        alert("북마크")
        // location.reload();
    }
}
//================================ 모임 글 목록에서 북마크 하기 API 끝 ================================ 

//================================ 북마크 한 모임 글 목록 보기 API 시작 ================================ 
function meetingBookmarkList() {
    $('#meeting_card').empty()
    fetch(`${BACKEND_BASE_URL}/meeting/bookmark_list`, {
        method: 'GET',
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2ODc3Mjg5LCJpYXQiOjE2ODY3OTA4ODksImp0aSI6IjJmYzA3YjBjYjUzNzRkNWM5MWRlNWM1YTQyZGQ2ODAwIiwidXNlcl9pZCI6MSwiZW1haWwiOiJuYnYxNDQzQGdtYWlsLmNvbSIsImFjY291bnQiOiJuYnYxNDQzIiwicGhvbmUiOiIwMDAwMDAwMDAwMCIsIm5pY2tuYW1lIjoiXHVhYzAwXHViY2Y0XHVjNzkwXHVhY2UwIn0.g0dN8h-FxNCsEw-zwXHGN-Df6R4zq7jy8t2rWHDs9Hk"
            // Authorization: localStorage.getItem('access_token'),
        },
    })
        .then(res => res.json()).then(meetings => {
            meetings.forEach((meeting) => {

                if (meeting.meeting_image[0]) {
                    let id = meeting['id']
                    let title = meeting['title']
                    let user = meeting['user']
                    let created_at = meeting['created_at']
                    let comment_count = meeting['comment_count']
                    let meeting_image = meeting['meeting_image'][0]['image']
                    let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <img src="${BACKEND_BASE_URL}${meeting_image}" alt="">
                        <p>${user} ${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
                    $('#meeting_card').append(temp_html)
                } else {
                    let id = meeting['id']
                    let title = meeting['title']
                    let user = meeting['user']
                    let created_at = meeting['created_at']
                    let comment_count = meeting['comment_count']
                    let content = meeting['content']
                    let temp_html = `
                        <div  OnClick="location.href ='${FRONTEND_BASE_URL}/meeting_detail.html?id='+${id}" style="cursor:pointer;" >
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${user} ${comment_count} ${created_at}</p>
                        </div>
                        <button onclick="meetingBookmark(${id})">📖</button>
                        `
                    $('#meeting_card').append(temp_html)
                }
            })
        })
}
//================================ 북마크 한 모임 글 목록 보기 API 끝 ================================ 