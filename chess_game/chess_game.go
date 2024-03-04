package chess_game

import (
	"encoding/json"
	"log"
	"net/http"
	"website/global"

	"github.com/gin-gonic/gin"
)

var dir_prefix string = "chess_game/"
var HTML = dir_prefix + "static/templates/chess_game.html"
var chessPiecesURLs = []string{
	"/chess/images/BlackPawn.png",
	"/chess/images/BlackKnight.png",
	"/chess/images/BlackBishop.png",
	"/chess/images/BlackRook.png",
	"/chess/images/BlackQueen.png",
	"/chess/images/BlackKing.png",

	"/chess/images/WhitePawn.png",
	"/chess/images/WhiteKnight.png",
	"/chess/images/WhiteBishop.png",
	"/chess/images/WhiteRook.png",
	"/chess/images/WhiteQueen.png",
	"/chess/images/WhiteKing.png",
}

func LoadChessGameStaticFiles(router *gin.Engine) {
	router.Static("/chess/images", dir_prefix+"static/images")
	router.Static("/chess/styles", dir_prefix+"static/styles")
	router.Static("/chess/scripts", dir_prefix+"static/scripts")
}

func ChessGameHandler(context *gin.Context) {
	chessPiecesJSON, err := json.Marshal(chessPiecesURLs)
	if err != nil {
		log.Println("Error serializing JSON:", err)
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal Server Error",
		})
		return
	}

	context.HTML(http.StatusOK, "chess_game.html", gin.H{
		"faviconURL":      "/images/cat.png",
		"githubURL":       "/images/github.png",
		"linkeinURL":      "/images/linkedin.png",
		"superStyle":      "/styles/super.css",
		"thisStyle":       "/chess/styles/chess_game.css",
		"thisScript":      "/chess/scripts/chess_game.js",
		"projects":        global.Projects,
		"hobbies":         global.Hobbies,
		"chessPiecesJSON": string(chessPiecesJSON),
	})
}
