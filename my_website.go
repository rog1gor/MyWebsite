package main

import (
	"net/http"
	"website/apps/Anime"
	"website/apps/Chess"
	"website/apps/Flashcards"
	"website/apps/Recipies"
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
		Anime.HTML,
		Chess.HTML,
		Flashcards.HTML,
		Recipies.HTML,
	)
	router.Static("/images", "static/images")
	router.Static("/styles", "static/styles")

	Anime.LoadAppStaticFiles(router)
	Chess.LoadAppStaticFiles(router)
	Flashcards.LoadAppStaticFiles(router)
	Recipies.LoadAppStaticFiles(router)

	router.GET("/homepage", homepageHandler)
	router.GET("/Anime", Anime.AppHandler)
	router.GET("/Chess", Chess.AppHandler)
	router.GET("/Flashcards", Flashcards.AppHandler)
	router.GET("/Recipies", Recipies.AppHandler)
	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusOK, "/homepage")
	})
	router.Run()
}
