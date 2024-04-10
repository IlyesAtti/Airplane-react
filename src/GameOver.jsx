export default function GameOver({over}) {
    
    if (over) {

        return(
            <>
            <h2 className='gameOver' style={{visibility: 'visible'}}> GAME OVER!</h2>
            </>
        )
    }
}