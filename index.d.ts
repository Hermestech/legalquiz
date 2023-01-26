type AnswerType = {
    textAnswer: string
    isRightAnswer: boolea
}

type QuestionType = {
    question: string
    answersCollection: {
        answers: AnswerType[]
    }
}

type QuestionaryType = {
    description: string
    title: string   
    difficulty: string
    questionsCollection: {
        questions: QuestionType[]
    }
    sys: {
        id: string
    }
}

type SelectedAnswerType = {
    question: string,
    answer: AnswerType
}