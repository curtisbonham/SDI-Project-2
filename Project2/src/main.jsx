import { BrowserRouter as Router } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'src/App/App.jsx'

createRoot(document.getElementById('root')).render(
<Router>
    <App />
</Router>,

)