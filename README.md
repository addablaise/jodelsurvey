# jodelsurvey
Jodel Node survey app
This is a survey api developed with Nodejs.<br /><br />
**Features**<br />
- Create Surveys<br />
- View all Surveys<br />
- View a Survey by survey id<br />
- Update Survey<br />
- Delete Survey<br />

- Create Question (Assigned to a survey)<br />
- Update Question<br />
- Answer Question<br />
- Answer all questions of a survey<br />
- Find Question(s) of a survey<br />
- Delete Question<br />




**This API uses the following packages**<br />

| **Package**  | **Purpose** |
| ------------- | ------------- |
| cors  | It allows you to make requests from one website to another website in the browser  |
| body-parser  | It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body  |
| dotenv | It allows you to create environment variables in a . env file instead of putting them in your code. |
| express | It's a layer built on the top of the Node js that helps manage servers and routes |
| express-joi-validation | Validate express application inputs and parameters using joi |
| uuid | Generating unique IDs |

<br/> Setup <br/>
Run the following command in your terminal to install these packages
```bash
  npm install
```
Don’t forget to add auth_token set to 1234 in your headers

**Survey Requests**
-------------------
**POST Create Survey**<br/>
This endpoint creates a new survey.<br/>

A unique id is generated and assigned to each Survey created (uuid package)
Questions can be assigned to this survey (Using survey_id)<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/survey/create
```
<br/>Body<br/>
```bash
  {
    "survey_name": "Jodel Color Survey 2022"
  }
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "surveys": [
      {
        "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
        "survey_name": "Jodel Color Survey 2022"
      },
      {
        "survey_id": "152ac80e-60a0-4339-9a64-8609aa3602aa",
        "survey_name": "Restaurant Survey"
      }
    ]
  }
```
-------------------------------------
**GET All Surveys**<br/>
This endpoint gets all surveys.<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/survey/all
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "surveys": [
      {
        "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
        "survey_name": "Jodel Color Survey 2022"
      },
      {
        "survey_id": "152ac80e-60a0-4339-9a64-8609aa3602aa",
        "survey_name": "Restaurant Survey"
      }
    ]
  }
```
-------------------------------------
**GET Find Survey by ID**<br/>
This endpoint gets a specific survey using its survey_id parsed in the URL as a GET request. In the example we retrieve the Jodel Color Survey 2022 using its survey_id <br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/survey/view/f0c7c329-c43a-4af8-be78-3c3abc89d4f5
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "survey": {
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "survey_name": "Jodel Color Survey 2022"
    }
  }
```

-------------------------------------
**GET Delete Survey by ID**<br/>
This endpoint deletes a survey. All questions assigned to the survey will also be removed/deleted. After deleting the Restaurant survey only the Jodel Color Survey 2022 exists <br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/survey/delete/152ac80e-60a0-4339-9a64-8609aa3602aa1
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "surveys": [
      {
        "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
        "survey_name": "Jodel Color Survey 2022"
      }
    ]
  }
```

-------------------------------------
**PUT Update Survey**<br/>
This endpoint updates the survey name. The survey_id is appended to the url and the survey_name is sent in the body of the request <br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/survey/update/f0c7c329-c43a-4af8-be78-3c3abc89d4f5
```
<br/>Body<br/>
```bash
  {
    "survey_name": "Jodel Color Survey (Germany)"
  }
```

<br/>Response<br/>
```bash
  {
    "status": "success",
    "survey": {
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "survey_name": "Jodel Color Survey (Germany)"
    }
  }
```
<br/>

**Question Requests**
---------------------
**POST Create Question**<br/>
This endpoint creates a question. Each question should be assigned to a survey via the survey_id. Each question has a 'selected' (true means answer selected , false means answer not selected)<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/create
```
<br/>Body<br/>
```bash
  {
    "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
    "question_string": "What is your favorite color?",
    "answers": [
        {
            "ans": "Blue",
            "selected": "false"
        },
        {
            "ans": "Green",
            "selected": "false"
        },
        {
            "ans": "Red",
            "selected": "false"
        },
        {
            "ans": "Yellow",
            "selected": "false"
        }
    ]
  }
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "questions": [
      {
        "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
        "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
        "question_string": "What is your favorite color?",
        "answers": [
          {
            "ans": "Blue",
            "selected": "false"
          },
          {
            "ans": "Green",
            "selected": "false"
          },
          {
            "ans": "Red",
            "selected": "false"
          },
          {
            "ans": "Yellow",
            "selected": "false"
          }
        ]
      }
    ]
  }
```

-------------------------------------
**POST Update Question**<br/>
This endpoint updates the question. The question_string and answers can be updated<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/update
```
<br/>Body<br/>
```bash
  {
    "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
    "question_string": "What is your favorite color?",
    "answers": [
        {
            "ans": "Sea Blue",
            "selected": "false"
        },
        {
            "ans": "Green",
            "selected": "false"
        },
        {
            "ans": "Red",
            "selected": "false"
        },
        {
            "ans": "Yellow",
            "selected": "false"
        }
    ]
}
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "question": {
      "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "question_string": "What is your favorite color?",
      "answers": [
        {
          "ans": "Sea Blue",
          "selected": "false"
        },
        {
          "ans": "Green",
          "selected": "false"
        },
        {
          "ans": "Red",
          "selected": "false"
        },
        {
          "ans": "Yellow",
          "selected": "false"
        }
      ]
    }
  }
```

-------------------------------------
**POST Submit/Answer Question**<br/>
This endpoint submits the answer to a particular question. This is useful in the following use cases
<br/>
- When you want each question to be answered before moving to the next<br/>
- When you want each question to be updated on the fly without waiting to submit the whole survey<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/submit
```
<br/>Body<br/>
```bash
  {
    "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
    "question_string": "What is your favorite color?",
    "answers": [
        {
            "ans": "Sea Blue",
            "selected": "true"
        },
        {
            "ans": "Green",
            "selected": "false"
        },
        {
            "ans": "Red",
            "selected": "false"
        },
        {
            "ans": "Yellow",
            "selected": "false"
        }
    ]
}
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "question": {
      "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "question_string": "What is your favorite color?",
      "answers": [
        {
          "ans": "Sea Blue",
          "selected": "true"
        },
        {
          "ans": "Green",
          "selected": "false"
        },
        {
          "ans": "Red",
          "selected": "false"
        },
        {
          "ans": "Yellow",
          "selected": "false"
        }
      ]
    }
  }
```


-------------------------------------
**POST Submit/Answer Survey Questions**<br/>
This endpoint submits all answered questions of a survey. If a survey has say 10 questions , all questions are submitted and validated<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/submitqsts
```
<br/>Body<br/>
```bash
  {
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "questions": [
          {
              "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
              "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
              "question_string": "What is your favorite color?",
              "answers": [
                  {
                      "ans": "Sea Blue",
                      "selected": "true"
                  },
                  {
                      "ans": "Green",
                      "selected": "false"
                  },
                  {
                      "ans": "Red",
                      "selected": "false"
                  },
                  {
                      "ans": "Yellow",
                      "selected": "false"
                  }
              ]
          }
      ]
  }
```
<br/>Response<br/>
```bash
  {
    "status": "success",
    "message": "Survey Completed successfully"
  }
```

-------------------------------------
**GET Find Questions by survey id**<br/>
This endpoint retrieves all questions assigned to a particular survey by appending the survey_id to the URL in a GET request<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/survey/f0c7c329-c43a-4af8-be78-3c3abc89d4f5
```

<br/>Response<br/>
```bash
  {
    "status": "success",
    "survey": {
      "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
      "survey_name": "Jodel Color Survey (Germany)"
    },
    "questions": [
      {
        "question_id": "7931945e-1b90-4b62-8cfe-530432affa76",
        "survey_id": "f0c7c329-c43a-4af8-be78-3c3abc89d4f5",
        "question_string": "What is your favorite color?",
        "answers": [
          {
            "ans": "Sea Blue",
            "selected": "true"
          },
          {
            "ans": "Green",
            "selected": "false"
          },
          {
            "ans": "Red",
            "selected": "false"
          },
          {
            "ans": "Yellow",
            "selected": "false"
          }
        ]
      }
    ]
  }
```

-------------------------------------
**GET Delete Question**<br/>
This endpoint deletes a question.<br/>
<br/>Endpoint<br/>
```bash
  http://localhost:3000/api/question/delete/152ac80e-60a0-4339-9a64-8609aa3602aa1
```


