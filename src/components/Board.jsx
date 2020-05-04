import React from 'react'
import Square from './Square';
import BoardContext from '../context/BoardContext'

function Board(props) {
    const { board, setBoard, turn, setTurn, history, setHistory } = useContext(BoardContext);

    function declareWinner(board) {
        const winningCombos = [
            [3, 4, 5],
            [0, 1, 2],
            [0, 3, 6],
            [2, 5, 8],
            [1, 4, 7],
            [0, 4, 8],
            [2, 4, 6],
            [6, 7, 8],
        ];

        function threeInARow() {
            for (let i = 0; i < winningCombos.length; i++) {
                const [first, second, third] = winningCombos[i];
                // When you get 3 in a row, in any direction.
                if (board[first] && board[first] === board[second] && board[first] === board[third]) {
                    return board[first];
                }
            }
            return null;
        }
        threeInARow()
    };

    const winner = declareWinner(board);

    // Check for winner, every move.
    let status = null;
    if (winner) {
        status = `${winner} WON THE GAME!`;
    };

    function timeTravel(turn) {
            const boardInHistory = [...history];
            setBoard(boardInHistory[turn]);
    }
    
    function clickHandler(i) {
        if (!winner && !board[i]) {
            const newBoard = [...board];
            const newHistory = [...history];
            newBoard[i] = turn;
            setBoard(newBoard);
            setHistory(newHistory);
            setTurn((turn === 'X') ? 'O' : 'X');
        };
    }

    const moves = history.forEach(square, index => { // use map instead ?
        const steps = index ? `Go to move ${index}` : 'Restart Game';
        return (
            <li key={index}>
                <button onClick={() => timeTravel(index)}>{steps}</button>
            </li>
        )
    });

    return (
        <div className='game'>
            <div className="board">
                <h4>Currently player {turn}'s turn. Make your move.</h4>
                <h3>{status}</h3>
                <h3>{moves}</h3>

                <div className="row board-row">
                    <Square onClick={() => clickHandler(0)} value={board[0]} />
                    <Square onClick={() => clickHandler(1)} value={board[1]} />
                    <Square onClick={() => clickHandler(2)} value={board[2]} />
                </div>

                <div className="row board-row">
                    <Square onClick={() => clickHandler(3)} value={board[3]} />
                    <Square onClick={() => clickHandler(4)} value={board[4]} />
                    <Square onClick={() => clickHandler(5)} value={board[5]} />
                </div>

                <div className="row board-row">
                    <Square onClick={() => clickHandler(6)} value={board[6]} />
                    <Square onClick={() => clickHandler(7)} value={board[7]} />
                    <Square onClick={() => clickHandler(8)} value={board[8]} />
                </div>
            </div>
            <div className='game-data'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Board
