import * as React from "react"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useSetUser } from "../contexts/UserContext"
import QuestionariesLayout from "../components/Layouts/QuestionariesLayout/questionaries-layout"
import useAppContext from "../contexts/AppContext"

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true)
  const setUser = useSetUser()

  React.useEffect(() => { 
    (async () => { 
      const getUser = await fetch("/api/user")
      const getUserJson = await getUser.json()
      setUser(getUserJson)

      setIsLoading(false)
    }
    )()
  }, [])

  const { questionaries } = useAppContext()


return <QuestionariesLayout questionaries={questionaries} />
}

export const getServerSideProps = withPageAuthRequired()
