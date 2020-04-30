# Load Credentials from IAM Role


## Overview

This repository contains guidelines to call AWS API Gateway's endpoint from EC2 instance using a node.js and python scripts. The scripts need to send sign request to the endpoint, so therefore it need AWS credentials. For security purpose AWS credentials are not provided as environment variable there a role has been assigned to the EC2 instance, which allows EC2 to access the API Gateway Endpoint.

## Guidelines

Follow the guidelines given below to perform the following operation:

1. Create an API in API Gateway and copy the endpoint ARN.

2. Add the arn value to the `Resource` list, given in [iam-role.json](./iam-role.json) file.

3. Create an EC2 instance and assign the role to it. It will allow the EC2 instance to access the API Gateway endpoint.

4. Run any of the scripts given in the `scripts/` folder to test everything is working fine.



