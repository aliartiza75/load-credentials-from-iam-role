# This script call the API gateway endpoint which triggers a lambda.

import requests
import os
import json
import boto3
from requests_aws4auth import AWS4Auth

region = 'us-west-1'
service = 'execute-api'

credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, 'us-west-1', service, session_token=credentials.token)

url = "https://X.execute-api.us-west-1.amazonaws.com/test/clients"
response = requests.post(url,json={ "value": "1"} ,auth=awsauth)
print(dir(response))
print(response.reason)
print(response.text)