package Flashcards

import (
	"net/http"
	"website/global"

	"github.com/gin-gonic/gin"
)

var dir_prefix string = "apps/Flashcards/"
var HTML = dir_prefix + "static/templates/Flashcards.html"

func LoadAppStaticFiles(router *gin.Engine) {
	router.Static("/Flashcards/images", dir_prefix+"static/images")
	router.Static("/Flashcards/styles", dir_prefix+"static/styles")
	router.Static("/Flashcards/scripts", dir_prefix+"static/scripts")
}

func AppHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "Flashcards.html", gin.H{
		"faviconURL": "/images/cat.png",
		"githubURL":  "/images/github.png",
		"linkeinURL": "/images/linkedin.png",
		"superStyle": "/styles/super.css",
		"projects":   global.Projects,
		"hobbies":    global.Hobbies,
		"thisStyle":  "/Flashcards/styles/Flashcards.css",
		"thisScript": "/Flashcards/scripts/Flashcards.js",
	})
}
