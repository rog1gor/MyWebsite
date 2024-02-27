package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func homepageHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "homepage.html", gin.H{
		"faviconURL": "/images/cat.png",
		"superStyle": "/styles/super.css",
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
