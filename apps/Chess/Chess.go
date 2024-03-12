package Chess

import (
	"encoding/json"
	"log"
	"net/http"
	"website/global"

	"github.com/gin-gonic/gin"
)

var dir_prefix string = "apps/Chess/"
var HTML = dir_prefix + "static/templates/Chess.html"
var chessPiecesURLs = []string{
	"/Chess/images/BlackPawn.png",
	"/Chess/images/BlackKnight.png",
	"/Chess/images/BlackBishop.png",
	"/Chess/images/BlackRook.png",
	"/Chess/images/BlackQueen.png",
	"/Chess/images/BlackKing.png",

	"/Chess/images/WhitePawn.png",
	"/Chess/images/WhiteKnight.png",
	"/Chess/images/WhiteBishop.png",
	"/Chess/images/WhiteRook.png",
	"/Chess/images/WhiteQueen.png",
	"/Chess/images/WhiteKing.png",
}

func LoadAppStaticFiles(router *gin.Engine) {
	router.Static("/Chess/images", dir_prefix+"static/images")
	router.Static("/Chess/styles", dir_prefix+"static/styles")
	router.Static("/Chess/scripts", dir_prefix+"static/scripts")
}

func AppHandler(context *gin.Context) {
	chessPiecesJSON, err := json.Marshal(chessPiecesURLs)
	if err != nil {
		log.Println("Error serializing JSON:", err)
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal Server Error",
		})
		return
	}

	context.HTML(http.StatusOK, "Chess.html", gin.H{
		"faviconURL":      "/images/cat.png",
		"githubURL":       "/images/github.png",
		"linkeinURL":      "/images/linkedin.png",
		"superStyle":      "/styles/super.css",
		"projects":        global.Projects,
		"hobbies":         global.Hobbies,
		"chessPiecesJSON": string(chessPiecesJSON),
		"thisStyle":       "/Chess/styles/Chess.css",
		"thisScript":      "/Chess/scripts/Chess.js",
	})
}
