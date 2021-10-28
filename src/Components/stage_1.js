import React, {useState, useContext, useRef} from "react";
import {Button, Form, Alert} from 'react-bootstrap';
import {MyContext} from "../Context";

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, ''])

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = textInput.current.value;
        const validate = validateInput(value);

        if (validate) {
            console.log(value)
            setError([false, ''])
            context.addPlayer(value)
            textInput.current.value = ''
        } else {
            console.log('error')
        }
    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, 'Sorry , you need to add something'])
            return false;
        }
        if (value.length < 3) {
            setError([true, 'Sorry , length not enough'])
            return false;
        }
        return true;
    }

    console.log(context)

    return (
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control type="text" placeholder="Add a player name" name="player" ref={textInput}>
                    </Form.Control>
                </Form.Group>

                {error[0] ?
                    <Alert variant="danger">
                        {error[1]}
                    </Alert> :
                    null
                }

                <Button className="miami" variant="primary" type="submit">
                    Add Player
                </Button>
                {
                    context.state.players && context.state.players.length > 0 ?
                        <>
                            <hr/>
                            <div>
                                <ul className="list-group">
                                    {
                                        context.state.players.map((item, idx) => (
                                            <li key={idx}
                                                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                                {item}
                                                <span className="badge badge-danger"
                                                      onClick={() => context.removePlayer(idx)}>
                                                    X
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="action_button" onClick={()=>context.next()}>

                                </div>
                            </div>
                        </>
                        :
                        null
                }
            </Form>
        </>
    )
}

export default Stage1;