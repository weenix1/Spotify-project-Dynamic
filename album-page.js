/* const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (min < 10) {
        min = 0${min};
    }
    if (sec < 10) {
        sec = 0${sec};
    }
    return ${min}:${sec};
}; */

window.onload = () => {
    let idParams = new URLSearchParams(window.location.search)

        let id = idParams.get("id")
        let name = idParams.get('name')

        console.log(id, name)
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + name , {
    }).then(response => response.json())
    .then(body => {
        console.log(body)
        let container = document.getElementById("row-tracks")
        for (let i = 0; i < body.data.length; i++) {
            let col = document.createElement("div")
            col.innerHTML = `
                <div class="row">
                    <div class="col-1">
                    <p class="song-number">${i + 1}</p>
                    </div>
                    <div class="col-10">
                    <p class="song-text">${body.data[i].title}</p>
                    <span class="br"></span>
                    <p class="song-artist align-top">${body.data[i].artist.name}</p>
                    </div>
                    <div class="col">
                    <p class="song-time">${body.data[i].duration}</p>
                    </div>
                </div>
            `
            container.appendChild(col)
                          
        }
        let containerPic = document.getElementById("photo-of-artist")
        let col = document.createElement("div")
        col.innerHTML = `
        <div class="col-12 d-flex">
            <img src="${body.data[0].album.cover_medium}" class="img-fluid" style="height: 232px; width: 232px; margin: 30px; filter: drop-shadow(30px 10px 4px #0000001f);">
            <div class="d-flex flex-column justify-content-end" style="margin-bottom: 30px;">
                <div>
                    <h2 style="font-size: 12px; color: white; font-weight: bold;">ALBUM</h2>
                </div>
                <div>
                    <h1 style="color: white; font-weight: bold;">${body.data[0].album.title}</h1>
                </div>
                <div class="d-flex align-items-center">
                    <img src="${body.data[0].artist.picture_small}" style="height: 24px; width: 24px; border-radius: 50%; object-fit: cover; margin-right: 5px;">
                    <h2 style="font-size: 14px; color: white; margin-bottom: 0; font-weight: bold;">${body.data[0].artist.name}</h2>
                    <span class="text-muted" style="font-size: 14px; margin-left: 5px;">• 2018 • ${body.data.length} songs , 1 hr 19 min</span>
                </div>
            </div>
        </div>
        `
        containerPic.appendChild(col)
    }).catch(e => console.log(e))
}