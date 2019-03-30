import React from 'react'
import ReactDOM from 'react-dom'

import MainLayout from './layout/main'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(<Router><MainLayout /></Router>, document.getElementById('app'))
