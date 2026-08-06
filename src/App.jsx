import { startTransition, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Alldata, setAlldata] = useState([])
  const [NewTask, setNewTask] = useState("")
  const [SearchText, setSearchText] = useState("")
  const [FixData, setFixData] = useState([])



  const NewTaskHendal = (e) => {
    let Temp = {
      Task: e.target.value,
      States: "Panding"
    }
    setNewTask(Temp);

  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Task")) || [];

    setAlldata(data);
    setFixData(data);
  }, []);

  const hendalAddButton = () => {
    let AllTask = JSON.parse(localStorage.getItem("Task")) || [];
    let newdata = {
      ...NewTask,
      id: uuidv4()
    }
    AllTask.push(newdata);
    localStorage.setItem("Task", JSON.stringify(AllTask));

    setAlldata(AllTask);
    setFixData(AllTask)
  };

  const HandalDelet = (e) => {
    let data = FixData.filter((items) => {
      return (
        e !== items.id
      )
    })
    setAlldata(data)
    setFixData(data)
    localStorage.setItem("Task", JSON.stringify(data));
  }

  //   const HandelSelect = (event, id) => {
  //   const value = event.target.value;

  //   const updateddata = Alldata.map((el) => {
  //     if (el.id === id) {
  //       return {
  //         ...el,
  //         States: value,
  //       };
  //     }

  //     return el; // Return unchanged item
  //   });

  //   setAlldata(updateddata);
  //   localStorage.setItem("Task", JSON.stringify(updateddata));
  // };

  const HandelSelect = (event, id) => {
    let Value = event.target.value
    let Updated = FixData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          States: Value
        }
      }
      else {
        return (
          el
        )
      }
    })
    setAlldata(Updated);
    setFixData(Updated)
    localStorage.setItem("Task", JSON.stringify(Updated));
  }


  const HandalSerchfilter = (el) => {
    let filteddata = []
    let value = el.target.value
    FixData.map((obj) => {

      if (obj.Task.toLowerCase().includes(value.toLowerCase())) {
        filteddata.push(obj);
      }
    })
    setAlldata(filteddata);
  }

  const hendalFilterButton = (e) => {
    let value = e.target.outerText;

    if (value == "All") {
      setAlldata(FixData)
    }
    if (value == "Pending") {
      let filteddata = FixData.filter((el) => {
        return (
          el.States == "Panding" || el.States == "Progress"
        )
      })
      setAlldata(filteddata);
    }
    if (value == "Completed") {
      let filteddata = FixData.filter((el) => {
        return (
          el.States == "Completed"
        )
      })
      setAlldata(filteddata)
    }

  }

  let PendingNumber = 0
  let Completed = 0

  FixData.map((el) => {
    if (el.States == "Panding" || el.States == "Progress") {
      PendingNumber++
    }
    if (el.States == "Completed") {
      Completed++
    }
  })




  return (
    <div className="container">

      <h1 className="title">📝 TO-DO LIST</h1>

      <div className="add-task">
        <input type="text" placeholder="Enter a new task..." onChange={(e) => NewTaskHendal(e)} />
        <button onClick={() => hendalAddButton()}>Add</button>
      </div>

      <div className="Search-task">
        <input type="text" placeholder="Search tasks..." onChange={(text) => { HandalSerchfilter(text) }} />
      </div>

      <div className="Filter">
        <button onClick={(e) => { hendalFilterButton(e) }}>All</button>
        <button onClick={(e) => { hendalFilterButton(e) }}>Pending</button>
        <button onClick={(e) => { hendalFilterButton(e) }}>Completed</button>
      </div>

      <div className="Task">
        <table>
          <thead>
            <tr>
              <td>NO.</td>
              <td>Task</td>
              <td>States</td>
              <td>Chack</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {
              Alldata.map((e, ind) => {
                return (
                  <tr key={ind} className={
                    e.States === "Completed"
                      ? "completed-row"
                      : e.States === "Progress"
                        ? "progress-row"
                        : ""
                  } >
                    <td>{ind + 1}</td>
                    <td>{e.Task}</td>
                    <td>{e.States}</td>
                    <td><select value={e.States} onChange={(event) => HandelSelect(event, e.id)}>
                      <option value="Panding">Panding</option>
                      <option value="Progress">In progress</option>
                      <option value="Completed">Completed</option>
                    </select></td>
                    <td><button onClick={() => HandalDelet(e.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className="count">
        <span>Total: {FixData.length}</span>
        <span>Pending: {PendingNumber}</span>
        <span>Completed: {Completed}</span>
      </div>

    </div>
  );
}

export default App
