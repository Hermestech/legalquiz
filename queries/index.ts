import { SysFragment } from "./fragments"


export const questionsCollectionQuery = `
    query {
        questionsCollection(limit:20){
            items{
              question
              answersCollection(limit:5){
                items{
                  textAnswer
                  isRightAnswer
                }
              }
            }
          }
    }
`
export const questionaryCollectionQuery = `
${SysFragment}
query {
  # add your query
  questionaryCollection(limit:10){
   questionaries: items{
    sys { ...SysFields }
      title
      description
      difficulty
    	portrait{
        title
        url
      }
      questionsCollection: questionaryquestionsCollection(limit:50){
        questions: items{
          sys { ...SysFields }
          question
          rightAnswerBase {
            reasoning
            link
          }
          answersCollection(limit:10){
            answers: items {
              sys { ...SysFields }
              textAnswer
              isRightAnswer
            }
          }
        }
      }
    }
  }
}
`