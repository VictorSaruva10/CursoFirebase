import { BrowserRouter } from "react-router-dom"
import RouteApp from "./routes"


export default function App(){
  return(
    <BrowserRouter>
        <RouteApp/>
    </BrowserRouter>
  )
}