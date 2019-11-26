import React from "react"


function Exercise(props) {

    // console.log(props.day.id)

    return (
        < div className="row exercise-box" >
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <div className="ename text-center">
                    <h1>{props.exercise.title} {props.exercise.id}: </h1>
                    <h2>Weight: {props.exercise.weight}</h2>
                    <h2>Sets: {props.exercise.sets}</h2>
                    <h2>Reps: {props.exercise.reps}</h2>
                </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 ">
                <div className="ebtns">
                    <button
                        type="button"
                        className="btn btn-outline-info btn"
                        name={props.exercise.id}
                        id={props.day.id}
                        onClick={props.editExercise}
                    >✎</button>
                </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 ">
                <div className="ebtns">

                    <button
                        type="button"
                        className="btn btn-outline-danger btn"
                        name={props.exercise.id}
                        id={props.day.id}
                        onClick={props.deleteExercise}
                    >-</button>
                </div>
            </div>
        </div>

    )
}

export default Exercise 