import React, { useEffect, useState } from "react";
import "./lesson-page.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getPagefromRetrievedJSON,
} from "../../../cloud-infrastructure/firebase";
import ProgressBar from "./progress-bar/progress-bar";
import LessonContent from "./lesson-content/lesson-content";
import { Button } from "react-bootstrap";

// const LESSON_CONTENT_EXAMPLE =

function NewLessonPage({lessonMetadata, lessonPages}) {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
    and the course id you get is gvhvgvhv
    */

  const lesson_title = lessonMetadata.title;
  const lesson_thumbnail = lessonMetadata.thumbnail;
  const lesson_description = lessonMetadata.description;

  const searchParams = useSearchParams()[0];
  const course_id = searchParams.get("course_id");
  /* Content information */
  const [content, setContent] = useState([]);
  /* Content that gets shown in the area panel */
  const [current_content, setCurrentContent] = useState({});
  /* Keep track of the position the user is at */
  const [current_position, setCurrentPosition] = useState(0);
  /* Keep track of content progress */
  const [user_progress, setProgress] = useState([]);
  /* Navigation */
  const navigator = useNavigate();
  /* Gems Information */
  const [gems, setGems] = useState(0);
  /* LessonStarted */
  const [isIntroScreen, setIntroScreen] = useState(true);

  useEffect(() => {
    setContent([]);
    setCurrentContent({});
    setCurrentPosition(0);
    setProgress([]);
    setIntroScreen(true);

    const course = {
      "lessons":["m46vI48yblwojFvcFjX5","Z8jqrJLuuzBn9Ec0lY08","jplFlcpLe5dLzFibJv6i","gbsRCYkAm2EHW4NyOd0n","HbyZdCIWSMSPiGEz7AxY","cbYwQpR67c4bZRSQCcKm","e9gOi5aXx3gSJCPLi5eG","i2GGMu3hMZCx9b8O4TV2","RU6epFU6KDf7uPutSV1c","60F3nykXhgio9vUO7mBm","Xa0Y4Z971787mISMilJM","ndSyXHey4bD197lc9LeO"],
      "time":"250",
      "difficulty":"3",
      "thumbnail":"https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/course-images%2Fcharisma-in-business.png?alt=media&token=def6c328-db16-42ee-b097-f889869464b9",
      "courseName":"Unlocking Charisma In Business",
      "lessonNames":["Introduction to Charisma in Business","Importance of Charisma","Components of Charisma","Psychology of Charisma","Developing Charismatic Presence","Being Fully Present","Active Listening","Projecting Power and Authority","Authority vs Approachability","Leveraging Strength for Credibility ","Confidence and Clarity","To be Continued..."],
      "color":"#ffcccc"
    }

    const lesson = {
      "id":"gbsRCYkAm2EHW4NyOd0n",
      "pages":["pages/0kwtkMdyjRU0D2RhWYOn","pages/wpzKJL1sAv4Ge7BntGvI","pages/jnBq9f1AEZlXbhYoFolo","pages/dLHTfWVf1itYiALlbJMe","pages/1AfPEtYPEpEgsN3MXc6w","pages/8Zotm6SCZuMGqSpggA0F","pages/iXyTfj3QK9Os5TLTEtiE","pages/81tukoebWCbqmEsRxHBn","pages/YFq2kukExmAE0B3G7CyH","pages/xwTgrbmujTRctlXJb7d0","pages/aVw3qsqX9QKtzH5FoEAJ","pages/3TOyCfhoH45BPFwwYiUR","pages/3IHPX75Pye2kATtdaZAC","pages/qpH52lUhjdJSHldyjfde","pages/DkdUGjK5nJAf6fr6hFEp","pages/UxjHajMkpnNfRilS2k4q","pages/OlxbbHNe0RyyZL6rEJu6"],
      "difficulty":"2",
      "title":"Psychology of Charisma",
      "thumbnail":"https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/lesson-images%2Floading-image-charisma.png?alt=media&token=147a9e21-7814-416d-b2b2-a05859eef739",
      "time":"15"
    }


    let returned_pages;
    returned_pages = lessonPages.map((page) => {
      return getPagefromRetrievedJSON(page, "test");
    });

    returned_pages.push({
      type: "final",
      content: {
        title: lesson_title
      },
    });

    setContent(returned_pages);
    setCurrentContent(returned_pages[0]);
    setProgress(
        returned_pages.map((_) => {
          return "";
        })
    );
    // eslint-disable-next-line
  }, [lessonPages]);

  const goToPosition = (index) => {
    setCurrentPosition(index);
    setCurrentContent(content[index]);
  };

  const goForward = () => {
    const nextIndex = Math.min(content.length - 1, current_position + 1);
    goToPosition(nextIndex);
  };

  const sendCorrectAnswer = () => {
    console.log("Completed");
  };

  const sendIncorrectAnswer = (_) => {
    console.log("Incorrect Answer")
  };


  //TODO(eahmad): Make a submit button
  const submit = (correctAnswer, submittedAnswer) => {
    const temp = user_progress;

    if (
      current_content.type === "question" ||
      current_content.type === "selection_text" ||
      current_content.type === "single_word" ||
      current_content.type === "build_sentence" ||
      current_content.type === "selection_image" ||
      current_content.type === "match_cards" ||
      current_content.type === "order_list" ||
      current_content.type === "binary_classifier"
    ) {
      if (correctAnswer) {
        /* This is the correct answer*/
        sendCorrectAnswer();
      } else {
        sendIncorrectAnswer(submittedAnswer);
      }
    }

    if (current_content.type === "text") {
      temp[current_position] = "text-completed";
    }

    setProgress(temp);
    goForward();
  };

  const lessonCompleteSubmit = () => {
    console.log("Lesson Complete")
  };

  const lessonCompleteBack = () => {
    console.log("Lesson Complete")
  };

  const lessonCompleteNextLesson = () => {
   console.log("Lesson Complete Next Lesson.")
  };

  return (
    <div className={"course-landing-main"}>
        <>
          <div className={"lesson-landing-main"}>
            {isIntroScreen ? (
              <div className={"lesson-intro-page"}>
                <img src={lesson_thumbnail} alt={"hello"} />
                <p className={"lesson-intro-title"}>{lesson_title}</p>
                <p>{lesson_description}</p>
                <p
                  className={"lesson-intro-action"}
                  onClick={() => {
                    setIntroScreen(false);
                  }}
                >
                  Tap to continue
                </p>
              </div>
            ) : (
              <div className={"lesson-landing-content-section"}>
                <div className={"lesson-top"}>
                  <ProgressBar
                    currentProgress={Math.min(
                      current_position + 1,
                      content.length
                    )}
                    totalPages={content.length}
                  />
                  <div className={"lesson-metadata"}>
                    {current_content.type !== "final" ? (
                      <Button
                        variant={"danger"}
                        onClick={() => {
                          navigator(`/course/?course_id=${course_id}`);
                        }}
                        className={"lesson-button"}
                      >
                        Exit
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <p className={"lesson-title"}>{lesson_title}</p>
                    <div className={"lesson-user-data"}>
                      <div className={"user-gems"}>

                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className={"lesson-title-mobile"}>{lesson_title}</p>
                </div>

                <LessonContent
                  content={current_content.content}
                  status={user_progress[current_position]}
                  type={current_content.type}
                  submit={submit}
                  lessonCompleteSubmit={lessonCompleteSubmit}
                  lessonCompleteBack={lessonCompleteBack}
                  lessonCompleteNextLesson={lessonCompleteNextLesson}
                  gems={gems}
                />
              </div>
            )}
          </div>
        </>
    </div>
  );
}

export default NewLessonPage;
