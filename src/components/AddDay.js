import React from "react"



function AddDay(props) {
    return (

        <div>
            <button
                type="button"
                className="btn btn-dark btn-lg btn-circle"
                data-toggle="modal" data-target="#dayAddModal"
            >+</button>

            <div className="modal fade" id="dayAddModal" tabIndex="-1" role="dialog" aria-labelledby="dayAddModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="dayAddModalLabel">Add a Workout Day to your Routine</h5>
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
                                    className="btn btn-dark"
                                    onClick={props.data.title !== "" ? props.addDay : null}
                                    data-dismiss="modal"
                                >Save changes</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div >

        </div >

    )
}

export default AddDay 