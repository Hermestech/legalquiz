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