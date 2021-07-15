import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome'
// import Clock from './components/Clock'
import Clock from './components/Clock.class'
import Mail from './components/Mail'
import Warn from './components/Warn'
import List from './components/List'
import FormComp from './components/Form'
import Water from './components/Water'
import Dialog from './components/Dialog'
let element = <h1>hello</h1>
element = <Welcome name="Wel" />
element = <Clock />
const msg = []
element = <Mail unreadMessages={msg} />
element = <Warn />
const lists = [12,234]
element = <List numbers={lists} />
element = <FormComp />
element = <Water />
element = <Dialog />
ReactDOM.render(
  element,
  document.getElementById('root')
);
