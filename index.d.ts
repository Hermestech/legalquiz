type AnswerType = {
    textAnswer: string
    isRightAnswer: boolea
}

type QuestionType = {
    question: string
    answersCollection: {
        items: AnswerType[]
    }
}