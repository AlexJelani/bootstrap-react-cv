import json
import boto3
from decimal import Decimal

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('HitCounter')

def lambda_handler(event, context):
    # Define the counter ID
    counter_id = 'counterId'

    try:
        # Get the current item from the table
        response = table.get_item(Key={'id': counter_id})

        if 'Item' in response:
            hits = response['Item']['hits']
        else:
            hits = 0

        # Increment the hits count
        hits = int(hits) + 1

        # Update the table with the new hits count
        table.put_item(
            Item={
                'id': counter_id,
                'hits': hits
            }
        )

        # Return a success response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Required for CORS support to work
            },
            'body': json.dumps({'hits': hits})
        }

    except Exception as e:
        # Log the exception (optional)
        print(e)

        # Return an error response
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Required for CORS support to work
            },
            'body': json.dumps({'error': 'An error occurred'})
        }
