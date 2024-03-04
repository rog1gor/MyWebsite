const EMPTY = -1

const PAWN      = 0;
const KNIGHT    = 1;
const BISHOP    = 2;
const ROOK      = 3;
const QUEEN     = 4;
const KING      = 5;

const BLACK = 6;
const WHITE = 0;

const BLACK_PAWN      = 0;
const BLACK_KNIGHT    = 1;
const BLACK_BISHOP    = 2;
const BLACK_ROOK      = 3;
const BLACK_QUEEN     = 4;
const BLACK_KING      = 5;

const WHITE_PAWN      = 6;
const WHITE_KNIGHT    = 7;
const WHITE_BISHOP    = 8;
const WHITE_ROOK      = 9;
const WHITE_QUEEN     = 10;
const WHITE_KING      = 11;

const CHESS_PIECE_URLS = JSON.parse(
    document.getElementById("chessPiecesJSON").value);

const CHESS_HEIGHT    = 8;
const CHESS_WIDTH     = 8;

function coordinatesToId(xc, yc) {
    return xc.toString() + 'x' + yc.toString();
}

function removeOnlickcs() {
    document.onclick = null;
    for (let xc = 1; xc <= CHESS_WIDTH; xc++) {
        for (let yc = 1; yc <= CHESS_HEIGHT; yc++) {
            let tile = document.getElementById(coordinatesToId(xc, yc));
            tile.onclick = null;
            tile.querySelector(".dot").style.display = "none";
        }
    }
}

class ChessPiece {
    constructor(piece) {
        this.piece = piece;
        if (this.piece != EMPTY) {
            this.url = CHESS_PIECE_URLS[piece];
        }
    }

    getURL() {
        if (this.isEmpty()) {
            return null;
        }
        return this.url;
    }

    getPieceType() {
        switch (this.piece) {
            case BLACK_PAWN:
            case WHITE_PAWN:
                return PAWN;
            case BLACK_KNIGHT:
            case WHITE_KNIGHT:
                return KNIGHT;
            case BLACK_BISHOP:
            case WHITE_BISHOP:
                return BISHOP;
            case BLACK_ROOK:
            case WHITE_ROOK:
                return ROOK;
            case BLACK_QUEEN:
            case WHITE_QUEEN:
                return QUEEN;
            case BLACK_KING:
            case WHITE_KING:
                return KING;
            default:
                return EMPTY;
        }
    }

    getPiece() {
        return this.piece;
    }

    isBlack() {
        return BLACK_PAWN <= this.piece && this.piece <= BLACK_KING;
    }

    isWhite() {
        return WHITE_PAWN <= this.piece && this.piece <= WHITE_KING;
    }

    isEmpty() {
        return this.piece == EMPTY;
    }
}

function coordinatesToPieceInit(xc, yc) {
    switch (yc) {
        case 1:
            switch (xc) {
                case 1:
                case 8:
                    return WHITE_ROOK;
                case 2:
                case 7:
                    return WHITE_KNIGHT;
                case 3:
                case 6:
                    return WHITE_BISHOP;
                case 4:
                    return WHITE_QUEEN;
                case 5:
                    return WHITE_KING;
            }
        case 2:
            return WHITE_PAWN;
        case 7:
            return BLACK_PAWN;
        case 8:
            switch (xc) {
                case 1:
                case 8:
                    return BLACK_ROOK;
                case 2:
                case 7:
                    return BLACK_KNIGHT;
                case 3:
                case 6:
                    return BLACK_BISHOP;
                case 4:
                    return BLACK_QUEEN;
                case 5:
                    return BLACK_KING;
            }
        default:
            return EMPTY;
    }
}

class BoardTile {
    constructor(xc, yc) {
        this.is_active = false;
        this.tile = document.getElementById(coordinatesToId(xc, yc));
        this.piece = new ChessPiece(EMPTY);
        this.updatePiece(coordinatesToPieceInit(xc, yc));
        this.coordinates = [xc, yc];
    }

    getDotObj() {
        return this.tile.querySelector(".dot");
    }

    getPieceObj() {
        return this.tile.querySelector(".piece");
    }

    getPieceType() {
        return this.piece.getPieceType();
    }

    getCoordinates() {
        return this.coordinates;
    }

    updatePiece(piece) {
        this.piece = new ChessPiece(piece);
        if (!this.piece.isEmpty()) {
            this.getPieceObj().src = this.piece.getURL();
            this.getPieceObj().style.display = "";
        } else {
            this.src = "";
            this.getPieceObj().style.display = "none";
        }
    }

    isEmpty() {
        return this.piece.isEmpty();
    }

    isWhite() {
        return this.piece.isWhite();
    }

    isBlack() {
        return this.piece.isBlack();
    }

    showDot() {
        this.getDotObj().style.display = "";
    }

    hideDot() {
        this.getDotObj().style.display = "none";
    }

    addDottedOnlick(chb, possible_moves) {
        let piece = this.piece.getPiece();
        let coordinates = this.getCoordinates();
        this.tile.addEventListener('click', function() {
            removeOnlickcs();
            for (let i = 0; i < possible_moves.length; i++) {
                let xc = possible_moves[i][0];
                let yc = possible_moves[i][1];
                chb.Tiles[xc][yc].showDot();
                chb.Tiles[xc][yc].pieceMoveOnlick(
                    chb, piece, coordinates);
            }
        });
    }

    pieceMoveOnlick(chb, piece, prev_cords, this_cords) {
        this_cords = this.getCoordinates();
        this.tile.addEventListener('click', function() {
            chb.Tiles[this_cords[0]][this_cords[1]].updatePiece(piece);
            chb.Tiles[prev_cords[0]][prev_cords[1]].updatePiece(EMPTY);
            chb.resetBoardOnclicks();
        });
    }
}

function clearBoard(chb_instance) {
    let chb_children = chb_instance.children;
    for (let i = chb_children.length - 1; i >= 0; i--) {
        if (chb_children[i].classList.contains("tile")) {
            chb_instance.removeChild(chb_children[i]);
        }
    }
}

function initTiles(chb_instance) {
    for (let i = 1; i <= CHESS_HEIGHT; i++) {
        for (let j = 1; j <= CHESS_WIDTH; j++) {
            //? Create newPiece
            let newPiece = document.createElement("img");
            newPiece.classList.add("piece");
            newPiece.style.display = "none";

            //? Create possible move dot
            let newDot = document.createElement("div");
            newDot.classList.add("dot");
            newDot.style.display = "none";

            //? Create a tile
            let newTile = document.createElement("div");
            newTile.classList.add("tile");
            if ((i + j) % 2 == 1) {
                newTile.classList.add("black");
            } else {
                newTile.classList.add("white");
            }
            newTile.id = coordinatesToId(j, CHESS_HEIGHT - i + 1);
            newTile.style.gridRow = i.toString();
            newTile.style.gridColumn = j.toString();
            newTile.appendChild(newDot);
            newTile.appendChild(newPiece);

            chb_instance.appendChild(newTile);
        }
    }
}

class ChessBoard {
    constructor() {
        const chb_instance = document.getElementById("chess_board");
        clearBoard(chb_instance);
        initTiles(chb_instance);

        this.Tiles = new Array(9);
        for (let i = 1; i <= CHESS_HEIGHT; i++) {
            this.Tiles[i] = new Array(9);
        }

        for (let xc = 1; xc <= CHESS_WIDTH; xc++) {
            for (let yc = 1; yc <= CHESS_HEIGHT; yc++) {
                this.Tiles[xc][yc] = new BoardTile(xc, yc);
            }
        }
    }

    isSameColor(xa, ya, xb, yb) {
        if (this.Tiles[xa][ya].isEmpty() || this.Tiles[xb][yb].isEmpty()) {
            return null;
        }
        return !(this.Tiles[xa][ya].isWhite() ^ this.Tiles[xb][yb].isWhite());
    }

    isOutOfBoard(xc, yc) {
        return xc < 1 || xc > 8 || yc < 1 || yc > 8;
    }

    possibleMoves(xc, yc) {
        switch (this.Tiles[xc][yc].getPieceType()) {
            case PAWN:
                return this.possiblePawnMoves(xc, yc);
            case KNIGHT:
                return this.possibleKnightMoves(xc, yc);
            case BISHOP:
                return this.possibleBishopMoves(xc, yc);
            case ROOK:
                return this.possibleRookMoves(xc, yc);
            case QUEEN:
                return this.possibleQueenMoves(xc, yc);
            case KING:
                return this.possibleKingMoves(xc, yc);
            case EMPTY:
                return [];
        }
    }

    //todo add EnPassant and promotions
    possiblePawnMoves(xc, yc) {
        let yc_alignment = 1;
        if (this.Tiles[xc][yc].isBlack()) {
            yc_alignment = -1;
        }

        let possible_moves = [];
        if (this.Tiles[xc][yc+yc_alignment].isEmpty()) {
            possible_moves.push([xc, yc+yc_alignment]);
        }
        if (!this.isOutOfBoard(xc-1, yc+yc_alignment) &&
            !this.isSameColor(xc, yc, xc-1, yc+yc_alignment) &&
            !this.Tiles[xc-1][yc+yc_alignment].isEmpty()
        ) {
            possible_moves.push([xc-1, yc+yc_alignment]);
        }
        if (!this.isOutOfBoard(xc+1, yc+yc_alignment) &&
            !this.isSameColor(xc, yc, xc+1, yc+yc_alignment) &&
            !this.Tiles[xc+1][yc+yc_alignment].isEmpty()
        ) {
            possible_moves.push([xc+1, yc+yc_alignment]);
        }
        if ((this.Tiles[xc][yc].isWhite() && yc == 2) ||
            (this.Tiles[xc][yc].isBlack() && yc == 7)
        ) {
            if (this.Tiles[xc][yc+yc_alignment].isEmpty() &&
                this.Tiles[xc][yc+2*yc_alignment].isEmpty()
            ) {
                possible_moves.push([xc, yc+2*yc_alignment]);
            }
        }
        return possible_moves;
    }

    possibleKnightMoves(xc, yc) {
        const possible_jumps = [
            [xc-2, yc+1],
            [xc-1, yc+2],
            [xc+1, yc+2],
            [xc+2, yc+1],
            [xc+2, yc-1],
            [xc+1, yc-2],
            [xc-1, yc-2],
            [xc-2, yc-1],
        ];
        let possible_moves = [];
        
        for (let i = 0; i < possible_jumps.length; i++) {
            const new_xc = possible_jumps[i][0];
            const new_yc = possible_jumps[i][1];
            if (!this.isOutOfBoard(new_xc, new_yc) &&
                (this.Tiles[new_xc][new_yc].isEmpty() ||
                !this.isSameColor(xc, yc, new_xc, new_yc))
            ) {
                possible_moves.push([new_xc, new_yc]);
            }
        }
        return possible_moves;
    }

    pieceSlide(xc, yc, xc_alignment, yc_alignment) {
        let possible_moves = [];
        let new_xc = xc + xc_alignment;
        let new_yc = yc + yc_alignment;
        while (!this.isOutOfBoard(new_xc, new_yc)) {
            let is_same_color = this.isSameColor(xc, yc, new_xc, new_yc);
            if (is_same_color == null) {
                possible_moves.push([new_xc, new_yc]);
            } else {
                if (is_same_color == false) {
                    possible_moves.push([new_xc, new_yc]);
                }
                break;
            }
            new_xc += xc_alignment;
            new_yc += yc_alignment;
        }
        return possible_moves;
    }

    possibleBishopMoves(xc, yc) {
        let possible_moves = [];
        for (let xc_alignment = -1; xc_alignment <= 1; xc_alignment++) {
            for (let yc_alignment = -1; yc_alignment <= 1; yc_alignment++) {
                if (xc_alignment == 0 || yc_alignment == 0) {
                    continue;
                }
                possible_moves = possible_moves.concat(this.pieceSlide(
                    xc, yc, xc_alignment, yc_alignment));
            }
        }
        return possible_moves;
    }

    possibleRookMoves(xc, yc) {
        let possible_moves = []
        for (let xc_alignment = -1; xc_alignment <= 1; xc_alignment++) {
            for (let yc_alignment = -1; yc_alignment <= 1; yc_alignment++) {
                if (Math.abs(xc_alignment + yc_alignment) != 1) {
                    continue;
                }
                possible_moves = possible_moves.concat(this.pieceSlide(
                    xc, yc, xc_alignment, yc_alignment));
            }
        }
        return possible_moves;
    }

    possibleQueenMoves(xc, yc) {
        let possible_moves = []
        for (let xc_alignment = -1; xc_alignment <= 1; xc_alignment++) {
            for (let yc_alignment = -1; yc_alignment <= 1; yc_alignment++) {
                if (xc_alignment == 0 && yc_alignment == 0) {
                    continue;
                }
                possible_moves = possible_moves.concat(this.pieceSlide(
                    xc, yc, xc_alignment, yc_alignment));
            }
        }
        return possible_moves;
    }

    possibleKingMoves(xc, yc) {
        let possible_moves = [];
        for (let xc_alignment = -1; xc_alignment <= 1; xc_alignment++) {
            for (let yc_alignment = -1; yc_alignment <= 1; yc_alignment++) {
                if (xc_alignment == 0 && yc_alignment == 0) {
                    continue;
                }

                let new_xc = xc + xc_alignment;
                let new_yc = yc + yc_alignment;
                if (this.isOutOfBoard(new_xc, new_yc)) {
                    continue;
                }
                if (this.isSameColor(xc, yc, new_xc, new_yc)) {
                    continue;
                }
                possible_moves.push([new_xc, new_yc]);
            }
        }
        return possible_moves;
    }

    resetBoardOnclicks() {
        removeOnlickcs();

        //? Set new onclick listeners
        for (let xc = 1; xc <= CHESS_WIDTH; xc++) {
            for (let yc = 1; yc <= CHESS_HEIGHT; yc++) {
                let possible_moves = this.possibleMoves(xc, yc);
                this.Tiles[xc][yc].addDottedOnlick(this, possible_moves);
            }
        }
    }
}

let chess_board = new ChessBoard();
chess_board.resetBoardOnclicks();