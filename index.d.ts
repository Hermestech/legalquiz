type AnswerType = {
    textAnswer: string
    isRightAnswer: boolea
}

type QuestionType = {
    question: string
    rightAnswerBase: {
        reasoning: string
        link: string
    }
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
    rightAnswerBase: {
        reasoning: string
        link: string
    }
    answer: AnswerType
}