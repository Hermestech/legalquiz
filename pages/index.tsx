import * as React from "react"
import { useSetUser } from "../contexts/UserContext"
import QuestionariesLayout from "../components/Layouts/QuestionariesLayout/questionaries-layout"
import useAppContext from "../contexts/AppContext"
import { MyLottie } from "../components/atoms/MyLottie/my-lottie"

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

  if (isLoading) { 
    return <MyLottie />
  }

  return <QuestionariesLayout questionaries={questionaries} />
}
// export const getServerSideProps = withPageAuthRequired()
