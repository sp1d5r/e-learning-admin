import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    getFirestore,
    getCountFromServer,
    query,
    where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storageRef = getStorage(app);

export default auth;


/* Courses */
export async function getCourses() {
    const courseCollection = collection(firestore, "courses");
    const courseItems = await getDocs(courseCollection);
    const courses = courseItems.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return courses;
}

export async function getCourse(id) {
    const courseDoc = doc(firestore, "courses", id);
    const courseItems = await getDoc(courseDoc);
    return courseItems.data();
}

export function uploadCourse(courseName, courseColor, thumbnail, time, difficulty, successCallback, failedCallback){
    const docRef = addDoc(collection(firestore, "courses"), {
        courseName: courseName,
        color: courseColor,
        thumbnail: thumbnail,
        time: time,
        difficulty: difficulty,
        lessons: [],
        lessonNames: []
    }).then((snapshot) => {
        console.log("Successfully uploaded course" + snapshot.id);
        successCallback(snapshot.id)
    }).catch((e) => {
        console.log("Failed to upload course");
        console.log(e);
        failedCallback("Failed to upload course: " + e.toString());
    });
}

export function editCourse(id, courseName, courseColor, thumbnail, time, difficulty, lessons, successCallback, failedCallback) {
    const data = {
        courseName: courseName,
        color: courseColor,
        thumbnail: thumbnail,
        time: time,
        difficulty: difficulty,
        lessons: lessons.map((lesson) => {
            return doc(firestore, "lessons/" + lesson.id)
        }),
        lessonNames: lessons.map((lesson) => {
            return lesson.title
        })
    };

    console.log("data", data)

    setDoc(doc(firestore, "courses", id), data).then((_) => {
            console.log("Successful Update");
            successCallback("Successful Update");
        }
    ).catch((e) => {
        failedCallback("Failed to update course " + e.toString())
    })
}

/* Lessons */
export async function getLesson(lesson_ref) {
    const lesson_id = lesson_ref.id;
    const lessonDoc = doc(firestore, "lessons", lesson_id);
    const lessonItems = await getDoc(lessonDoc);
    return { id: lesson_id, ...lessonItems.data() };
}

export async function getLessonFromID(lesson_id) {
    const lessonDoc = doc(firestore, "lessons", lesson_id);
    const lessonItems = await getDoc(lessonDoc);
    return { id: lesson_id, ...lessonItems.data() };
}

export function getPagefromRetrievedJSON(pageData, pageId) {
    let data;
    if (pageData.type === "text") {
        data = {
            id: pageId,
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "question") {
        data = {
            id: pageId,
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
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "build_sentence") {
        data = {
            id: pageId,
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "single_word") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                sentence: pageData.sentence,
                word: pageData.word,
            },
        };
    } else if (pageData.type === "selection_text") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "selection_image") {
        data = {
            id: pageId,
            type: pageData.type,
            question: pageData.question,
            questions: pageData.questions,
            answer: parseInt(pageData.answer),
        };
    } else if (pageData.type === "match_cards") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "flip_and_select") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "case_study") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                story: pageData.story,
                title: pageData.title,
            },
        };
    } else if (pageData.type === "order_list") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                correct_order: pageData.correct_order,
            },
        };
    } else if (pageData.type === "binary_classifier") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
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


export function uploadLesson(course_id, lesson_title, description, url, difficulty, time, pages, successCallback, failedCallback){
    const pagesRef = Promise.all(pages.map((page) => {return addDoc(collection(firestore, "pages"), {page})})).then((values) => {
        console.log("Successfully page");
        console.log(values)
        addDoc(collection(firestore, "lessons"), {
            title: lesson_title,
            thumbnail: url,
            time: time,
            pages: values.map((v) => {return "pages/" + v.id}),
            difficulty: difficulty,
            description: description
        }).then((snapshot) => {
            // Now we want to get the course value and update it to include the new lesson.
            console.log("Uploaded Lessons, now adding to course")
            getCourse(course_id).then((res) => {
                const _lessons = [];
                for (let i=0; i<res.lessons.length; i++){
                    _lessons.push({id: res.lessons[i].id, title: res.lessonNames[i]})
                }
                console.log("",_lessons)
                _lessons.push({id: snapshot.id, title: lesson_title});
                editCourse(course_id, res.courseName, res.color, res.thumbnail, res.time, res.difficulty, _lessons,
                    successCallback,
                    failedCallback)
            })
        }).catch((error) => {
            failedCallback("Failed to add lesson" + error.toString())
        })
    }).catch((results) => {
        failedCallback("Failed to add pages" + results.toString())
    });

}

/* Deception Detection */
export async function getCountOfMinigames(){
    const deceptionDetectionCol = collection(firestore, "deception-detection");
    const snapshot = await getCountFromServer(deceptionDetectionCol);
    return snapshot.data().count
}

export async function getAllDeceptionVideos(start, end, count){
    // const max_index = Math.min(end, count);
    //
    // // Assertion
    // if (start >= max_index ){
    //     return ;
    // }
    //
    // const indexes = [];
    //
    // for (let i=start; i<max_index; i++){
    //     indexes.push(i);
    // }

    const deceptionDetectionCol = collection(firestore, "deception-detection");
    // const deceptionQuery = query(
    //     deceptionDetectionCol,
    //     where("index", "in", indexes),
    // );

    const deceptionSnapshot = await getDocs(deceptionDetectionCol);
    return deceptionSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}

export function uploadDeceptionDetection(correctOption, correctPrompt, source, url, successCallback, failedCallback){
    getCountOfMinigames().then(
        (count) => {
            addDoc(collection(firestore, "deception-detection"), {
                index: count,
                correctOption: correctOption,
                correctPrompt: correctPrompt,
                source: source,
                videoUrl: url
            }).then((snapshot) => {
                console.log("Successfully uploaded data!");
                successCallback(snapshot.id);
            }).catch((e) => {
                failedCallback("Failed to upload data - " + (e.toString()));
            })
        }
    ).catch((e) => {
        failedCallback("Failed to get count of videos - " + (e.toString()));
    })
}

/* Pages */
export async function getPageFromID(page_path) {
    const pageId = page_path.split("/")[1];
    const pageDoc = doc(firestore, "pages", pageId);
    const snapshot = await getDoc(pageDoc);
    const pageData = snapshot.data().page;

    let data;
    if (pageData.type === "text") {
        data = {
            id: pageId,
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "question") {
        data = {
            id: pageId,
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
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "build_sentence") {
        data = {
            id: pageId,
            type: pageData.type,
            content: pageData.data,
        };
    } else if (pageData.type === "single_word") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                sentence: pageData.sentence,
                word: pageData.word,
            },
        };
    } else if (pageData.type === "selection_text") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                questions: pageData.questions,
                answer: parseInt(pageData.answer),
            },
        };
    } else if (pageData.type === "selection_image") {
        data = {
            id: pageId,
            type: pageData.type,
            question: pageData.question,
            questions: pageData.questions,
            answer: parseInt(pageData.answer),
        };
    } else if (pageData.type === "match_cards") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "flip_and_select") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                mapping: { ...pageData.mapping },
            },
        };
    } else if (pageData.type === "case_study") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                story: pageData.story,
                title: pageData.title,
            },
        };
    } else if (pageData.type === "order_list") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
                correct_order: pageData.correct_order,
            },
        };
    } else if (pageData.type === "binary_classifier") {
        data = {
            id: pageId,
            type: pageData.type,
            content: {
                question: pageData.question,
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

/* Upload Image to Firebase Storage */

export function uploadFile(file, url, onSuccessCallBack, onFailureCallback) {
    const fileRef = ref(storageRef, url + file.name);
    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded the file!');
        getDownloadURL(snapshot.ref).then((url) => {
            onSuccessCallBack(url);
        }).catch((e) => {
            console.error("Could not get download url");
            console.error(e.toString());
            onFailureCallback("Could not get Download URL - " + e.toString())
        })
    }).catch((e) => {
        console.error("FAILED TO UPLOAD IMAGE" + file.name);
        console.error(e);
        onFailureCallback("Failed to upload image - " + e.toString())

    });
}

/* FINISH UPLOAD IMAGE*/