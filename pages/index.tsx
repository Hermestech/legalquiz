import * as React from "react"
import { useSetUser } from "../contexts/UserContext"
import QuestionariesLayout from "../components/Layouts/QuestionariesLayout/questionaries-layout"
import useAppContext from "../contexts/AppContext"
import { MyLottie } from "../components/atoms/MyLottie/my-lottie"
import { useAnalytics } from "../contexts/Analytics"

export default function Home() {
  const { analytics } = useAnalytics()
  const [isLoading, setIsLoading] = React.useState(true)
  const setUser = useSetUser()

  React.useEffect(() => { 
    (async () => { 
      const getUser = await fetch("/api/user")
      const getUserJson = await getUser.json()
      setUser(getUserJson)

      if (getUserJson.email) { 
        analytics.track('Login Success', {
        email: getUserJson.email,
        name: getUserJson.name,
        id: getUserJson.id
      })
      }

      setIsLoading(false)
    }
    )()
    analytics.page('/')
  }, [])

  const { questionaries } = useAppContext()

  if (isLoading) { 
    return <MyLottie />
  }

  return <QuestionariesLayout questionaries={questionaries} />
}
// export const getServerSideProps = withPageAuthRequired()
