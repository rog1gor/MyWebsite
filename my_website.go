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

	//? Remember to add all html templates when creating a new app
	router.LoadHTMLFiles(
		"static/templates/homepage.html",
		Anime.HTML,
		Chess.HTML,
		Flashcards.HTML,
		Recipies.HTML,
	)
	router.Static("/images", "static/images")
	router.Static("/styles", "static/styles")

	//? Remember to load static files when creating a new app
	Anime.LoadAppStaticFiles(router)
	Chess.LoadAppStaticFiles(router)
	Flashcards.LoadAppStaticFiles(router)
	Recipies.LoadAppStaticFiles(router)

	//? Basic GET handlers
	//? Remember to add your handler when creating a new app
	router.GET("/homepage", homepageHandler)
	router.GET("/Anime", Anime.AppHandler)
	router.GET("/Chess", Chess.AppHandler)
	router.GET("/Flashcards", Flashcards.AppHandler)
	router.GET("/Recipies", Recipies.AppHandler)
	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusOK, "/homepage")
	})

	//? Unusuall handlers

	router.Run()
}
