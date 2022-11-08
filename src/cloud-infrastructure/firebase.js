import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
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
