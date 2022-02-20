from locust import HttpUser, between, task

import json

class WebsiteTasks(HttpUser):
    @task
    def join(self):
        data = {'quizid' : '3cac3612-d318-4b2b-b649-208218722dcb'}
        self.client.post("/API/quizzes/join",data=json.dumps(data),headers={'content-type':'application/json'})
    @task
    def login(self):
        data = {'username' : 'dpw', 'password':'dpw'}
        self.client.post("/API/quizzes/signin",data=json.dumps(data),headers={'content-type':'application/json'})


