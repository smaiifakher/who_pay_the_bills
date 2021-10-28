import React, {useContext} from "react";
import {MyContext} from "../Context";

const Stage2 = () => {
    const context = useContext(MyContext);
    return (
        < >
            <div className="result_wrapper">
                <h3>The looser is :</h3>
                <div>
                    {context.state.result}
                </div>
                <div onClick={context.reset} className="action_button">
                    Get new looser
                </div>
                <div onClick={context.getNewLooser} className="action_button btn_2">
                    Start Over
                </div>
            </div>
        </>
    )
}

export default Stage2;