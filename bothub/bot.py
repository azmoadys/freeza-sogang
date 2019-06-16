# -*- coding: utf-8 -*-

from __future__ import (absolute_import, division, print_function, unicode_literals)
import redis
from bothub_client.bot import BaseBot
from bothub_client.decorators import channel
from bothub_client.messages import Message
from bothub_client.bot import BaseBot
from bothub_client.messages import Message

class Bot(BaseBot):
	"""Represent a Bot logic which interacts with a user.

    BaseBot superclass have methods belows:

    * Send message
      * self.send_message(message, chat_id=None, channel=None)
    * Data Storage
      * self.set_project_data(data)
      * self.get_project_data()
      * self.set_user_data(data, user_id=None, channel=None)
      * self.get_user_data(user_id=None, channel=None)
    * Channel Handler
      from bothub_client.decorators import channel
      @channel('<channel_name>')
      def channel_handler(self, event, context):
        # Handle a specific channel message
    * Command Handler
      from bothub_client.decorators import command
      @command('<command_name>')
      def command_handler(self, event, context, args):
          # Handle a command('/<command_name>')
    * Intent Handler
      from bothub_client.decorators import intent
      @intent('<intent_id>')
      def intent_result_handler(self, event, context, answers):
          # Handle a intent result
          # answers is a dict and contains intent's input data
            {
              "<intent slot id>" : <entered slot value>
              ...
            }
    """
	@channel()
	def default_handler(self, event, context):
		"""
		Handle a message received
		event is a dict and contains trigger info.

		{
			"trigger": "webhook",
			"channel": "<name>",
			"sender": {
				"id": "<chat_id>",
				"name": "<nickname>"
			},
			"content": "<message content>",
			"raw_data": <unmodified data itself webhook received>
		}
		"""
		message = event.get('content')
		
		if message == "/start":
			self.send_welcome_message(event)

		self.send_message(message)
#		command = message.get_command_for(bot) - not working
#		get_handler = CommandHandler('start',send_welcome_message)
		#초기 웰컴 메시지 전송
		'''		
		if command == '/start' :
			self.send_welcome_message(event)\
			.add_keyboard_button('재고 확인')\
			.add_keyboard_button('기록 확인')
		'''

#		CommandHandler('start', command_answer)
		

		#키보드 기능
		if message =="키보드":
			msg = Message(event).set_text('키보드를 설정합니다.')\
			.add_keyboard_button('재고 확인')\
			.add_keyboard_button('기록 확인')
			self.send_message(msg) 
		else: 
			self.send_message('아직 준비중입니다.')
	
	def send_welcome_message(self, event):
		message = Message(event).set_text('호오- 반갑습니다.'+event.get(name)+'님. 저는 프리저라고 합니다')
		self.send_message(message)
	def command_answer(self, event):
		self.send_message.set_text('hello')


		
	def RedisCheck():
	#redis part
		try:
			r = redis.StrictRedis(host='localhost', port=6379)                      
			# Connect to local Redis instance\
			p = r.pubsub()                    
			# See https://github.com/andymccurdy/redis-py/#publish--subscribe
			p.subscribe('startScripts')                                         
			# Subscribe to startScripts channel
			PAUSE = True
	
			while PAUSE:                                                     
			# Will stay in loop until START message received
				print("Waiting For redisStarter...")
				message = p.get_message()                  
				# Checks for message
				if message:
					command = message['data']                     
					# Get data from message

					if command == b'START':    
					# Checks for START message
						PAUSE = False       
						# Breaks loop

				time.sleep(1)
			print("Permission to start...")

		except Exception as e:
			print("!!!!!!!!!! EXCEPTION !!!!!!!!!")
			print(str(e))
			print(traceback.format_exc())
