#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import jinja2
import os
from google.appengine.api import users
from google.appengine.ext import ndb


jinja_environment = jinja2.Environment(loader=
    jinja2.FileSystemLoader(os.path.dirname(__file__)))

class Users(ndb.Model):
    email = ndb.StringProperty()
    username = ndb.StringProperty()

class Scores(ndb.Model):
    name = ndb.StringProperty()
    score = ndb.IntegerProperty()

class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            query = Users.query(user.nickname() == Users.email)
            userobjects = query.fetch()
            if len(userobjects) > 0:
                knownusername = userobjects[0].username
                form = False
                greeting = ('Welcome, <span id="username">%s</span>! (<a href="%s">Sign out</a>)' %
                    (knownusername, users.create_logout_url('/')))
            else:
                form = True
                greeting = ('Welcome, <span id="username">%s</span>! (<a href="%s">Sign out</a>)' %
                    (user.nickname(), users.create_logout_url('/')))
        else:
            form = False
            greeting = ('<a href="%s">Sign in</a>' %
                users.create_login_url('/'))

        loginlink = (
            '<html><body>{}</body></html>'.format(greeting))
        my_vars = { "loginlink": loginlink,
                    "shoulddisplayform": form}
        template = jinja_environment.get_template('templates/index.html')
        self.response.write(template.render(my_vars))

class GameHandler(webapp2.RequestHandler):
    def get(self):
        template_vars = {}
        template = jinja_environment.get_template('templates/game.html')
        self.response.write(template.render(template_vars))

class InstructionsHandler(webapp2.RequestHandler):
    def get(self):
        template_vars = {}
        template = jinja_environment.get_template('templates/instructions.html')
        self.response.write(template.render(template_vars))

class SaveScoreHandler(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        if user:
            score = self.request.get('score')
            query = Users.query(user.nickname() == Users.email)
            userobjects = query.fetch()
            savescore = Scores(name=userobjects[0].username, score=int(score))
            savescore.put()
        else:
            score = self.request.get('score')
            savescore = Scores(name='Anonymous', score=int(score))
            savescore.put()

class HighScoreHandler(webapp2.RequestHandler):
    def get(self):
        query = Scores.query().order(Scores.score)
        highscores = query.fetch(limit=10)
        template_vars = {"scores" : highscores}
        template = jinja_environment.get_template('templates/highscores.html')
        self.response.write(template.render(template_vars))

class SaveUserNameHandler(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        username = self.request.get('username')
        saveuser = Users(username=username, email=user.nickname())
        saveuser.put()

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', GameHandler),
    ('/instructions', InstructionsHandler),
    ('/highscores', HighScoreHandler),
    ('/savescore', SaveScoreHandler),
    ('/saveusername', SaveUserNameHandler)
], debug=True)
