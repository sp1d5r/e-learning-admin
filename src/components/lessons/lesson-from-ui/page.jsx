import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";

function Page({index, pages, setPages}) {

    /* Set the Pages */
    useEffect(() => {
        console.log("Pages refreshed")
    }, [pages]);  // Beware: using pages in dependency array can lead to infinite loops if not careful.

    const updatePageDataAttribute = (name, value) => {
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[index] = {
                ...updatedPages[index],
                [name]: value
            };
            return updatedPages;
        });
    }

    const updatePageDataTotal = (pageData) => {
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[index] = {
                ...pageData
            };
            return updatedPages;
        });
    }

    const deletePage = () => {
        setPages(prevPages => {
            return prevPages.filter((_, pageIndex) => pageIndex !== index);
        });
    }

    const shiftUp = () => {
        setPages(prevPages => {
            if (index === 0) return prevPages; // If it's the first page, don't change anything

            const updatedPages = [...prevPages];
            [updatedPages[index - 1], updatedPages[index]] = [updatedPages[index], updatedPages[index - 1]]; // Swap positions with the previous page
            return updatedPages;
        });
    }

    const shiftDown = () => {
        setPages(prevPages => {
            if (index === prevPages.length - 1) return prevPages; // If it's the last page, don't change anything

            const updatedPages = [...prevPages];
            [updatedPages[index], updatedPages[index + 1]] = [updatedPages[index + 1], updatedPages[index]]; // Swap positions with the next page
            return updatedPages;
        });
    }

    const updateQuestionOption = (option, index) => {
        const _options = pages[index].questions;
        _options[index] = option;
        updatePageDataAttribute("questions", _options)
    }

    const addToMapping = (isKey, value, pos) => {
        const mapping = pages[index].mapping;
        const keys = Object.keys(mapping);
        const values = Object.values(mapping);

        if (isKey) {
            keys.splice(pos, 1, value);
        } else {
            values.splice(pos, 1, value)
        }

        const _newMapping = {}
        for (var i=0; i<values.length; i++ ){
            _newMapping[keys[i]] = values[i];
        }

        updatePageDataAttribute("mapping", _newMapping);
    }

    /* Order List */
    const addOrderedItem = (value, i) => {
        if (i <= pages[index].correct_order.length) {
            const correct_order = pages[index].correct_order;
            correct_order[i] = value;
            updatePageDataAttribute("correct_order", correct_order);
        }
    }

    /* Binary Classification Functions */
    const updateClassName = (previousClassName, newName) => {
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[index].mapping[newName] = updatedPages[index].mapping[previousClassName];
            delete updatedPages[index].mapping[previousClassName];
            return updatedPages;
        });
    }

    const updateClassItem = (classIndex, itemIndex, newItem) => {
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            const currentMappingKeys = Object.keys(updatedPages[index].mapping);
            if (updatedPages[index].mapping[currentMappingKeys[classIndex]]) {
                updatedPages[index].mapping[currentMappingKeys[classIndex]][itemIndex] = newItem;
            }
            return updatedPages;
        });
    }

    const addItem = (className) => {
        setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[index].mapping[className].push("")
            return updatedPages;
        });
    }


    /* Handle Page Type Switching */
    const PageSwitcher = () => {
        return <span>
            <Form.Select aria-label="Default select example"
             onChange={(event) => {
                if (event.target.value === "") {
                    console.log("Here");
                } else if (event.target.value === "text"){
                    updatePageDataTotal({type: "text", data: ""})
                } else if (event.target.value === "question"){
                    updatePageDataTotal({
                        type: "question",
                        question: "",
                        questions: [],
                        answer: 0,
                        explanation: ""
                    })
                } else if (event.target.value === "selection_image") {
                    updatePageDataTotal({
                        type: "selection_image",
                        question: "",
                        questions: [],
                        answer: 0,
                    })
                } else if (event.target.value === "build_sentence") {
                    updatePageDataTotal({type: "build_sentence",data: ""})
                } else if (event.target.value === "single_word") {
                    updatePageDataTotal({
                        type: "single_word",
                        sentence: "Objections to the sale should be ",
                        word: "encouraged",
                    })
                } else if (event.target.value === "selection_text") {
                    updatePageDataTotal({
                        type: "selection_text",
                        question: "How should you address objections?",
                        questions: ["Asking Questions", "Directly", "Indirectly", "Creatively"],
                        answer: 1,
                    })
                } else if (event.target.value === "match_cards") {
                    updatePageDataTotal({
                        type: "match_cards",
                        mapping: {
                            "Not all exceptions are": "valid",
                            "Objections to the sale should be": "encouraged",
                            "Objections to a sale are ": "good",
                            "Discover exceptions by": "asking questions",
                        },
                    })
                } else if (event.target.value === "flip_and_select") {
                    updatePageDataTotal({
                        type: "flip_and_select",
                        mapping: {
                            "Not all exceptions are": "valid",
                            "Objections to the sale should be": "encouraged",
                            "Objections to a sale are ": "good",
                            "Discover exceptions by": "asking questions",
                        },
                    })
                } else if (event.target.value === "case_study") {
                    updatePageDataTotal({
                        type: "case_study",
                        title: "",
                        story: ""
                    })
                } else if (event.target.value === "order_list") {
                    updatePageDataTotal({
                        type: "order_list",
                        question: "",
                        correctOrder: ["item1", "item2", "item3", "item4"]
                    })
                } else if (event.target.value === "binary_classification") {
                    updatePageDataTotal({
                        type: "binary_classification",
                        "question": "",
                        "category_one": "",
                        "category_two": "",
                        "category_one_options": ["", ""],
                        "category_two_options": ["", ""]
                    })
                }
}}>
                    <option>Open this select menu</option>
                    <option value={"text"} selected={pages[index].type === "text"}>Text</option>
                    <option value={"question"} selected={pages[index].type === "question"}>Question</option>
                    <option value={"selection_image"} selected={pages[index].type === "selection_image"}>Image Select</option>
                    <option value={"build_sentence"} selected={pages[index].type === "build_sentence"}>Build a Sentence</option>
                    <option value={"single_word"} selected={pages[index].type === "single_word"}>Fill in Blank</option>
                    <option value={"selection_text"} selected={pages[index].type === "selection_text"}>Sentence Select</option>
                    <option value={"match_cards"} selected={pages[index].type === "match_cards"}>Card Matching</option>
                    <option value={"flip_and_select"} selected={pages[index].type === "flip_and_select"}>Blind Card Matching</option>
                    <option value={"order_list"} selected={pages[index].type === "order_list"}>Order Cards</option>
                    <option value={"binary_classification"} selected={pages[index].type === "binary_classifier"}>Binary Classification</option>
            </Form.Select>
        </span>
    }

  return <Form style={{
      margin: "2%", padding: "5%", width: "80%", border: "1px solid #dedede",
      borderRadius: 5, position: 'relative'
  }}>
      <div style={{position: "absolute", top: 10, left: 10, display: 'flex', gap: 2}}>
          <Button
              variant={"outline-danger"}
              onClick={() => {deletePage()}}
          >Delete</Button>
          <Button
              variant={"outline-primary"}
              onClick={() => {shiftUp()}}
          >Up</Button>
          <Button
              variant={"outline-success"}
              onClick={() => {shiftDown()}}
          >Down</Button>
      </div>
      <p>Select a Page Type</p>
      <PageSwitcher />

      {
          /* Text Page */
          pages[index]['type'] === "text" &&
          <>
              <Form.Label>Page Text</Form.Label>
              <Form.Control type="text" placeholder={pages[index]["data"]} onChange={
                  (e) => {
                      if (e.target.value !== "") {
                          updatePageDataAttribute("data", e.target.value)
                      }
                  }
              }/>
          </>
      }

      { /* Questions Page */
          pages[index]['type'] === "question" &&
          <>
              <Form.Label>Page Question</Form.Label>
              <Form.Control type="text" placeholder={pages[index]["question"]} onChange={
                  (e) => {
                      if (e.target.value !==""){
                          updatePageDataAttribute("question", e.target.value)
                      }
                  }
              }/>
              <div className="divider-div-m"></div>

              <Form.Label>Number of Options</Form.Label>
              <Form.Control type="number" placeholder={0} onChange={
                  (e) => {
                      const _options = [];
                      for (let i=0; i<e.target.value; i++) {
                          _options.push("");
                      }
                      updatePageDataAttribute("questions", _options);
                  }
              }/>
              <div className="divider-div-m"></div>

              <Form.Label>Options</Form.Label>
              <br/>

              {
                  /* Options */
                  pages[index].questions.map((question, index) => {
                      return <>
                          <Form.Label className={"text-muted"}>Option {index + 1}:</Form.Label>
                          <Form.Control type="text" placeholder={question} onChange={
                              (e) => {
                                  updateQuestionOption(e.target.value, index)
                              }
                          }/>
                      </>
                  })
              }
              <br/>
              <div className="divider-div-m"></div>

              <Form.Label>Correct Option</Form.Label>
              <Form.Control type="number" placeholder={pages[index].answer} onChange={
                  (e) => {
                      if (e.target.value)
                          updatePageDataAttribute("answer", e.target.value);
                  }
              }/>
              <Form.Text id="passwordHelpBlock" muted>
                  Options aren't zero indexed so select number corresponding to correct option
              </Form.Text>
              <br/>
              <Form.Label>Explanation</Form.Label>
              <Form.Control type="text" placeholder={pages[index].explanation} onChange={
                  (e) => {
                      if (e.target.value)
                          updatePageDataAttribute("explanation", e.target.value);
                  }
              }/>
          </>
      }

      {
          /* Selection Image */
          pages[index]['type'] === "selection_image" &&
          <>
            <h5>piss off cunt i don't want you to use this</h5>
          </>
      }

      {
          /* Selection Image */
          pages[index]['type'] === "build_sentence" &&
          <>
              <Form.Label>Write the sentence here</Form.Label>
              <Form.Control type="text" placeholder={pages[index].data ? pages[index].data : "Objections to the sale should be ______."} onChange={
                  (e) => {
                      updatePageDataAttribute("data", e.target.value)
                  }
              }/>
          </>
      }

      {
          /* Selection Text */
          pages[index].type === "selection_text" &&
          <>
              <Form.Label>Write the question here</Form.Label>
              <Form.Control type="text" placeholder={pages[index].question ? pages[index].question : "Objections to the sale should be"} onChange={
                  (e) => {
                      updatePageDataAttribute("question", e.target.value)
                  }
              }/>
              <div className="divider-div-m"></div>
              <Form.Label>Write the options here seperated with commas</Form.Label>
              <Form.Control type="text" placeholder={pages[index].questions ? pages[index].questions :"encouraged, advised, result, something"} onChange={
                  (e) => {
                      updatePageDataAttribute("questions", e.target.value.split(","));
                  }
              }/>
              <div className="divider-div-m"></div>
              <Form.Label>Correct Option</Form.Label>
              <Form.Control type="number" placeholder={pages[index].answer} onChange={
                  (e) => {
                      if (e.target.value)
                          updatePageDataAttribute("answer", parseInt(e.target.value));
                  }
              }/>
              <Form.Text id="passwordHelpBlock" muted>
                  Options aren't zero indexed so select number corresponding to correct option
              </Form.Text>
          </>
      }

      {
          /* Blind Card Matching */
          pages[index].type === "flip_and_select" &&
          <>
              <Form.Label>Write pairs</Form.Label>
              {
                  // console.log(pages[index].mapping)
                  Object.keys(pages[index].mapping).length !== 0 && Object.keys(pages[index].mapping).map((elem, elemIndex) => {
                      console.log(elem, elemIndex)
                      return (
                          <div style={{display: "flex"}}>
                              <Form.Control type="text" placeholder={elem} onChange={
                                  (e) => {
                                      addToMapping(true, e.target.value, elemIndex)
                                  }
                              }/>
                              <Form.Control type="text" placeholder={pages[index].mapping[elem]} onChange={
                                  (e) => {
                                      addToMapping(false, e.target.value, elemIndex)
                                  }
                              }/>
                          </div>
                      )
                  })
              }
          </>
      }

      {
          /* Order List */
          pages[index].type === "order_list" &&
          <>
              <Form.Label>Write the ordering instructions.</Form.Label>
              <Form.Control type="text" placeholder={pages[index].question} onChange={
                  (e) => {
                      updatePageDataAttribute("question", e.target.value)
                  }
              }/>
              <Form.Label>Write the words you need to order.</Form.Label>

              {pages[index].correct_order && pages[index].correct_order.map((t, i) => {
                  return <Form.Control type="text" placeholder={t} onChange={
                      (e) => {
                          addOrderedItem(e.target.value, i);
                      }
                  }/>
              })}

          </>
      }

      {
          pages[index].type === "binary_classifier" &&
          <>
              <Form.Label>Mappings and their items</Form.Label>
              <br/>
              <Form.Label>First Class</Form.Label>
              <Form.Control
                  type="text"
                  placeholder={Object.keys(pages[index].mapping)[0]}
                  onChange={(e) => updateClassName(Object.keys(pages[index].mapping[0]), e.target.value)}
              />
              <br/>
              {
                  pages[index].mapping && pages[index].mapping[Object.keys(pages[index].mapping)[0]] &&
                  pages[index].mapping[Object.keys(pages[index].mapping)[0]].map((t, i) => {
                      return <Form.Control
                          type="text"
                          placeholder={t}
                          onChange={(e) => updateClassItem(0, i, e.target.value)}
                      />
                  })
              }
              <br/>
              <Button onClick={() => {addItem(Object.keys(pages[index].mapping)[0])}}>Add Item</Button>
              <br/>
              <Form.Label>Second Class</Form.Label>
              <Form.Control
                  type="text"
                  placeholder={Object.keys(pages[index].mapping)[1]}
                  onChange={(e) => updateClassName(Object.keys(pages[index].mapping)[1], e.target.value)}
              />
              <br/>
              {
                  pages[index].mapping && pages[index].mapping[Object.keys(pages[index].mapping)[1]] &&
                  pages[index].mapping[Object.keys(pages[index].mapping)[1]].map((t, i) => {
                      return <Form.Control
                          type="text"
                          placeholder={t}
                          onChange={(e) => updateClassItem(1, i, e.target.value)}
                      />
                  })
              }
              <br/>
              <Button onClick={() => {addItem(Object.keys(pages[index].mapping)[1])}}>Add Item</Button>
              <br/>
          </>
      }


  </Form>
}



export default Page;