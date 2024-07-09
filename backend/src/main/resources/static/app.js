const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("userid")

function pageChange(roomId) {
    window.location.href = `http://192.168.23.21:8080/?roomId=${roomId}&userId=${userId}`
}

var rooms = null

try {
    fetch("http://192.168.23.21:8080/chatRoom", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId
        })
    }
    ).then((response) => response.json())
        .then((json) => {
            rooms = json;
            for (var i = 0; i < rooms.length; i++) {
                if (userId === rooms.buyerId) {
                    var userType = "Seller";
                }
                else {
                    var userType = "Buyer";
                }
                var element = `<div role="button" tabindex="0" id="contact-list-ele" onclick= pageChange("${rooms[i].id}")><div id="type">${userType}</div>${rooms[i].chatRoomName.slice(0, 25)}...<div id="petname">${userId}</div></div>`;
                $("#contact-list").append(element);
            }
            roomId = urlParams.get('roomid');

            if (roomId === null) {
                document.getElementById("chat-window").style.display = "none";
            }
            else {
                //console.log(rooms)
                for (let i = 0; i < rooms.length; i++) {
                    if (rooms[i].id === roomId) {
                        //console.log("cbhcbdhb")
                        currRoom = rooms[i]
                        if (userId === currRoom.buyerId) {
                            userType = "Buyer"
                            userName = currRoom.buyerName
                        } else {
                            userType = "Seller"
                            userName = currRoom.sellerName
                        }
                    }
                }
                //console.log(currRoom)
                connect();
                document.getElementById("chat-head-name").innerHTML = currRoom.chatRoomName
                document.getElementById("type2").innerHTML = userName
                document.getElementById("item-image").src = currRoom.mainImage
                var allMessages = currRoom.messages
                for (let i = 0; i < allMessages.length; i++){
                    if (allMessages[i].userId == userId){
                        showGreeting(allMessages[i].message, "right", allMessages[i].time)
                    } else {
                        showGreeting(allMessages[i].message, "left", allMessages[i].time)
                    }
                }
            }
        });
} catch (e) {
    window.location.href = "http://localhost:5173/getProfile"
}


const stompClient = new StompJs.Client({
    brokerURL: 'ws://192.168.23.21:8080/chatroom/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    //console.log('Connected: ' + frame);
    stompClient.subscribe(`/room/${roomId}`, (greeting) => {
        data = JSON.parse(greeting.body)
        if (data.userId == userId) {
            var dir = "right"
        } else {
            var dir = "left"
        }
        showGreeting(data.message, dir, data.time);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function sendContent() {
    stompClient.publish({
        destination: `/app/room/${roomId}`,
        body: JSON.stringify({
            'message': $("#message").val(),
            'userId': userId,
            'time': Date.now()
        })
    });
}

function showGreeting(message, dir, time) {
    var timestr = new Date(time).toLocaleTimeString()
    var datestr = new Date(time).toLocaleDateString()
    element = `<div class='message-box-container message-box-container-${dir}'><div class='message-box message-box-${dir}'>${message}<div class='time'>${datestr} ${timestr}</div></div></div>`;
    field = document.getElementById("message");
    field.value = "";
    chatArea = document.getElementById("chat-area");
    $("#chat-area").append(element);
    chatArea.scrollTop = chatArea.scrollHeight;
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#send").click(() => sendContent());
});

function home() {
    window.location.href = "http://localhost:5173"
}