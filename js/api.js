var base_url = "https://api.football-data.org/v2/";
var option = {
  method: "get",
  mode: "cors",
  headers: {
    "X-Auth-Token": "3143678a4e5940409fe6dd2bc834d09a"
  }
};

function status(response) {
  if (response.status !== 200) {
    console.log("Error " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return response;
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error :" + error);
}

function getStandings() {
  fetch(base_url + "competitions/2021/standings", option)
    .then(status)
    .then(json)
    .then(function(data) {
      var seasonHTML = "";
      var contentHTML = "";
      seasonHTML += `
                <div class="row">
                    <h4>Season</h4>
                    <h6 class="green-text">${data.season.startDate} - ${data.season.endDate}</h6>
                </div>  
      `;
      document.querySelector("#title-season").innerHTML = seasonHTML;

      data.standings[0].table.forEach(function(table, index) {
        var url = table.team.crestUrl.replace(/^http:\/\//i, "https://");
        contentHTML += `
                    <tr>
                        <td>${table.position} <img style="max-width: 25px;max-height: 25px;" class="circle" src="${url}"/> ${table.team.name}</td>
                        <td>${table.playedGames}</td>
                        <td>${table.won}</td>
                        <td>${table.draw}</td>
                        <td>${table.lost}</td>
                        <td>${table.goalsFor}</td>
                        <td>${table.goalsAgainst}</td>
                        <td>${table.goalDifference}</td>
                        <td>${table.points}</td>
                        <td><a href="./detail.html?id=${table.team.id}" class="waves-effect waves-light btn">Detail</a></td>
                        <td><button onclick="addTeam(${table.team.id},'${table.team.name}','${url}')" class="waves-effect waves-darken btn">Add</a></td>
                    </tr>
                `;
      });

      document.querySelector("#table-team-content").innerHTML = contentHTML;
    })
    .catch(error);
}

function getMatches() {
  fetch(base_url + "competitions/2021/matches", option)
    .then(status)
    .then(json)
    .then(function(data) {
      var title_match = `
            <div class="row">
                <h4>${data.competition.name}</h4>
                <h6 class="green-text">Last update : ${data.competition.lastUpdated}</h6>
            </div>
        `;

      document.querySelector("#title-matches").innerHTML = title_match;
      var matchesHTML = "";
      data.matches.forEach(function(match) {
        var winner;
        if (match.score.winner == "HOME_TEAM") {
          winner = match.homeTeam.name;
        } else if (match.score.winner == "AWAY_TEAM") {
          winner = match.awayTeam.name;
        } else if (match.status == "FINISHED") {
          winner = "Draw";
        } else {
          winner = "-";
        }
        if (match.status == "FINISHED") {
          matchesHTML += `
            <tr>
                <td class="green-text">${match.homeTeam.name}</br>${match.awayTeam.name}</td>
                <td>${winner}</td>
                <td>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</td>
                <td>${match.matchday}</td>
                <td>${match.utcDate}</td>
                <td>${match.status}</td>
            </tr>
            `;
        } else {
          matchesHTML += `
            <tr>
                <td class="red-text">${match.homeTeam.name}</br>${match.awayTeam.name}</td>
                <td>${winner}</td>
                <td>None</td>
                <td>${match.matchday}</td>
                <td>${match.utcDate}</td>
                <td>${match.status}</td>
            </tr>
            `;
        }
      });

      document.querySelector("#matches-content").innerHTML = matchesHTML;
    })
    .catch(error);
}

function getTeamId() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  fetch(base_url + "/teams/" + id, option)
    .then(status)
    .then(json)
    .then(function(data) {
      var url = data.crestUrl.replace(/^http:\/\//i, "https://");
      var squadName = "";
      data.squad.forEach(function(squad) {
        squadName += `
                ${squad.name} (${squad.position})</br>
            `;
      });
      var teamHTML = `
            <div class="row">
                <img class="responsive-img" src="${url}" style="max-width: 200px;max-height:200px"/>
            </div>
            <table class="highlight striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Team Name</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <td>Webiste</td>
                        <td>${data.website}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>Founded</td>
                        <td>${data.founded}</td>
                    </tr>
                    <tr>
                        <td>Club Colors</td>
                        <td>${data.clubColors}</td>
                    </tr>
                    <tr>
                        <td>Venue</td>
                        <td>${data.venue}</td>
                    </tr>
                    <tr>
                        <td>Squad</td>
                        <td>${data.squad.length}</td>
                    </tr>
                    <tr>
                        <td>Squad Name</td>
                        <td>${squadName}</td>
                    </tr>
                    <tr>
                        <td>Last Updated</td>
                        <td>${data.lastUpdated}</td>
                    </tr>
                </tbody>

            </table>
        `;
      document.querySelector("#team-content").innerHTML = teamHTML;
    })
    .catch(error);
}

function getTeamFavourite(items) {
  var teamHTML = "";
  items.forEach(function(item) {
    var id = item.idTeam;
    var name = item.nameTeam;
    var url = item.urlTeam;
    teamHTML += `
    <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
        <img src="${url}" style="max-width: 200px;max-height: 200px"/>
        </div>
        <h5>${name}</h5>
        <a href="./detail.html?id=${id}" class="waves-effect waves-light btn">Detail</a>
        <button onclick="delTeam(${id})" class="waves-effect waves-light btn red">Delete</a>
      </div>
      </div>
    `;
  });

  document.querySelector("#team-favourite-content").innerHTML = teamHTML;
}


function showAddNotification(name){
  const title = "Adding Success";
  const options = {
    'body' : 'Adding ' + name + ' to favourite'
  }

  if( Notification.permission === "granted"){
    navigator.serviceWorker.ready.then(function(registration){
      registration.showNotification(title, options);
    })
  }
}

function showDelNotification(){
  const title = "Delete Success";
  const options ={
    'body' : 'Delete item in favourite'
  }

  if(Notification.permission === "granted"){
    navigator.serviceWorker.ready.then(function(registration){
      registration.showNotification(title, options);
    })
  }
}