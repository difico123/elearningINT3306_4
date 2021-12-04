import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Toast from '../components/common/toast'
import toast from '../dummydata/toast'

function InstructorRouter() {
  const [trigger, setTrigger] = React.useState(false);

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<><button onClick={() => {setTrigger(!trigger)}}>trigger</button>
          {trigger&&<Toast toastList={[toast('warning','đây là title', 'day la description')]}/>}
        </>} />
      </Routes>
    </React.Fragment>
  );
}

export default InstructorRouter;