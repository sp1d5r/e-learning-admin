import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    getCountFromServer,
    query,
    where,
} from "firebase/firestore";

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


/* Deception Detection */
export async function getCountOfMinigames(){
    const deceptionDetectionCol = collection(firestore, "deception-detection");
    const snapshot = await getCountFromServer(deceptionDetectionCol);
    return snapshot.data().count
}

export async function getAllDeceptionVideos(start, end, count){
    const max_index = Math.min(end, count);

    // Assertion
    if (start >= max_index ){
        return ;
    }

    const indexes = [];

    for (let i=start; i<max_index; i++){
        indexes.push(i);
    }

    const deceptionDetectionCol = collection(firestore, "deception-detection");
    const deceptionQuery = query(
        deceptionDetectionCol,
        where("index", "in", indexes),
    );

    const deceptionSnapshot = await getDocs(deceptionQuery);
    return deceptionSnapshot.docs;
}