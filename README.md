# Big5-App

1. create venv and activate it
  ```bash
    python3 -m venv venv
    # then
    . venv/bin/activate
  ```
  ```bash
    #for Windows
    pip install virtualenv
    # cd to Big5-App
    virtualenv venv
    venv\Scripts\activate.bat
  ```
2. install required packages
  ```bash
    pip3 install -r requirements.txt
  ```
3. run development backend server
  ```bash
    uvicorn backend.main:app --reload
  ```
