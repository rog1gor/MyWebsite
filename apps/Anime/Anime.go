package Anime

import (
	"net/http"
	"website/global"

	"github.com/gin-gonic/gin"
)

var dir_prefix string = "apps/Anime/"
var HTML = dir_prefix + "static/templates/Anime.html"

func LoadAppStaticFiles(router *gin.Engine) {
	router.Static("/Anime/images", dir_prefix+"static/images")
	router.Static("/Anime/styles", dir_prefix+"static/styles")
	router.Static("/Anime/scripts", dir_prefix+"static/scripts")
}

func AppHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "Anime.html", gin.H{
		"faviconURL": "/images/cat.png",
		"githubURL":  "/images/github.png",
		"linkeinURL": "/images/linkedin.png",
		"superStyle": "/styles/super.css",
		"projects":   global.Projects,
		"hobbies":    global.Hobbies,
		"thisStyle":  "/Anime/styles/Anime.css",
		"thisScript": "/Anime/scripts/Anime.js",
	})
}
