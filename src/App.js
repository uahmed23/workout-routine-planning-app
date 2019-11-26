import React, { Component } from "react"
import Header from "./components/Header"
import dayData from "./data/dayData"
import DayComponent from "./components/DayComponent"
import AddDay from "./components/AddDay"
import Exercise from "./components/Exercise"
import logo from './logo.svg';
import './App.css';
const $ = window.$;


class App extends Component {

  constructor() {

    super()

    this.state = {
      days: dayData,
      title: "",
      weight: "",
      sets: "",
      reps: "",
      delete: false,
      currDay: "",
      currExercise: ""
    }

    this.addDay = this.addDay.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteDay = this.deleteDay.bind(this)
    this.editDay = this.editDay.bind(this)
    this.addExercise = this.addExercise.bind(this)
    this.submitAddExercise = this.submitAddExercise.bind(this)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.confirmDeleteDay = this.confirmDeleteDay.bind(this)
    this.confirmDeleteExercise = this.confirmDeleteExercise.bind(this)
    this.editDayConfirm = this.editDayConfirm.bind(this)
    this.editExercise = this.editExercise.bind(this)
    this.editExerciseConfirm = this.editExerciseConfirm.bind(this)
  }

  //FUNCTIONS-----------------------------------------------------------------------------------------------------------

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // Edit day
  editDay(event) {

    this.setState({ currDay: event.target.name })
    $('#dayEditModal').modal('show')
  }
  editDayConfirm() {

    this.setState(prevState => {
      const updatedDays = prevState.days

      for (var i = 0; i < updatedDays.length; i++) {

        if (updatedDays[i].id == prevState.currDay) {
          updatedDays[i].title = prevState.title
        }
      }
      return { days: updatedDays }

    })
    this.setState({ title: "" })
  }

  // Edit Exercise

  editExercise(event) {
    const { name, id } = event.target
    this.setState({ currDay: event.target.id, currExercise: event.target.name })
    $('#exerciseEditModal').modal('show')
    console.log("In Edit Exercise")
    console.log("Day: " + id + " Exercise: " + name)
  }

  editExerciseConfirm(event) {

    this.setState(prevState => {
      const updatedDays = prevState.days

      for (var i = 0; i < updatedDays.length; i++) {

        if (updatedDays[i].id == prevState.currDay) {

          // console.log("xx " + updatedDays[i].id + "<have want>" + prevState.currDay + " Ex len " + updatedDays[i].exercise.length)

          for (var j = 0; j < updatedDays[i].exercise.length; j++) {
            console.log(updatedDays[i].exercise[j].id + "<have want>" + prevState.currExercise + " Ex len " + updatedDays[i].exercise.length)
            if (updatedDays[i].exercise[j].id == prevState.currExercise) {
              // console.log("in if ")
              if (prevState.title !== "") { updatedDays[i].exercise[j].title = prevState.title }
              if (prevState.weight !== "") { updatedDays[i].exercise[j].weight = prevState.weight }
              if (prevState.sets !== "") { updatedDays[i].exercise[j].sets = prevState.sets }
              if (prevState.reps !== "") { updatedDays[i].exercise[j].reps = prevState.reps }

            }

          }

        }
      }
      return { days: updatedDays }

    })

    this.setState({ title: "", weight: "", sets: "", reps: "" })

  }


  // Add Days

  addDay(event) {

    event.preventDefault();

    this.setState(prevState => {
      const updatedDays = prevState.days
      const idIncrement = prevState.days.length !== 0 ? prevState.days[prevState.days.length - 1].id + 1 : 1
      const addedTitle = prevState.title
      updatedDays.push({ id: idIncrement, title: addedTitle, exercise: [] })
      return {
        days: updatedDays
      }
    })
    this.setState({ title: "" })
  }

  // Add Exercises
  addExercise(event) {
    this.setState({ currDay: event.target.id })
    $('#exerciseAddModal').modal('show')
  }

  submitAddExercise(event) {

    this.setState(prevState => {
      const updatedDays = prevState.days
      let exerciseIdIncrement

      for (var i = 0; i < updatedDays.length; i++) {

        if (updatedDays[i].id == prevState.currDay) {
          exerciseIdIncrement = prevState.days[i].exercise.length != 0 ? prevState.days[i].exercise[prevState.days[i].exercise.length - 1].id + 1 : 1
          updatedDays[i].exercise.push({ id: exerciseIdIncrement, title: prevState.title, weight: "0", sets: "0", reps: "0" })
        }
      }

      return {
        days: updatedDays
      }
    })

    this.setState({ title: "" })
  }
  // Delete Days
  deleteDay(event) {
    const { name } = event.target
    this.setState({ currDay: name })
    $('#deleteModal').modal('show')
  }

  confirmDeleteDay(event) {

    this.setState(prevState => {
      const updatedDays = prevState.days.filter(function (value, index, arr) {
        return value.id != prevState.currDay
      })
      return {
        days: updatedDays,
        delete: false
      }
    })
  }

  // Delete Exercises
  deleteExercise(event) {
    const { name, id } = event.target
    this.setState({ currDay: id, currExercise: name })
    $('#deleteModalExercise').modal('show')
  }

  confirmDeleteExercise(event) {

    this.setState(prevState => {

      let updatedExercise
      const updatedDays = prevState.days

      for (var i = 0; i < prevState.days.length; i++) {

        if (prevState.days[i].id == prevState.currDay) {
          updatedExercise = prevState.days[i].exercise.filter(function (value, index, arr) {
            return value.id != prevState.currExercise
          })

          updatedDays[i].exercise = updatedExercise
          return { days: updatedDays }
        }
      }
    })
  }


  render() {
    const dayComponents = this.state.days.map(days => {

      const exerciseComponent = days.exercise.map(exercise => {
        return < Exercise
          key={exercise.id}
          day={days}
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          editExercise={this.editExercise}

        />
      })

      return < DayComponent
        key={days.id}
        data={this.state}
        day={days}
        deleteDay={this.deleteDay}
        editDay={this.editDay}
        handleChange={this.handleChange}
        title={this.state.title}
        exerciseComponent={exerciseComponent}
        addExercise={this.addExercise}
      // deleteExercise={this.deleteExercise}

      />
    })

    return (
      <div className="App" >
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header> */}
        {/* // MYRETURN----------------------------------------------------------------- */}
        < div className="" >
          <div className="row justify-content-center container-fluid"   >
            <Header />
            {dayComponents}
          </div>
          <div className="row justify-content-center container-fluid"   >

            <AddDay
              addDay={this.addDay}
              handleChange={this.handleChange}
              data={this.state}
            />
          </div>

          {/* MODALS */}


          <div className="modal fade" id="exerciseAddModal" tabIndex="-1" role="dialog" aria-labelledby="exerciseAddModalLabel" aria-hidden="true">
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
                      value={this.state.title}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={this.state.title !== "" ? this.submitAddExercise : null}
                      data-dismiss="modal"
                    >Save changes</button>
                  </form>
                </div>
              </div>
            </div>
          </div >

          <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">Are you sure you want to delete this Day?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body text-center">
                  <form >
                    <button
                      type="submit"
                      className="btn btn-dark confirm"
                      onClick={this.confirmDeleteDay}
                      data-dismiss="modal"
                    >Yes</button>
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={null}
                      data-dismiss="modal"
                    >No</button>
                  </form>
                </div>
              </div>
            </div>
          </div >

          <div className="modal fade" id="deleteModalExercise" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabelExercise" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabelExercise">Are you sure you want to delete this Exercise?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body text-center">
                  <form >
                    <button
                      type="submit"
                      className="btn btn-dark confirm"
                      onClick={this.confirmDeleteExercise}
                      data-dismiss="modal"
                    >Yes</button>
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={null}
                      data-dismiss="modal"
                    >No</button>
                  </form>
                </div>
              </div>
            </div>
          </div >

          <div className="modal fade" id="dayEditModal" tabIndex="-1" role="dialog" aria-labelledby="dayEditModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="dayEditModalLabel">Change the Title of your Workout Day</h5>
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
                      value={this.state.title}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={this.state.title !== "" ? this.editDayConfirm : null}
                      data-dismiss="modal"
                    >Save changes</button>
                  </form>
                </div>

              </div>
            </div>
          </div >

          <div className="modal fade" id="exerciseEditModal" tabIndex="-1" role="dialog" aria-labelledby="exerciseEditModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="exerciseEditModalLabel">Change the Title of your Exercise</h5>
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
                      value={this.state.title}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <input
                      className="form-control"
                      name="weight"
                      type="text"
                      placeholder="Weight"
                      value={this.state.weight}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <input
                      className="form-control"
                      name="sets"
                      type="text"
                      placeholder="Sets"
                      value={this.state.sets}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <input
                      className="form-control"
                      name="reps"
                      type="text"
                      placeholder="Reps"
                      value={this.state.reps}
                      onChange={this.handleChange}
                      required />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={this.editExerciseConfirm}
                      data-dismiss="modal"
                    >Save changes</button>
                  </form>
                </div>

              </div>
            </div>
          </div >

        </div >
        {/* // MYRETURN----------------------------------------------------------------- */}
      </div>
    );
  }
}

export default App;
