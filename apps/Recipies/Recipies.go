package Recipies

import (
	"net/http"
	"website/global"

	"github.com/gin-gonic/gin"
)

var dir_prefix string = "apps/Recipies/"
var HTML = dir_prefix + "static/templates/Recipies.html"

func LoadAppStaticFiles(router *gin.Engine) {
	router.Static("/Recipies/images", dir_prefix+"static/images")
	router.Static("/Recipies/styles", dir_prefix+"static/styles")
	router.Static("/Recipies/scripts", dir_prefix+"static/scripts")
}

func AppHandler(context *gin.Context) {
	context.HTML(http.StatusOK, "Recipies.html", gin.H{
		"faviconURL": "/images/cat.png",
		"githubURL":  "/images/github.png",
		"linkeinURL": "/images/linkedin.png",
		"superStyle": "/styles/super.css",
		"projects":   global.Projects,
		"hobbies":    global.Hobbies,
		"thisStyle":  "/Recipies/styles/Recipies.css",
		"thisScript": "/Recipies/scripts/Recipies.js",
	})
}
