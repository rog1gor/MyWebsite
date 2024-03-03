package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var projects = []string{
	"Chess",
	"Flashcards",
}

var hobbies = []string{
	"Anime",
	"Recipies",
}

func homepageHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "homepage.html", gin.H{
		"faviconURL": "/images/cat.png",
		"githubURL":  "/images/github.png",
		"linkeinURL": "/images/linkedin.png",
		"superStyle": "/styles/super.css",
		"thisStyle":  "/styles/homepage.css",
		"projects":   projects,
		"hobbies":    hobbies,
	})
}

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("static/templates/*.html")
	router.Static("/images", "static/images")
	router.Static("/styles", "static/styles")

	router.GET("/homepage", homepageHandler)
	router.Run()
}
