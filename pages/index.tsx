// import GameLayout from '../components/Layouts/GameLayout/GameLayout'
import QuestionariesLayout from "../components/Layouts/QuestionariesLayout/questionaries-layout"
import useAppContext from "../contexts/AppContext"

export default function Home() {
  const { questionaries } = useAppContext()


return <QuestionariesLayout questionaries={questionaries} />
}
