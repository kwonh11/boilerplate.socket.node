const SocketIO = require("socket.io");

module.exports = (server, app) => {
    const io = SocketIO(server, {
        cors:{
            origin: "*",
            methods: ["*"]
        },
        path: "/socket"
    });
    app.set("io", io);
    
    // 테스트 이미지 배열
    const testImages = [
        "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_1.png",
        "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_xDrive_g20_1.png",
        "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_2.png",
        "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_2.png",
    ]
    io.on("connect", (socket) => {
        console.log("----- socket connected");
        io.emit("tasks", { id: 0,images: testImages});
        let id = 1;
        setInterval(function() {
            io.emit("tasks", { id: id, images: testImages});
            id++;
            if (id >= 20) {
                clearInterval(this);
            }
        }, 1500);

        socket.on("analysis", (images) => {
            io.emit("tasks", {images});
        });

        socket.on("disconnect", () => {
            console.log("----- socket disconnected");
        })
    })
}