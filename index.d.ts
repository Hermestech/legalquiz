type AnswerType = {
    textAnswer: string
}

type QuestionType = {
    question: string
    answersCollection: {
        items: AnswerType[]
    }
}