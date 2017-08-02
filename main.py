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

class Scores(ndb.Model):
    name = ndb.StringProperty()
    score = ndb.IntegerProperty()

class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            greeting = ('Welcome, %s! (<a href="%s">Sign out</a>)' %
                (user.nickname(), users.create_logout_url('/')))
        else:
            greeting = ('<a href="%s">Sign in</a>' %
                users.create_login_url('/'))

        loginlink = (
            '<html><body>{}</body></html>'.format(greeting))
        my_vars = { "loginlink": loginlink}
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

class SaveScoreHandler(webbapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        score = self.request.get('score')
        savescore = Scores(name=user.nickname(), score=int(score))
        savescore.put()

class HighScoreHandler(webapp2.RequestHandler):
    def get(self):
        template_vars = {}
        template = jinja_environment.get_template('templates/highscores.html')
        self.response.write(template.render(template_vars))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/game', GameHandler),
    ('/instructions', InstructionsHandler),
    ('/highscores', HighScoreHandler),
    ('/savescore', SaveScoreHandler)
], debug=True)
