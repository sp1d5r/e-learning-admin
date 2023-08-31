export function convertPagesToCorrectFormat(pageData){
    let data;
    if (pageData.type === "text") {
        data = {
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "question") {
        data = {
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
                explanation: pageData.explanation,
            },
        };
    } else if (pageData.type === "selection_image") {
        data = {
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "build_sentence") {
        data = {
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "single_word") {
        data = {
            type: pageData.type,
            content: {
                sentence: pageData.sentence,
                word: pageData.word,
            },
        };
    } else if (pageData.type === "selection_text") {
        data = {
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "selection_image") {
        data = {
            type: pageData.type,
            question: pageData.question,
            questions: pageData.questions,
            answer: parseInt(pageData.answer),
        };
    } else if (pageData.type === "match_cards") {
        data = {
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "flip_and_select") {
        data = {
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "case_study") {
        data = {
            type: pageData.type,
            content: {
                story: pageData.story,
                title: pageData.title,
            },
        };
    } else if (pageData.type === "order_list") {
        data = {
            type: pageData.type,
            content: {
                question: pageData.question,
                correct_order: pageData.correct_order,
            },
        };
    } else if (pageData.type === "binary_classifier") {
        data = {
            type: pageData.type,
            content: {
                question: pageData.question ? pageData.question :"",
                category_one: Object.keys(pageData.mapping)[0],
                category_two: Object.keys(pageData.mapping)[1],
                category_one_options:
                    pageData.mapping[Object.keys(pageData.mapping)[0]],
                category_two_options:
                    pageData.mapping[Object.keys(pageData.mapping)[1]],
            },
        };
    }
    return data;
}