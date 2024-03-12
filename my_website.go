package main

import (
	"net/http"
	"website/apps/Chess"
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
		Chess.HTML,
	)
	router.Static("/images", "static/images")
	router.Static("/styles", "static/styles")

	Chess.LoadAppStaticFiles(router)

	router.GET("/homepage", homepageHandler)
	router.GET("/Chess", Chess.AppHandler)
	router.Run()
}
