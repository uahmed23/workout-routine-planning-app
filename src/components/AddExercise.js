import React from "react"

function AddExercise(props) {

    // console.log(props.day)

    return (
        <div>
            <button
                // type="button"
                className="btn btn-outline-dark btn-lg btn-circle ebtn"
                // data-toggle="modal" data-target="#exerciseAddModal"
                type="submit"
                id={props.day.id}
                onClick={props.addExercise}
            >+</button>

            {/* <div className="modal fade" id="exerciseAddModal" tabIndex="-1" role="dialog" aria-labelledby="exerciseAddModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exerciseAddModalLabel">Add an Exercise to your Workout Day</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form >
                                <input
                                    className="form-control"
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={props.data.title}
                                    onChange={props.handleChange}
                                    required />
                                <br />
                                <button
                                    type="submit"
                                    id={props.day.id}
                                    className="btn btn-primary"
                                    onClick={props.data.title !== "" ? props.addExercise : null}
                                    data-dismiss="modal"
                                >Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div > */}
        </div>
    )


}


export default AddExercise