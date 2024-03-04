package main

import (
	"net/http"
	"website/chess_game"
	"website/global"

	"github.com/gin-gonic/gin"
)

func homepageHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "homepage.html", gin.H{
		"faviconURL": "/images/cat.png",
		"githubURL":  "/images/github.png",
		"linkeinURL": "/images/linkedin.png",
		"superStyle": "/styles/super.css",
		"thisStyle":  "/styles/homepage.css",
		"projects":   global.Projects,
		"hobbies":    global.Hobbies,
	})
}

func main() {
	router := gin.Default()

	router.LoadHTMLFiles(
		"static/templates/homepage.html",
		chess_game.HTML,
	)
	router.Static("/images", "static/images")
	router.Static("/styles", "static/styles")

	chess_game.LoadChessGameStaticFiles(router)

	router.GET("/homepage", homepageHandler)
	router.GET("/chess_game", chess_game.ChessGameHandler)
	router.Run()
}
