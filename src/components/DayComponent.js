import React from "react"
import Exercise from "./Exercise"
import AddExercise from "./AddExercise"

function DayComponent(props) {


    const completedStyle = {
        fontStyle: "italics",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    // console.log(props.exerciseComponent)
    // for (var i = 0; i <= props.day.exercise.length; i++) {
    //     console.log(props.day.exercise[i].title)
    // }
    // props.day.exercise.foreach(function (item, index) {
    //     console.log(item.title)
    // })


    return (


        < div className="row justify-content-center container-fluid section1" >
            <div className="card w-75 text-center">
                <div className="card-body">
                    <div className="btn-group float-right" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className="btn btn-info btn"
                            name={props.day.id}
                            onClick={props.editDay}
                        >✎</button>
                        <button
                            type="button"
                            className="btn btn-danger btn"
                            name={props.day.id}
                            onClick={props.deleteDay}
                        >-</button>
                        {/* <button
                            type="button"
                            className="btn btn-outline-success btn"
                            name={props.day.id}
                            onClick={props.switchHidden}
                        >open</button> */}
                        {/* <div>
                            <p style={!props.showHidden ? completedStyle : null}>Hello world </p>
                        </div> */}
                    </div>

                    <h5 className="card-title">{props.day.title}</h5>

                    <div>
                        {props.exerciseComponent}
                        <AddExercise
                            day={props.day}
                            data={props.data}
                            handleChange={props.handleChange}
                            addExercise={props.addExercise}
                        />
                    </div>

                </div>
            </div>


        </div >



    )

}

export default DayComponent 